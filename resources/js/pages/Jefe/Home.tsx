import { Head, Link } from '@inertiajs/react';
import {
    ArrowLeftRight,
    BarChart2,
    Building2,
    History,
    Home,
    LogOut,
    Monitor,
    RotateCcw,
    Users,
    Wrench,
    HelpCircle,
    UserCheck,
} from 'lucide-react';
import { logout } from '@/routes';
import { index as historialIndex } from '@/routes/historial';

// ─── Tipos ───────────────────────────────────────────────────────────────────

interface AgregadoItem {
    nombre: string;
    total: number;
}

interface Movimiento {
    id: number;
    tipo_movimiento: string;
    created_at: string;
    activo: { id: number; codigo_inventario: string; marca: string; modelo: string } | null;
    ubicacion_origen: { nombre_ubicacion: string } | null;
    ubicacion_destino: { nombre_ubicacion: string } | null;
    usuario_registra: { name: string } | null;
}

interface Props {
    auth: { user: { name: string } };
    totalActivos: number;
    totalUsuarios: number;
    movimientosMes: number;
    activosPorEstado: AgregadoItem[];
    activosPorTipo: AgregadoItem[];
    activosPorDepartamento: AgregadoItem[];
    ultimosMovimientos: Movimiento[];
    usuariosPorRol: AgregadoItem[];
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function fechaCorta(iso: string): string {
    return new Date(iso).toLocaleDateString('es-CL', {
        day: 'numeric',
        month: 'short',
    });
}

type TipoMov = 'TRASLADO' | 'ASIGNACION' | 'DEVOLUCION' | 'MANTENIMIENTO';

const MOV_META: Record<TipoMov, { bg: string; badge: string; icon: React.ReactNode }> = {
    TRASLADO:      { bg: 'bg-blue-500',   badge: 'bg-blue-100 text-blue-700',     icon: <ArrowLeftRight size={14} className="text-white" /> },
    ASIGNACION:    { bg: 'bg-green-500',  badge: 'bg-green-100 text-green-700',   icon: <UserCheck size={14} className="text-white" /> },
    DEVOLUCION:    { bg: 'bg-orange-400', badge: 'bg-orange-100 text-orange-700', icon: <RotateCcw size={14} className="text-white" /> },
    MANTENIMIENTO: { bg: 'bg-yellow-500', badge: 'bg-yellow-100 text-yellow-700', icon: <Wrench size={14} className="text-white" /> },
};

function movMeta(tipo: string) {
    return MOV_META[tipo as TipoMov] ?? {
        bg: 'bg-gray-400',
        badge: 'bg-gray-100 text-gray-600',
        icon: <HelpCircle size={14} className="text-white" />,
    };
}

function estadoColor(nombre: string): string {
    if (/operativo/i.test(nombre))   {
return 'bg-green-500';
}

    if (/baja/i.test(nombre))        {
return 'bg-red-500';
}

    if (/reparaci/i.test(nombre))    {
return 'bg-yellow-400';
}

    if (/bodega/i.test(nombre))      {
return 'bg-blue-400';
}

    return 'bg-gray-400';
}

// ─── Sub-componentes ─────────────────────────────────────────────────────────

function KpiCard({ icon, label, value, color }: {
    icon: React.ReactNode;
    label: string;
    value: number;
    color: string;
}) {
    return (
        <div className="flex flex-col items-center rounded-xl border border-gray-100 bg-white p-4 text-center shadow-sm">
            <div className={`mb-2 flex h-12 w-12 items-center justify-center rounded-full ${color}`}>
                {icon}
            </div>
            <span className="text-2xl font-extrabold text-gray-800">{value.toLocaleString('es-CL')}</span>
            <span className="mt-0.5 text-xs text-gray-400 leading-tight">{label}</span>
        </div>
    );
}

function BarraChart({ data, colorFn }: {
    data: AgregadoItem[];
    colorFn: (nombre: string) => string;
}) {
    const max = Math.max(...data.map(d => d.total), 1);

    return (
        <div className="flex items-end gap-2 h-36 px-1">
            {data.map(d => (
                <div key={d.nombre} className="flex flex-col items-center flex-1 min-w-0">
                    <span className="text-xs font-bold text-gray-700 mb-1">{d.total}</span>
                    <div
                        className={`w-full rounded-t-md ${colorFn(d.nombre)}`}
                        style={{ height: `${Math.max(Math.round((d.total / max) * 100), 4)}%` }}
                    />
                    <span className="text-[9px] text-gray-500 mt-1 text-center leading-tight w-full truncate">{d.nombre}</span>
                </div>
            ))}
        </div>
    );
}

// ─── Página principal ─────────────────────────────────────────────────────────

export default function JefeHome({
    auth,
    totalActivos,
    totalUsuarios,
    movimientosMes,
    activosPorEstado,
    activosPorTipo,
    activosPorDepartamento,
    ultimosMovimientos,
    usuariosPorRol,
}: Props) {
    return (
        <div className="min-h-screen bg-gray-50">
            <Head title="Dashboard Jefatura — SCA-IT" />

            {/* ── Navbar ────────────────────────────────────────────────── */}
            <nav className="fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between bg-blue-700 px-4">
                <span className="text-base font-bold text-white leading-tight">
                    SCA Hospital — Vista Jefatura
                </span>
                <Link
                    href={logout().url}
                    method="post"
                    as="button"
                    className="flex items-center text-white opacity-80 hover:opacity-100 transition-opacity"
                    aria-label="Cerrar sesión"
                >
                    <LogOut size={20} />
                </Link>
            </nav>

            {/* ── Contenido ─────────────────────────────────────────────── */}
            <div className="pt-14 pb-24">

                {/* Banner bienvenida */}
                <div className="bg-blue-50 px-4 py-5">
                    <p className="text-lg font-semibold text-blue-700">
                        Bienvenido/a, {auth.user.name}
                    </p>
                    <p className="mt-0.5 text-sm text-blue-400">
                        {new Date().toLocaleDateString('es-CL', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                </div>

                {/* ── KPIs ─────────────────────────────────────────────── */}
                <div className="grid grid-cols-3 gap-3 px-4 mt-4">
                    <KpiCard
                        icon={<Monitor size={24} className="text-white" />}
                        label="Activos registrados"
                        value={totalActivos}
                        color="bg-blue-600"
                    />
                    <KpiCard
                        icon={<Users size={24} className="text-white" />}
                        label="Usuarios del sistema"
                        value={totalUsuarios}
                        color="bg-indigo-500"
                    />
                    <KpiCard
                        icon={<ArrowLeftRight size={24} className="text-white" />}
                        label="Movimientos este mes"
                        value={movimientosMes}
                        color="bg-emerald-500"
                    />
                </div>

                {/* ── Activos por estado (gráfico de barras) ───────────── */}
                <div className="mx-4 mt-4 rounded-xl bg-white p-4 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-2 mb-4">
                        <BarChart2 size={18} className="text-blue-600" />
                        <span className="font-bold text-gray-800 text-sm">Activos por Estado</span>
                    </div>
                    {activosPorEstado.length === 0 ? (
                        <p className="text-center text-sm text-gray-400 py-8">Sin datos</p>
                    ) : (
                        <BarraChart data={activosPorEstado} colorFn={estadoColor} />
                    )}
                </div>

                {/* ── Activos por tipo y por departamento ──────────────── */}
                <div className="mx-4 mt-3 grid grid-cols-2 gap-3">

                    {/* Por tipo */}
                    <div className="rounded-xl bg-white p-4 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-1.5 mb-3">
                            <Monitor size={15} className="text-blue-600" />
                            <span className="text-xs font-bold text-gray-700">Por Tipo</span>
                        </div>
                        <ul className="space-y-1.5">
                            {activosPorTipo.map(t => (
                                <li key={t.nombre} className="flex items-center justify-between">
                                    <span className="text-xs text-gray-600 truncate pr-2">{t.nombre}</span>
                                    <span className="text-xs font-bold text-blue-700 shrink-0">{t.total}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Por departamento */}
                    <div className="rounded-xl bg-white p-4 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-1.5 mb-3">
                            <Building2 size={15} className="text-blue-600" />
                            <span className="text-xs font-bold text-gray-700">Por Depto.</span>
                        </div>
                        <ul className="space-y-1.5">
                            {activosPorDepartamento.map(d => (
                                <li key={d.nombre} className="flex items-center justify-between">
                                    <span className="text-xs text-gray-600 truncate pr-2">{d.nombre}</span>
                                    <span className="text-xs font-bold text-blue-700 shrink-0">{d.total}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* ── Usuarios por rol ─────────────────────────────────── */}
                <div className="mx-4 mt-3 rounded-xl bg-white p-4 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-2 mb-3">
                        <Users size={16} className="text-blue-600" />
                        <span className="font-bold text-gray-800 text-sm">Usuarios por Rol</span>
                    </div>
                    <div className="flex gap-3">
                        {usuariosPorRol.map(r => (
                            <div key={r.nombre} className="flex-1 rounded-lg bg-gray-50 border border-gray-100 p-3 text-center">
                                <span className="text-xl font-extrabold text-blue-700">{r.total}</span>
                                <p className="text-[10px] text-gray-500 mt-0.5">{r.nombre}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Últimos movimientos ──────────────────────────────── */}
                <div className="mx-4 mt-3 mb-4 rounded-xl bg-white shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-gray-50">
                        <div className="flex items-center gap-2">
                            <History size={16} className="text-blue-600" />
                            <span className="font-bold text-gray-800 text-sm">Últimos Movimientos</span>
                        </div>
                        <span className="rounded-full bg-blue-600 px-2.5 py-0.5 text-xs font-semibold text-white">
                            {ultimosMovimientos.length}
                        </span>
                    </div>

                    {ultimosMovimientos.length === 0 ? (
                        <div className="flex flex-col items-center py-10 text-gray-400">
                            <History size={32} className="mb-2 opacity-40" />
                            <p className="text-sm">Sin movimientos registrados</p>
                        </div>
                    ) : (
                        <ul>
                            {ultimosMovimientos.map(mov => {
                                const meta = movMeta(mov.tipo_movimiento);

                                return (
                                    <li
                                        key={mov.id}
                                        className="flex items-center gap-3 px-4 py-3 border-b border-gray-50 last:border-0"
                                    >
                                        <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${meta.bg}`}>
                                            {meta.icon}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-sm font-semibold text-gray-800 truncate">
                                                {mov.activo
                                                    ? `${mov.activo.marca} ${mov.activo.modelo}`
                                                    : '—'}
                                            </p>
                                            <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                                                <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${meta.badge}`}>
                                                    {mov.tipo_movimiento}
                                                </span>
                                                {mov.ubicacion_destino && (
                                                    <span className="text-[10px] text-gray-400 truncate">
                                                        → {mov.ubicacion_destino.nombre_ubicacion}
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-[10px] text-gray-400 mt-0.5">
                                                {mov.usuario_registra?.name ?? '—'} · {fechaCorta(mov.created_at)}
                                            </p>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>
            </div>

            {/* ── Bottom nav ────────────────────────────────────────────── */}
            <nav className="fixed inset-x-0 bottom-0 z-50 flex border-t border-gray-200 bg-white">
                <button className="flex flex-1 flex-col items-center justify-center py-3 text-xs text-blue-600">
                    <Home size={22} />
                    <span className="mt-0.5">Inicio</span>
                </button>
                <Link
                    href={historialIndex().url}
                    className="flex flex-1 flex-col items-center justify-center py-3 text-xs text-gray-400"
                >
                    <History size={22} />
                    <span className="mt-0.5">Historial</span>
                </Link>
            </nav>
        </div>
    );
}

JefeHome.layout = null;
