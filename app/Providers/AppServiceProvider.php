<?php

namespace App\Providers;

use Carbon\CarbonImmutable;
use Illuminate\Filesystem\FilesystemAdapter;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\ServiceProvider;
use Illuminate\Validation\Rules\Password;
use League\Flysystem\AzureBlobStorage\AzureBlobStorageAdapter;
use League\Flysystem\Config as FlysystemConfig;
use League\Flysystem\Filesystem;
use MicrosoftAzure\Storage\Blob\BlobRestProxy;
use MicrosoftAzure\Storage\Common\Internal\StorageServiceSettings;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->configureDefaults();
        $this->registerAzureDriver();
    }

    /** Registra el driver "azure" usando league/flysystem-azure-blob-storage. */
    protected function registerAzureDriver(): void
    {
        Storage::extend('azure', function ($app, array $config): FilesystemAdapter {
            $connectionString = sprintf(
                'DefaultEndpointsProtocol=https;AccountName=%s;AccountKey=%s;EndpointSuffix=core.windows.net',
                $config['name'],
                $config['key']
            );

            $client          = BlobRestProxy::createBlobService($connectionString);
            $serviceSettings = StorageServiceSettings::createFromConnectionString($connectionString);
            $adapter         = new AzureBlobStorageAdapter($client, $config['container'], serviceSettings: $serviceSettings);

            $laravelAdapter = new FilesystemAdapter(new Filesystem($adapter), $adapter, $config);

            // Delegamos temporaryUrl() al método nativo del adaptador de Flysystem,
            // que genera tokens SAS usando las credenciales del StorageServiceSettings.
            $laravelAdapter->buildTemporaryUrlsUsing(
                fn (string $path, \DateTimeInterface $expiration) => $adapter->temporaryUrl($path, $expiration, new FlysystemConfig())
            );

            return $laravelAdapter;
        });
    }

    /**
     * Configure default behaviors for production-ready applications.
     */
    protected function configureDefaults(): void
    {
        Date::use(CarbonImmutable::class);

        DB::prohibitDestructiveCommands(
            app()->isProduction(),
        );

        Password::defaults(fn (): ?Password => app()->isProduction()
            ? Password::min(12)
                ->mixedCase()
                ->letters()
                ->numbers()
                ->symbols()
                ->uncompromised()
            : null,
        );
    }
}
