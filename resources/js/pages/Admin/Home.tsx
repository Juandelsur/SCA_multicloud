import { Head, Link, router } from '@inertiajs/react';
import {
    ArrowLeftRight,
    BookOpen,
    ClipboardList,
    History,
    Home,
    HelpCircle,
    LogOut,
    Monitor,
    Package,
    RotateCcw,
    Settings,
    Shield,
    UserCheck,
    Users,
    Wrench,
} from 'lucide-react';
import { logout } from '@/routes';
import { index as activosIndex } from '@/routes/activos';
import { index as auditoriaIndex } from '@/routes/auditoria';
import { index as departamentosIndex } from '@/routes/departamentos';
import { index as historialIndex } from '@/routes/historial';
import { index as usuariosIndex } from '@/routes/usuarios';

// ─── Tipos ───────────────────────────────────────────────────────────────────

interface AgregadoItem {
    nombre: string;
    total: number;
}

interface Movimiento {
    id: number;
    tipo_movimiento: string;
    created_at: string;
    activo: { codigo_inventario: string; marca: string; modelo: string } | null;
    ubicacion_origen: { nombre_ubicacion: string } | null;
    ubicacion_destino: { nombre_ubicacion: string } | null;
    usuario_registra: { name: string } | null;
}

interface UsuarioReciente {
    id: number;
    name: string;
    email: string;
    created_at: string;
    roles: { name: string }[];
}

interface Props {
    auth: { user: { name: string } };
    totalActivos: number;
    totalUsuarios: number;
    movimientosMes: number;
    activosPorEstado: AgregadoItem[];
    ultimosMovimientos: Movimiento[];
    usuariosRecientes: UsuarioReciente[];
    usuariosPorRol: AgregadoItem[];
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function fechaCorta(iso: string): string {
    return new Date(iso).toLocaleDateString('es-CL', { day: 'numeric', month: 'short', year: 'numeric' });
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

function rolBadge(nombre: string): string {
    if (/admin/i.test(nombre))   {
return 'bg-rose-100 text-rose-700';
}

    if (/t[eé]cnico/i.test(nombre)) {
return 'bg-blue-100 text-blue-700';
}

    if (/jefe/i.test(nombre))    {
return 'bg-purple-100 text-purple-700';
}

    return 'bg-gray-100 text-gray-600';
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
            <div className={`mb-2 flex h-11 w-11 items-center justify-center rounded-full ${color}`}>
                {icon}
            </div>
            <span className="text-2xl font-extrabold text-gray-800">{value.toLocaleString('es-CL')}</span>
            <span className="mt-0.5 text-[10px] text-gray-400 leading-tight">{label}</span>
        </div>
    );
}

function AccesoCard({ icon, title, subtitle, onClick, exclusive }: {
    icon: React.ReactNode;
    title: string;
    subtitle: string;
    onClick: () => void;
    exclusive?: boolean;
}) {
    return (
        <button
            onClick={onClick}
            className="relative flex flex-col items-center rounded-xl border border-gray-100 bg-white p-4 text-center shadow-sm active:scale-95 transition-transform w-full"
        >
            {exclusive && (
                <span className="absolute top-2 right-2 flex items-center gap-0.5 rounded-full bg-rose-100 px-1.5 py-0.5 text-[9px] font-bold text-rose-600">
                    <Shield size={9} />
                    ADMIN
                </span>
            )}
            <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600">
                {icon}
            </div>
            <span className="text-xs font-bold text-gray-800 leading-tight">{title}</span>
            <span className="mt-0.5 text-[10px] text-gray-400 leading-tight">{subtitle}</span>
        </button>
    );
}

// ─── Página principal ─────────────────────────────────────────────────────────

export default function AdminHome({
    auth,
    totalActivos,
    totalUsuarios,
    movimientosMes,
    activosPorEstado,
    ultimosMovimientos,
    usuariosRecientes,
    usuariosPorRol,
}: Props) {
    return (
        <div className="min-h-screen bg-gray-50">
            <Head title="Panel Administrador — SCA-IT" />

            {/* ── Navbar ────────────────────────────────────────────────── */}
            <nav className="fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between bg-blue-700 px-4">
                <span className="text-base font-bold text-white leading-tight">
                    SCA Hospital — Panel Administrador
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

                {/* Banner */}
                <div className="bg-blue-50 px-4 py-5">
                    <p className="text-lg font-semibold text-blue-700">
                        Hola, {auth.user.name}
                    </p>
                    <p className="mt-0.5 text-sm text-blue-400">
                        {new Date().toLocaleDateString('es-CL', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                </div>

                {/* ── KPIs ─────────────────────────────────────────────── */}
                <div className="grid grid-cols-3 gap-3 px-4 mt-4">
                    <KpiCard
                        icon={<Monitor size={20} className="text-white" />}
                        label="Activos"
                        value={totalActivos}
                        color="bg-blue-600"
                    />
                    <KpiCard
                        icon={<Users size={20} className="text-white" />}
                        label="Usuarios"
                        value={totalUsuarios}
                        color="bg-indigo-500"
                    />
                    <KpiCard
                        icon={<ArrowLeftRight size={20} className="text-white" />}
                        label="Movimientos mes"
                        value={movimientosMes}
                        color="bg-emerald-500"
                    />
                </div>

                {/* Activos por estado (pills) */}
                <div className="flex gap-2 flex-wrap px-4 mt-3">
                    {activosPorEstado.map(e => (
                        <span key={e.nombre} className="rounded-full bg-white border border-gray-200 px-3 py-1 text-xs font-medium text-gray-700 shadow-sm">
                            {e.nombre} <span className="font-bold text-blue-700">{e.total}</span>
                        </span>
                    ))}
                </div>

                {/* ── Accesos rápidos ───────────────────────────────────── */}
                <div className="px-4 mt-4">
                    <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Gestión</p>
                    <div className="grid grid-cols-3 gap-3">
                        <AccesoCard
                            icon={<Package size={22} className="text-white" />}
                            title="Activos"
                            subtitle="CRUD completo"
                            onClick={() => router.visit(activosIndex().url)}
                        />
                        <AccesoCard
                            icon={<Users size={22} className="text-white" />}
                            title="Usuarios"
                            subtitle="Crear · Editar · Roles"
                            onClick={() => router.visit(usuariosIndex().url)}
                            exclusive
                        />
                        <AccesoCard
                            icon={<Settings size={22} className="text-white" />}
                            title="Maestros"
                            subtitle="Depts · Ubics · Tipos"
                            onClick={() => router.visit(departamentosIndex().url)}
                        />
                        <AccesoCard
                            icon={<ClipboardList size={22} className="text-white" />}
                            title="Auditoría"
                            subtitle="Solo lectura"
                            onClick={() => router.visit(auditoriaIndex().url)}
                        />
                        <AccesoCard
                            icon={<History size={22} className="text-white" />}
                            title="Historial"
                            subtitle="Todos los movimientos"
                            onClick={() => router.visit(historialIndex().url)}
                        />
                        <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center p-4 text-center">
                            <BookOpen size={22} className="text-gray-300 mb-1" />
                            <span className="text-[10px] text-gray-300 leading-tight">Próximamente</span>
                        </div>
                    </div>
                </div>

                {/* ── Usuarios por rol ─────────────────────────────────── */}
                <div className="mx-4 mt-4 rounded-xl bg-white p-4 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-2 mb-3">
                        <Shield size={16} className="text-rose-500" />
                        <span className="font-bold text-gray-800 text-sm">Usuarios por Rol</span>
                        <span className="ml-auto text-[10px] text-rose-500 font-semibold uppercase tracking-wide">Exclusivo Admin</span>
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
                <div className="mx-4 mt-3 rounded-xl bg-white shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-gray-50">
                        <div className="flex items-center gap-2">
                            <History size={16} className="text-blue-600" />
                            <span className="font-bold text-gray-800 text-sm">Últimos Movimientos</span>
                        </div>
                        <button
                            onClick={() => router.visit(historialIndex().url)}
                            className="text-[10px] font-semibold text-blue-600 uppercase tracking-wide"
                        >
                            Ver todo
                        </button>
                    </div>
                    {ultimosMovimientos.length === 0 ? (
                        <p className="text-center text-sm text-gray-400 py-8">Sin movimientos</p>
                    ) : (
                        <ul>
                            {ultimosMovimientos.map(mov => {
                                const meta = movMeta(mov.tipo_movimiento);

                                return (
                                    <li key={mov.id} className="flex items-center gap-3 px-4 py-3 border-b border-gray-50 last:border-0">
                                        <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${meta.bg}`}>
                                            {meta.icon}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-sm font-semibold text-gray-800 truncate">
                                                {mov.activo ? `${mov.activo.marca} ${mov.activo.modelo}` : '—'}
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

                {/* ── Usuarios recientes ───────────────────────────────── */}
                <div className="mx-4 mt-3 mb-4 rounded-xl bg-white shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-gray-50">
                        <div className="flex items-center gap-2">
                            <Users size={16} className="text-blue-600" />
                            <span className="font-bold text-gray-800 text-sm">Usuarios Recientes</span>
                        </div>
                        <button
                            onClick={() => router.visit(usuariosIndex().url)}
                            className="text-[10px] font-semibold text-blue-600 uppercase tracking-wide"
                        >
                            Gestionar
                        </button>
                    </div>
                    {usuariosRecientes.length === 0 ? (
                        <p className="text-center text-sm text-gray-400 py-8">Sin usuarios</p>
                    ) : (
                        <ul>
                            {usuariosRecientes.map(u => (
                                <li key={u.id} className="flex items-center gap-3 px-4 py-3 border-b border-gray-50 last:border-0">
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-100">
                                        <Users size={16} className="text-indigo-600" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm font-semibold text-gray-800 truncate">{u.name}</p>
                                        <p className="text-[10px] text-gray-400 truncate">{u.email}</p>
                                    </div>
                                    <div className="shrink-0 text-right">
                                        {u.roles[0] && (
                                            <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${rolBadge(u.roles[0].name)}`}>
                                                {u.roles[0].name}
                                            </span>
                                        )}
                                        <p className="text-[9px] text-gray-300 mt-0.5">{fechaCorta(u.created_at)}</p>
                                    </div>
                                </li>
                            ))}
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
                <button
                    onClick={() => router.visit(activosIndex().url)}
                    className="flex flex-1 flex-col items-center justify-center py-3 text-xs text-gray-400"
                >
                    <Package size={22} />
                    <span className="mt-0.5">Activos</span>
                </button>
                <button
                    onClick={() => router.visit(usuariosIndex().url)}
                    className="flex flex-1 flex-col items-center justify-center py-3 text-xs text-gray-400"
                >
                    <Users size={22} />
                    <span className="mt-0.5">Usuarios</span>
                </button>
                <button
                    onClick={() => router.visit(auditoriaIndex().url)}
                    className="flex flex-1 flex-col items-center justify-center py-3 text-xs text-gray-400"
                >
                    <ClipboardList size={22} />
                    <span className="mt-0.5">Auditoría</span>
                </button>
            </nav>
        </div>
    );
}

AdminHome.layout = null;
