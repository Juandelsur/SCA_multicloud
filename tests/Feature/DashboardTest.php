<?php

use App\Models\User;
use Spatie\Permission\Models\Role;

test('guests are redirected to the login page', function () {
    $response = $this->get(route('dashboard'));
    $response->assertRedirect(route('login'));
});

test('administrators can visit the dashboard', function () {
    $user = User::factory()->create();
    $user->assignRole(Role::firstOrCreate(['name' => 'Administrador']));
    $this->actingAs($user);

    $response = $this->get(route('dashboard'));
    $response->assertOk();
});

test('non-administrators cannot visit the dashboard', function () {
    $user = User::factory()->create();
    $user->assignRole(Role::firstOrCreate(['name' => 'Técnico']));
    $this->actingAs($user);

    $response = $this->get(route('dashboard'));
    $response->assertForbidden();
});