import { Head, Link, router } from '@inertiajs/react';
import { ClipboardList, Home, LogOut, Settings } from 'lucide-react';
import { dashboard, logout } from '@/routes';
import { gestion as dashboardGestion, otros as dashboardOtros } from '@/routes/dashboard';

export default function AdminOtros() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Head title="Otros — Panel Administrador" />

            <nav className="fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between bg-blue-700 px-4">
                <span className="text-lg font-bold text-white">SCA Hospital</span>
                <Link
                    href={logout().url}
                    method="post"
                    as="button"
                    className="flex items-center text-white opacity-80 hover:opacity-100 transition-opacity"
                    aria-label="Cerrar sesión"
                >
                    <LogOut size={22} />
                </Link>
            </nav>

            <div className="flex min-h-screen flex-col items-center justify-center pt-14 pb-24 px-4 text-center">
                <Settings size={40} className="mb-3 text-gray-300" />
                <p className="text-lg font-bold text-gray-700">Otros</p>
                <p className="mt-1 text-sm text-gray-400">Próximamente</p>
            </div>

            <nav className="fixed inset-x-0 bottom-0 z-50 flex border-t border-gray-200 bg-white">
                <button
                    onClick={() => router.visit(dashboard().url)}
                    className="flex flex-1 flex-col items-center justify-center py-3 text-xs text-gray-400"
                >
                    <Home size={22} />
                    <span className="mt-0.5">Inicio</span>
                </button>
                <button
                    onClick={() => router.visit(dashboardGestion().url)}
                    className="flex flex-1 flex-col items-center justify-center py-3 text-xs text-gray-400"
                >
                    <ClipboardList size={22} />
                    <span className="mt-0.5">Gestión</span>
                </button>
                <button
                    onClick={() => router.visit(dashboardOtros().url)}
                    className="flex flex-1 flex-col items-center justify-center py-3 text-xs text-blue-600"
                >
                    <Settings size={22} />
                    <span className="mt-0.5">Otros</span>
                </button>
            </nav>
        </div>
    );
}

AdminOtros.layout = null;
