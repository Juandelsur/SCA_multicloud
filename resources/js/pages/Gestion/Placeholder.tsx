import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, ClipboardList, Home, LogOut, Settings, Wrench } from 'lucide-react';
import { dashboard, logout } from '@/routes';
import { gestion as dashboardGestion, otros as dashboardOtros } from '@/routes/dashboard';

interface Props {
    entidad: string;
}

export default function GestionPlaceholder({ entidad }: Props) {
    return (
        <div className="min-h-screen bg-gray-50">
            <Head title={`${entidad} — Gestión`} />

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
                <Wrench size={40} className="mb-3 text-gray-300" />
                <p className="text-lg font-bold text-gray-700">CRUD de {entidad} — Próximamente</p>
                <Link
                    href={dashboardGestion().url}
                    className="mt-4 flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white"
                >
                    <ArrowLeft size={16} />
                    Volver a Gestión
                </Link>
            </div>

            <nav className="fixed inset-x-0 bottom-0 z-50 flex border-t border-gray-200 bg-white">
                <Link
                    href={dashboard().url}
                    className="flex flex-1 flex-col items-center justify-center py-3 text-xs text-gray-400"
                >
                    <Home size={22} />
                    <span className="mt-0.5">Inicio</span>
                </Link>
                <Link
                    href={dashboardGestion().url}
                    className="flex flex-1 flex-col items-center justify-center py-3 text-xs text-blue-600"
                >
                    <ClipboardList size={22} />
                    <span className="mt-0.5">Gestión</span>
                </Link>
                <Link
                    href={dashboardOtros().url}
                    className="flex flex-1 flex-col items-center justify-center py-3 text-xs text-gray-400"
                >
                    <Settings size={22} />
                    <span className="mt-0.5">Otros</span>
                </Link>
            </nav>
        </div>
    );
}

GestionPlaceholder.layout = null;
