import { Head, Form } from '@inertiajs/react';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import AppLogoIcon from '@/components/app-logo-icon';
import InputError from '@/components/input-error';
import { store } from '@/routes/login';
import { request } from '@/routes/password';

type Props = {
    status?: string;
    canResetPassword: boolean;
};

export default function Login({ status, canResetPassword }: Props) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            <Head title="Iniciar Sesión — SCA-IT" />

            {/* Fondo gradiente azul full-screen */}
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#3B5FB8] to-[#2147A0] px-4">

                {/* Card blanca */}
                <div className="w-full max-w-md bg-white rounded-2xl shadow-xl px-10 py-10">

                    {/* Logo */}
                    <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 bg-blue-800 rounded-xl flex items-center justify-center">
                            <AppLogoIcon className="w-10 h-10 fill-white" />
                        </div>
                    </div>

                    {/* Título y subtítulo */}
                    <div className="text-center mb-8">
                        <h1 className="text-5xl font-bold text-black tracking-tight">SCA</h1>
                        <p className="mt-1 text-sm text-gray-500">
                            Sistema de Control de Activos Informáticos
                        </p>
                    </div>

                    {/* Mensaje de estado (ej: contraseña restablecida) */}
                    {status && (
                        <div className="mb-4 rounded-lg bg-green-50 px-4 py-3 text-center text-sm font-medium text-green-700">
                            {status}
                        </div>
                    )}

                    <Form
                        {...store.form()}
                        resetOnSuccess={['password']}
                        className="flex flex-col gap-5"
                    >
                        {({ processing, errors }) => (
                            <>
                                {/* Campo: Nombre de Usuario */}
                                <div className="flex flex-col gap-1.5">
                                    <label
                                        htmlFor="email"
                                        className="text-sm font-semibold text-black"
                                    >
                                        Nombre de Usuario
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        autoComplete="email"
                                        placeholder="Ej: tecnico1, admin"
                                        className="w-full rounded-xl bg-gray-100 border-0 px-4 py-3 text-sm text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-700"
                                    />
                                    <InputError message={errors.email} />
                                </div>

                                {/* Campo: Contraseña */}
                                <div className="flex flex-col gap-1.5">
                                    <div className="flex items-center justify-between">
                                        <label
                                            htmlFor="password"
                                            className="text-sm font-semibold text-black"
                                        >
                                            Contraseña
                                        </label>
                                        {canResetPassword && (
                                            <a
                                                href={request().url}
                                                tabIndex={5}
                                                className="text-sm text-blue-700 hover:underline"
                                            >
                                                Olvidé mi contraseña
                                            </a>
                                        )}
                                    </div>
                                    <div className="relative">
                                        <input
                                            id="password"
                                            type={showPassword ? 'text' : 'password'}
                                            name="password"
                                            required
                                            tabIndex={2}
                                            autoComplete="current-password"
                                            placeholder="••••••••"
                                            className="w-full rounded-xl bg-gray-100 border-0 px-4 py-3 pr-11 text-sm text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-700"
                                        />
                                        <button
                                            type="button"
                                            tabIndex={-1}
                                            onClick={() => setShowPassword((v) => !v)}
                                            aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                                            className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
                                        >
                                            {showPassword
                                                ? <EyeOff className="size-4" />
                                                : <Eye className="size-4" />
                                            }
                                        </button>
                                    </div>
                                    <InputError message={errors.password} />
                                </div>

                                {/* Botón Ingresar */}
                                <button
                                    type="submit"
                                    tabIndex={4}
                                    disabled={processing}
                                    className="mt-2 w-full h-14 rounded-xl bg-blue-800 text-white text-base font-bold tracking-wide hover:bg-blue-900 active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {processing && (
                                        <svg className="animate-spin size-4" viewBox="0 0 24 24" fill="none">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                        </svg>
                                    )}
                                    Ingresar
                                </button>

                                {/* Separador */}
                                <hr className="border-gray-200 mt-2" />

                                {/* Footer */}
                                <p className="text-center text-xs text-gray-400">
                                    © 2025 Hospital IT Asset Control System
                                </p>
                            </>
                        )}
                    </Form>
                </div>
            </div>
        </>
    );
}
