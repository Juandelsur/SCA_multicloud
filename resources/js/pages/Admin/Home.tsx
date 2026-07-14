import { Head, Link, router } from '@inertiajs/react';
import {
    ArrowLeftRight,
    CheckCircle,
    ChevronDown,
    ChevronUp,
    ClipboardList,
    Home,
    HelpCircle,
    LogOut,
    RotateCcw,
    Settings,
    Undo2,
    UserCheck,
    Wrench,
    XCircle,
} from 'lucide-react';
import { useState } from 'react';
import { dashboard, logout } from '@/routes';
import { gestion as dashboardGestion, otros as dashboardOtros } from '@/routes/dashboard';

// ─── Tipos ───────────────────────────────────────────────────────────────────

interface EstadoAgregado {
    id: number;
    nombre: string;
    total: number;
    porcentaje?: number;
}

interface UbicacionOpcion {
    id: number;
    label: string;
}

interface Movimiento {
    id: number;
    tipo_movimiento: string;
    created_at: string;
    activo: { marca: string; modelo: string } | null;
    ubicacion_origen: { nombre_ubicacion: string } | null;
    ubicacion_destino: { nombre_ubicacion: string } | null;
    usuario_registra: { name: string } | null;
}

interface Props {
    auth: { user: { name: string } };
    totalActivos: number;
    estadosGlobal: EstadoAgregado[];
    ubicaciones: UbicacionOpcion[];
    ubicacionId: number | null;
    estadosUbicacion: EstadoAgregado[];
    ultimosMovimientos: Movimiento[];
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

// Orden y mapeo de color/ícono por nombre real de estados_activo.
// "En Bodega" no existe en la BD — se usa "En Mantención" en su lugar (azul).
const ESTADO_ORDEN = ['Operativo', 'En Reparación', 'En Mantención', 'De Baja'];

const ESTADO_META: Record<string, { bg: string; dot: string; Icon: typeof CheckCircle }> = {
    'Operativo':      { bg: 'bg-green-500',  dot: 'bg-green-500',  Icon: CheckCircle },
    'En Reparación':  { bg: 'bg-yellow-500', dot: 'bg-yellow-500', Icon: Wrench },
    'En Mantención':  { bg: 'bg-blue-500',   dot: 'bg-blue-500',   Icon: Settings },
    'De Baja':        { bg: 'bg-red-500',    dot: 'bg-red-500',    Icon: XCircle },
};

function estadoMeta(nombre: string) {
    return ESTADO_META[nombre] ?? { bg: 'bg-gray-400', dot: 'bg-gray-400', Icon: HelpCircle };
}

function ordenarEstados(estados: EstadoAgregado[]): EstadoAgregado[] {
    return [...estados].sort((a, b) => {
        const ia = ESTADO_ORDEN.indexOf(a.nombre);
        const ib = ESTADO_ORDEN.indexOf(b.nombre);

        return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib);
    });
}

type TipoMov = 'TRASLADO' | 'ASIGNACION' | 'DEVOLUCION' | 'MANTENIMIENTO' | 'RETORNO';

const MOV_META: Record<TipoMov, { bg: string; icon: React.ReactNode }> = {
    TRASLADO:      { bg: 'bg-blue-500',   icon: <ArrowLeftRight size={16} className="text-white" /> },
    ASIGNACION:    { bg: 'bg-green-500',  icon: <UserCheck size={16} className="text-white" /> },
    DEVOLUCION:    { bg: 'bg-orange-400', icon: <RotateCcw size={16} className="text-white" /> },
    MANTENIMIENTO: { bg: 'bg-yellow-500', icon: <Wrench size={16} className="text-white" /> },
    RETORNO:       { bg: 'bg-purple-500', icon: <Undo2 size={16} className="text-white" /> },
};

function movMeta(tipo: string) {
    return MOV_META[tipo as TipoMov] ?? { bg: 'bg-gray-400', icon: <HelpCircle size={16} className="text-white" /> };
}

function movDescripcion(mov: Movimiento): string {
    const destino = mov.ubicacion_destino?.nombre_ubicacion ?? '—';
    const usuario = mov.usuario_registra?.name ?? '—';

    switch (mov.tipo_movimiento as TipoMov) {
        case 'ASIGNACION':
            return `Asignado a ${destino} por ${usuario}`;
        case 'DEVOLUCION':
            return `Devuelto a ${destino} por ${usuario}`;
        case 'MANTENIMIENTO':
            return `Enviado a mantención en ${destino} por ${usuario}`;
        case 'RETORNO':
            return `Retornado a ${destino} por ${usuario}`;
        default:
            return `Trasladado a ${destino} por ${usuario}`;
    }
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

export default function AdminHome({
    auth,
    totalActivos,
    estadosGlobal,
    ubicaciones,
    ubicacionId,
    estadosUbicacion,
    ultimosMovimientos,
}: Props) {
    const [filtro, setFiltro] = useState<string>(ubicacionId ? String(ubicacionId) : '');
    const [movimientosExpandido, setMovimientosExpandido] = useState(true);

    const fecha = new Date().toLocaleDateString('es-CL', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    function handleFiltroChange(value: string) {
        setFiltro(value);
        router.get(
            dashboard().url,
            value ? { ubicacion_id: value } : {},
            { preserveState: true, preserveScroll: true, only: ['estadosUbicacion', 'ultimosMovimientos', 'ubicacionId'] }
        );
    }

    const estadosGlobalOrdenados    = ordenarEstados(estadosGlobal);
    const estadosUbicacionOrdenados = ordenarEstados(estadosUbicacion);

    return (
        <div className="min-h-screen bg-gray-50">
            <Head title="Panel Administrador — SCA-IT" />

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

                {/* Saludo */}
                <div className="bg-blue-50 px-4 py-6">
                    <p className="text-xl font-semibold text-blue-700">
                        Hola, desde Admin {auth.user.name}
                    </p>
                    <p className="mt-0.5 text-sm capitalize text-blue-500">{fecha}</p>
                </div>

                {/* ── Estado de Activos ────────────────────────────────── */}
                <div className="px-4 mt-4">
                    <div className="mb-3 flex items-center justify-between">
                        <h2 className="font-bold text-gray-800">Estado de Activos</h2>
                        <span className="text-sm text-gray-500">
                            Total de activos: <span className="font-bold text-gray-800">{totalActivos}</span>
                        </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        {estadosGlobalOrdenados.map(e => {
                            const meta = estadoMeta(e.nombre);

                            return (
                                <div
                                    key={e.id}
                                    className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
                                >
                                    <div className={`mb-2 flex h-10 w-10 items-center justify-center rounded-full ${meta.bg}`}>
                                        <meta.Icon size={20} className="text-white" />
                                    </div>
                                    <p className="text-2xl font-extrabold text-gray-800">{e.total}</p>
                                    <p className="text-xs text-gray-500">{e.nombre}</p>
                                    <p className="mt-0.5 text-[11px] text-gray-400">{e.porcentaje ?? 0}% del total</p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* ── Resumen por Ubicación ────────────────────────────── */}
                <div className="mx-4 mt-4 rounded-xl bg-white p-4 shadow-sm border border-gray-100">
                    <h2 className="mb-3 font-bold text-gray-800">Resumen por Ubicación</h2>

                    <label className="mb-1 block text-xs font-semibold text-gray-500">
                        Filtrar por Departamento
                    </label>
                    <select
                        value={filtro}
                        onChange={e => handleFiltroChange(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700"
                    >
                        <option value="">Todas las ubicaciones</option>
                        {ubicaciones.map(u => (
                            <option key={u.id} value={u.id}>{u.label}</option>
                        ))}
                    </select>

                    <ul className="mt-3">
                        {estadosUbicacionOrdenados.map(e => {
                            const meta = estadoMeta(e.nombre);

                            return (
                                <li
                                    key={e.id}
                                    className="flex items-center justify-between border-b border-gray-50 py-2 last:border-0"
                                >
                                    <div className="flex items-center gap-2">
                                        <span className={`h-2.5 w-2.5 rounded-full ${meta.dot}`} />
                                        <span className="text-sm text-gray-700">{e.nombre}</span>
                                    </div>
                                    <span className="text-sm font-bold text-gray-800">{e.total}</span>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                {/* ── Últimos Movimientos (colapsable) ─────────────────── */}
                <div className="mx-4 mt-3 mb-4 rounded-xl bg-white shadow-sm border border-gray-100">
                    <button
                        onClick={() => setMovimientosExpandido(v => !v)}
                        className="flex w-full items-center justify-between px-4 py-4"
                    >
                        <span className="font-bold text-gray-800 text-sm">Últimos Movimientos del Equipo</span>
                        {movimientosExpandido
                            ? <ChevronUp size={18} className="text-gray-400" />
                            : <ChevronDown size={18} className="text-gray-400" />}
                    </button>

                    {movimientosExpandido && (
                        ultimosMovimientos.length === 0 ? (
                            <p className="pb-6 text-center text-sm text-gray-400">Sin movimientos</p>
                        ) : (
                            <ul>
                                {ultimosMovimientos.map(mov => {
                                    const meta = movMeta(mov.tipo_movimiento);

                                    return (
                                        <li
                                            key={mov.id}
                                            className="flex items-center gap-3 border-t border-gray-50 px-4 py-3"
                                        >
                                            <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${meta.bg}`}>
                                                {meta.icon}
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="truncate text-sm font-semibold text-gray-800">
                                                    {mov.activo ? `${mov.activo.marca} ${mov.activo.modelo}` : '—'}
                                                </p>
                                                <p className="truncate text-xs text-gray-400">{movDescripcion(mov)}</p>
                                            </div>
                                            <span className="shrink-0 text-xs text-gray-400">
                                                {tiempoRelativo(mov.created_at)}
                                            </span>
                                        </li>
                                    );
                                })}
                            </ul>
                        )
                    )}
                </div>
            </div>

            {/* ── Bottom nav ────────────────────────────────────────────── */}
            <nav className="fixed inset-x-0 bottom-0 z-50 flex border-t border-gray-200 bg-white">
                <button className="flex flex-1 flex-col items-center justify-center py-3 text-xs text-blue-600">
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
                    className="flex flex-1 flex-col items-center justify-center py-3 text-xs text-gray-400"
                >
                    <Settings size={22} />
                    <span className="mt-0.5">Otros</span>
                </button>
            </nav>
        </div>
    );
}

AdminHome.layout = null;
