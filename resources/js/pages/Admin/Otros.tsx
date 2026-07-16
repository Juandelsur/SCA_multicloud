import { Head, Link, router } from '@inertiajs/react';
import {
    AlertTriangle,
    ArrowLeftRight,
    ClipboardList,
    HelpCircle,
    Home,
    Loader2,
    LogOut,
    Pencil,
    Plus,
    Search,
    Settings,
    Trash2,
} from 'lucide-react';
import { useState } from 'react';
import { dashboard, logout } from '@/routes';
import { gestion as dashboardGestion, otros as dashboardOtros } from '@/routes/dashboard';

// ─── Tipos ───────────────────────────────────────────────────────────────────

interface EventoAuditoria {
    id: number;
    activo_id: number;
    usuario: string;
    accion: string;
    detalle: string | null;
    created_at: string;
    activo: { codigo_inventario: string; marca: string; modelo: string } | null;
}

interface Filtros {
    activo?: string;
    accion?: string;
}

interface Props {
    eventos: EventoAuditoria[] | null;
    error: string | null;
    filtros: Filtros;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

type Accion = 'movimiento' | 'creacion' | 'edicion' | 'eliminacion';

const ACCION_META: Record<Accion, { bg: string; label: string; icon: React.ReactNode }> = {
    movimiento:  { bg: 'bg-blue-500',   label: 'Movimiento', icon: <ArrowLeftRight size={16} className="text-white" /> },
    creacion:    { bg: 'bg-green-500',  label: 'Creación',   icon: <Plus size={16} className="text-white" /> },
    edicion:     { bg: 'bg-yellow-500', label: 'Edición',    icon: <Pencil size={16} className="text-white" /> },
    eliminacion: { bg: 'bg-red-500',    label: 'Eliminación', icon: <Trash2 size={16} className="text-white" /> },
};

function accionMeta(accion: string) {
    return ACCION_META[accion as Accion] ?? { bg: 'bg-gray-400', label: accion, icon: <HelpCircle size={16} className="text-white" /> };
}

function tiempoRelativo(fecha: string): string {
    const diff  = Date.now() - new Date(fecha).getTime();
    const mins  = Math.floor(diff / 60_000);
    const horas = Math.floor(diff / 3_600_000);
    const dias  = Math.floor(diff / 86_400_000);

    if (mins < 60)  {
        return `${mins}m`;
    }

    if (horas < 24) {
        return `${horas}h`;
    }

    return `${dias}d`;
}

// ─── Página principal ─────────────────────────────────────────────────────────

export default function AdminOtros({ eventos, error, filtros }: Props) {
    const [search, setSearch]         = useState(filtros.activo ?? '');
    const [accionFiltro, setAccionFiltro] = useState(filtros.accion ?? '');
    const [isLoading, setIsLoading]   = useState(false);

    function buscarCon(overrides: Partial<{ activo: string; accion: string }>) {
        const activoVal = overrides.activo ?? search;
        const accionVal = overrides.accion ?? accionFiltro;

        setIsLoading(true);
        router.get(
            dashboardOtros().url,
            {
                ...(activoVal.trim() ? { activo: activoVal.trim() } : {}),
                ...(accionVal ? { accion: accionVal } : {}),
            },
            {
                preserveState: true,
                preserveScroll: true,
                only: ['eventos', 'error', 'filtros'],
                onFinish: () => setIsLoading(false),
            }
        );
    }

    function handleSearchKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            buscarCon({});
        }
    }

    function handleAccionChange(e: React.ChangeEvent<HTMLSelectElement>) {
        setAccionFiltro(e.target.value);
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Head title="Auditoría — Panel Administrador" />

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

            <div className="pt-14 pb-24">

                {/* Header */}
                <div className="bg-blue-50 px-4 py-5">
                    <p className="text-xl font-bold text-blue-700">Auditoría</p>
                    <p className="mt-0.5 text-sm text-gray-500">Eventos registrados por servicio-auditoria</p>
                </div>

                {/* Filtros */}
                <div className="space-y-3 p-4">
                    <div className="relative">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        <input
                            type="text"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            onKeyDown={handleSearchKeyDown}
                            placeholder="Buscar por activo (código, marca o modelo)"
                            className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-9 pr-3 text-sm text-gray-700"
                        />
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row">
                        <select
                            value={accionFiltro}
                            onChange={handleAccionChange}
                            className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700"
                        >
                            <option value="">Filtrar por tipo de acción</option>
                            <option value="movimiento">Movimiento</option>
                            <option value="creacion">Creación</option>
                            <option value="edicion">Edición</option>
                            <option value="eliminacion">Eliminación</option>
                        </select>

                        <button
                            onClick={() => buscarCon({})}
                            className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                        >
                            <Search size={16} />
                            Buscar
                        </button>
                    </div>
                </div>

                {/* Resultado */}
                <div className="px-4">
                    {isLoading ? (
                        <div className="flex flex-col items-center py-16 text-blue-600">
                            <Loader2 size={32} className="mb-3 animate-spin" />
                            <p className="text-sm">Cargando eventos...</p>
                        </div>
                    ) : error ? (
                        <div className="flex flex-col items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 py-10 text-center text-amber-700">
                            <AlertTriangle size={28} />
                            <p className="text-sm font-medium px-4">{error}</p>
                        </div>
                    ) : !eventos ? (
                        <div className="rounded-xl border border-dashed border-gray-200 py-16 text-center text-sm text-gray-400">
                            Usa la búsqueda o los filtros para ver eventos de auditoría.
                        </div>
                    ) : eventos.length === 0 ? (
                        <div className="rounded-xl border border-dashed border-gray-200 py-16 text-center text-sm text-gray-400">
                            Sin eventos que coincidan con la búsqueda.
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {eventos.map(ev => {
                                const meta = accionMeta(ev.accion);

                                return (
                                    <div
                                        key={ev.id}
                                        className="flex items-start gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
                                    >
                                        <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${meta.bg}`}>
                                            {meta.icon}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <p className="truncate font-bold text-gray-800">
                                                    {ev.activo ? `${ev.activo.marca} ${ev.activo.modelo}` : `Activo #${ev.activo_id}`}
                                                </p>
                                                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-600">
                                                    {meta.label}
                                                </span>
                                            </div>
                                            {ev.activo && (
                                                <p className="text-xs text-gray-400">{ev.activo.codigo_inventario}</p>
                                            )}
                                            <p className="mt-1 text-sm text-gray-600">{ev.detalle ?? '—'}</p>
                                            <p className="mt-1 text-xs text-gray-400">
                                                {ev.usuario} &bull; {tiempoRelativo(ev.created_at)}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
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
                <button
                    onClick={() => router.visit(dashboardGestion().url)}
                    className="flex flex-1 flex-col items-center justify-center py-3 text-xs text-gray-400"
                >
                    <ClipboardList size={22} />
                    <span className="mt-0.5">Gestión</span>
                </button>
                <button className="flex flex-1 flex-col items-center justify-center py-3 text-xs text-blue-600">
                    <Settings size={22} />
                    <span className="mt-0.5">Otros</span>
                </button>
            </nav>
        </div>
    );
}

AdminOtros.layout = null;
