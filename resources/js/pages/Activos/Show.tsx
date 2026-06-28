import { Head, Link, router } from '@inertiajs/react';
import {
    Activity,
    ArrowLeftRight,
    Barcode,
    CheckCircle,
    ChevronLeft,
    X,
    Hash,
    History,
    Home,
    LogOut,
    MapPin,
    Package,
    Pencil,
    Printer,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { logout } from '@/routes';
import { index as activosIndex, edit as activosEdit, movilizar as activosMovilizar } from '@/routes/activos';
import { show as activosShow } from '@/routes/activos';
import { index as historialIndex } from '@/routes/historial';
import { home as tecnicoHome, imprimir as tecnicoImprimir } from '@/routes/tecnico';

// ─── Tipos ───────────────────────────────────────────────────────────────────

interface Movimiento {
    id: number;
    tipo_movimiento: string;
    comentarios: string | null;
    created_at: string;
    ubicacion_origen: { id: number; nombre_ubicacion: string } | null;
    ubicacion_destino: { id: number; nombre_ubicacion: string } | null;
    usuario_registra: { id: number; name: string } | null;
}

interface Activo {
    id: number;
    codigo_inventario: string;
    marca: string;
    modelo: string;
    numero_serie: string | null;
    descripcion: string | null;
    foto_path: string | null;
    ubicacion_actual_id: number | null;
    tipo: { id: number; nombre_tipo: string } | null;
    estado: { id: number; nombre_estado: string } | null;
    ubicacion_actual: {
        id: number;
        nombre_ubicacion: string;
        departamento: { id: number; nombre_departamento: string } | null;
    } | null;
    historial_movimientos: Movimiento[];
}

interface Props {
    activo: Activo;
    foto_url: string | null;
    auth: { user: { name: string; roles: string[] } };
    ubicaciones: Array<{ id: number; nombre_ubicacion: string }>;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function estadoBadge(nombre: string | undefined): string {
    switch (nombre) {
        case 'Operativo':      return 'bg-green-100 text-green-700';
        case 'De Baja':        return 'bg-red-100 text-red-700';
        case 'En Reparación':  return 'bg-orange-100 text-orange-700';
        case 'En Bodega TI':   return 'bg-blue-100 text-blue-700';
        default:               return 'bg-gray-100 text-gray-600';
    }
}

function fechaCorta(iso: string): string {
    return new Date(iso).toLocaleDateString('es-CL', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
}

// ─── Sub-componente: card de dato ─────────────────────────────────────────────

function DatoCard({
    icon,
    label,
    children,
}: {
    icon: React.ReactNode;
    label: string;
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5 text-blue-600">
                {icon}
                <span className="text-xs text-gray-500">{label}</span>
            </div>
            {children}
        </div>
    );
}

// ─── Sub-componente: card de acción ──────────────────────────────────────────

function ActionCard({
    icon,
    title,
    subtitle,
    onClick,
}: {
    icon: React.ReactNode;
    title: string;
    subtitle: string;
    onClick: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className="flex flex-col items-center rounded-xl border border-gray-100 bg-white p-4 text-center shadow-sm active:scale-95 transition-transform w-full"
        >
            <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600">
                {icon}
            </div>
            <span className="text-xs font-bold text-gray-800 leading-tight">{title}</span>
            <span className="mt-0.5 text-[10px] text-gray-400 leading-tight">{subtitle}</span>
        </button>
    );
}

// ─── Página principal ─────────────────────────────────────────────────────────

export default function Show({ activo, foto_url, auth }: Props) {
    const historialRef = useRef<HTMLDivElement>(null);

    const initialToast = new URLSearchParams(window.location.search).get('toast');

    const [toastMessage, setToastMessage] = useState<string | null>(initialToast);

    useEffect(() => {
        if (!initialToast) return;
        const timer = window.setTimeout(() => setToastMessage(null), 5000);
        return () => window.clearTimeout(timer);
    }, []);

    const puedeEditar = auth.user.roles?.some(r =>
        r === 'Técnico' || r === 'Administrador'
    ) ?? true;

    return (
        <div className="min-h-screen bg-gray-50">
            <Head title={`${activo.marca} ${activo.modelo} — SCA-IT`} />

            {/* ── Navbar ────────────────────────────────────────────────── */}
            <nav className="fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between bg-blue-700 px-4">
                <span className="text-lg font-bold text-white">
                    SCA Hospital
                </span>
                <Link
                    href={logout().url}
                    method="post"
                    as="button"
                    className="flex items-center text-white opacity-80 transition-opacity hover:opacity-100"
                    aria-label="Cerrar sesión"
                >
                    <LogOut size={20} />
                </Link>
            </nav>

            {/* ── Contenido ─────────────────────────────────────────────── */}
            <div className="pt-14 pb-24">
                {/* ── Breadcrumb / header ─────────────────────────────── */}
                <div className="bg-gray-50 px-4 py-3">
                    <p className="mb-1 text-[10px] font-semibold tracking-widest text-blue-600 uppercase">
                        Detalle del Activo
                    </p>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => router.visit(activosIndex().url)}
                            className="text-gray-400 transition-colors hover:text-gray-600"
                            aria-label="Volver"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <span className="text-base font-bold text-gray-800">
                            {activo.codigo_inventario}
                        </span>
                    </div>
                </div>

                {/* ── Card header azul ────────────────────────────────── */}
                <div className="mx-4 mt-2 flex flex-col items-center rounded-xl bg-blue-600 p-5 text-center">
                    {foto_url ? (
                        <img
                            src={foto_url}
                            alt={`${activo.marca} ${activo.modelo}`}
                            className="mb-3 h-20 w-20 rounded-xl object-cover"
                        />
                    ) : (
                        <div className="mb-3">
                            <Package size={48} className="text-white" />
                        </div>
                    )}
                    <h1 className="text-2xl leading-tight font-bold text-white">
                        {activo.marca} {activo.modelo}
                    </h1>
                    <p className="mt-1 text-sm text-blue-100">
                        {activo.tipo?.nombre_tipo ?? '—'}
                    </p>
                </div>

                {/* ── Card de datos ────────────────────────────────────── */}
                <div className="mx-4 mt-3 rounded-xl bg-white p-4">
                    <div className="grid grid-cols-3 gap-4">
                        <DatoCard icon={<Barcode size={14} />} label="Código">
                            <span className="text-sm font-bold break-all text-gray-800">
                                {activo.codigo_inventario}
                            </span>
                        </DatoCard>

                        <DatoCard icon={<Hash size={14} />} label="Serie">
                            <span className="text-sm font-semibold text-gray-700">
                                {activo.numero_serie ?? '—'}
                            </span>
                        </DatoCard>

                        <DatoCard icon={<Activity size={14} />} label="Estado">
                            <span
                                className={`self-start rounded-full px-2 py-0.5 text-xs font-medium ${estadoBadge(activo.estado?.nombre_estado)}`}
                            >
                                {activo.estado?.nombre_estado ?? '—'}
                            </span>
                        </DatoCard>
                    </div>

                    <div className="my-4 border-t border-gray-100" />

                    <DatoCard
                        icon={<MapPin size={14} />}
                        label="Ubicación Actual"
                    >
                        <span className="text-sm font-bold text-gray-800">
                            {activo.ubicacion_actual?.nombre_ubicacion ?? '—'}
                        </span>
                        {activo.ubicacion_actual?.departamento && (
                            <span className="text-xs text-gray-400">
                                {
                                    activo.ubicacion_actual.departamento
                                        .nombre_departamento
                                }
                            </span>
                        )}
                    </DatoCard>
                </div>

                {/* ── Grid de acciones ─────────────────────────────────── */}
                <div className="mx-4 mt-3 grid grid-cols-3 gap-3">
                    <ActionCard
                        icon={
                            <ArrowLeftRight size={22} className="text-white" />
                        }
                        title="Generar Movimiento"
                        subtitle="Trasladar o asignar"
                        onClick={() =>
                            router.visit(activosMovilizar(activo.id).url)
                        }
                    />
                    {puedeEditar && (
                        <ActionCard
                            icon={<Pencil size={22} className="text-white" />}
                            title="Actualizar"
                            subtitle="Editar información"
                            onClick={() =>
                                router.visit(activosEdit(activo.id).url)
                            }
                        />
                    )}
                    <ActionCard
                        icon={<History size={22} className="text-white" />}
                        title="Historial"
                        subtitle="Ver movimientos"
                        onClick={() =>
                            historialRef.current?.scrollIntoView({
                                behavior: 'smooth',
                            })
                        }
                    />
                </div>

                {/* ── Sección historial ─────────────────────────────────── */}
                <div ref={historialRef} className="mx-4 mt-4 pb-4">
                    <h2 className="mb-3 font-bold text-gray-800">
                        Historial de Movimientos
                    </h2>

                    {activo.historial_movimientos.length === 0 ? (
                        <div className="flex flex-col items-center py-10 text-gray-400">
                            <History size={36} className="mb-2 opacity-40" />
                            <p className="text-sm">
                                Sin movimientos registrados
                            </p>
                        </div>
                    ) : (
                        <ul>
                            {activo.historial_movimientos.map((mov) => (
                                <li
                                    key={mov.id}
                                    className="flex gap-3 border-b border-gray-100 py-3 last:border-0"
                                >
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-500">
                                        <ArrowLeftRight
                                            size={16}
                                            className="text-white"
                                        />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-sm font-medium text-gray-800">
                                            {mov.ubicacion_origen
                                                ?.nombre_ubicacion ??
                                                'Sin origen'}
                                            {' → '}
                                            {mov.ubicacion_destino
                                                ?.nombre_ubicacion ??
                                                'Sin destino'}
                                        </p>
                                        <p className="mt-0.5 text-xs text-gray-400">
                                            Por{' '}
                                            {mov.usuario_registra?.name ?? '—'}{' '}
                                            &bull; {fechaCorta(mov.created_at)}
                                        </p>
                                        {mov.comentarios && (
                                            <p className="mt-0.5 text-xs text-gray-500 italic">
                                                {mov.comentarios}
                                            </p>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            {/* ── Toast de éxito ────────────────────────────────────────── */}
            {toastMessage && (
                <div className="fixed top-20 left-4 right-4 z-50 bg-green-600 text-white rounded-xl px-4 py-4 flex items-center gap-3 shadow-xl border border-green-400">
                    <CheckCircle size={24} className="flex-shrink-0" />
                    <span className="font-semibold text-base flex-1">{toastMessage}</span>
                    <button onClick={() => setToastMessage(null)} className="text-white/70 hover:text-white ml-2">
                        <X size={18} />
                    </button>
                </div>
            )}

            {/* ── Bottom nav ────────────────────────────────────────────── */}
            <nav className="fixed inset-x-0 bottom-0 z-50 flex border-t border-gray-200 bg-white">
                <button
                    onClick={() => router.visit(tecnicoHome().url)}
                    className="flex flex-1 flex-col items-center justify-center py-3 text-xs text-gray-400"
                >
                    <Home size={22} />
                    <span className="mt-0.5">Inicio</span>
                </button>
                <button
                    onClick={() => router.visit(historialIndex().url)}
                    className="flex flex-1 flex-col items-center justify-center py-3 text-xs text-gray-400"
                >
                    <History size={22} />
                    <span className="mt-0.5">Mi Historial</span>
                </button>
                <button
                    onClick={() => router.visit(tecnicoImprimir().url)}
                    className="flex flex-1 flex-col items-center justify-center py-3 text-xs text-gray-400"
                >
                    <Printer size={22} />
                    <span className="mt-0.5">Imprimir</span>
                </button>
            </nav>
        </div>
    );
}

// Página standalone — sin AppLayout global.
Show.layout = null;
