import { Head, Link, router } from '@inertiajs/react';
import {
    Building2,
    ClipboardList,
    Database,
    Home,
    Laptop,
    LogOut,
    MapPin,
    MonitorSmartphone,
    Settings,
    Share2,
    UserCog,
    Users,
} from 'lucide-react';
import { dashboard, logout } from '@/routes';
import { gestion as dashboardGestion, otros as dashboardOtros } from '@/routes/dashboard';

// ─── Tipos ───────────────────────────────────────────────────────────────────

interface Entidad {
    nombre: string;
    descripcion: string;
    count: number;
    color: string;
    icono: string;
    ruta: string;
}

interface Props {
    entidades: Entidad[];
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

// "ShieldUser" no existe en lucide-react@0.475 (instalado en este proyecto);
// se reemplaza por UserCog, semánticamente equivalente para roles/permisos.
const ICONOS: Record<string, typeof Laptop> = {
    Laptop,
    Share2,
    Building2,
    ShieldUser: UserCog,
    MonitorSmartphone,
    MapPin,
    Users,
};

const COLOR_META: Record<string, { bg: string; badgeBg: string; badgeText: string; link: string }> = {
    blue:   { bg: 'bg-blue-500',   badgeBg: 'bg-blue-50',   badgeText: 'text-blue-700',   link: 'text-blue-600' },
    purple: { bg: 'bg-purple-600', badgeBg: 'bg-purple-50', badgeText: 'text-purple-700', link: 'text-purple-600' },
    teal:   { bg: 'bg-teal-600',   badgeBg: 'bg-teal-50',   badgeText: 'text-teal-700',   link: 'text-teal-600' },
    orange: { bg: 'bg-orange-500', badgeBg: 'bg-orange-50', badgeText: 'text-orange-700', link: 'text-orange-600' },
    indigo: { bg: 'bg-indigo-700', badgeBg: 'bg-indigo-50', badgeText: 'text-indigo-700', link: 'text-indigo-700' },
    red:    { bg: 'bg-red-500',    badgeBg: 'bg-red-50',    badgeText: 'text-red-700',    link: 'text-red-600' },
    green:  { bg: 'bg-green-600',  badgeBg: 'bg-green-50',  badgeText: 'text-green-700',  link: 'text-green-600' },
};

function colorMeta(color: string) {
    return COLOR_META[color] ?? COLOR_META.blue;
}

// ─── Página principal ─────────────────────────────────────────────────────────

export default function AdminGestion({ entidades }: Props) {
    return (
        <div className="min-h-screen bg-gray-50">
            <Head title="Gestión de Entidades — SCA-IT" />

            {/* ── Navbar ────────────────────────────────────────────────── */}
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

            {/* ── Contenido ─────────────────────────────────────────────── */}
            <div className="pt-14 pb-24">

                {/* Header */}
                <div className="bg-blue-50 px-4 py-6">
                    <p className="text-xl font-bold text-blue-700">Gestión de Entidades</p>
                    <p className="mt-0.5 text-sm text-gray-500">Administra las entidades del sistema</p>
                </div>

                {/* Grid de tarjetas */}
                <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-4">
                    {entidades.map(e => {
                        const meta = colorMeta(e.color);
                        const Icon = ICONOS[e.icono] ?? Laptop;

                        return (
                            <div
                                key={e.nombre}
                                className="flex h-full flex-col rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
                            >
                                <div className={`mb-3 flex h-12 w-12 items-center justify-center rounded-full ${meta.bg}`}>
                                    <Icon size={24} className="text-white" />
                                </div>

                                <p className="font-bold text-gray-800">{e.nombre}</p>
                                <p className="mt-0.5 text-xs text-gray-400">{e.descripcion}</p>

                                <span className={`mt-3 inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${meta.badgeBg} ${meta.badgeText}`}>
                                    <Database size={12} />
                                    {e.count} registros
                                </span>

                                <div className="mt-4 mb-3 border-t border-gray-100" />

                                <Link
                                    href={e.ruta}
                                    className={`mt-auto text-sm font-semibold ${meta.link} hover:underline`}
                                >
                                    ADMINISTRAR →
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* ── Bottom nav ────────────────────────────────────────────── */}
            <nav className="fixed inset-x-0 bottom-0 z-50 flex border-t border-gray-200 bg-white">
                <button
                    onClick={() => router.visit(dashboard().url)}
                    className="flex flex-1 flex-col items-center justify-center py-3 text-xs text-gray-400"
                >
                    <Home size={22} />
                    <span className="mt-0.5">Inicio</span>
                </button>
                <button className="flex flex-1 flex-col items-center justify-center py-3 text-xs text-blue-600">
                    <ClipboardList size={22} />
                    <span className="mt-0.5">Gestión</span>
                </button>
                <button
                    onClick={() => router.visit(dashboardOtros().url)}
                    className="flex flex-1 flex-col items-center justify-center py-3 text-xs text-gray-400"
                >
                    <Settings size={22} />
                    <span className="mt-0.5">Otros</span>
                </button>
            </nav>
        </div>
    );
}

AdminGestion.layout = null;
