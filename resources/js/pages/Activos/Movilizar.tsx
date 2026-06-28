import { Head, Link, router, useForm } from '@inertiajs/react';
import { ChevronLeft, LogOut } from 'lucide-react';
import { History, Home, Printer } from 'lucide-react';
import { logout } from '@/routes';
import { show as activosShow, movilizar as activosMovilizar } from '@/routes/activos';
import { index as historialIndex } from '@/routes/historial';
import { home as tecnicoHome, imprimir as tecnicoImprimir } from '@/routes/tecnico';

// ─── Tipos ───────────────────────────────────────────────────────────────────

interface Props {
    activo: {
        id: number;
        codigo_inventario: string;
        marca: string;
        modelo: string;
        ubicacion_actual_id: number | null;
        tipo: { nombre_tipo: string } | null;
        estado: { nombre_estado: string } | null;
        ubicacion_actual: { nombre_ubicacion: string } | null;
    };
    ubicaciones: Array<{ id: number; nombre_ubicacion: string; departamento_id: number }>;
    auth: { user: { name: string } };
}

// ─── Página ───────────────────────────────────────────────────────────────────

export default function Movilizar({ activo, ubicaciones }: Props) {
    const form = useForm({
        ubicacion_destino_id: '',
        tipo_movimiento: 'TRASLADO',
        comentarios: '',
    });

    function handleSubmit() {
        form.post(activosMovilizar(activo.id).url, {
            onSuccess: () => {
                window.location.href = `/activos/${activo.id}?toast=Activo+movilizado+correctamente.`;
            },
        });
    }

    function goBack() {
        router.visit(activosShow({ activo: activo.id }).url);
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Head title={`Movilizar — ${activo.marca} ${activo.modelo}`} />

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
                    <LogOut size={20} />
                </Link>
            </nav>

            {/* ── Contenido ─────────────────────────────────────────────── */}
            <div className="pt-14 pb-24">

                {/* ── Header ──────────────────────────────────────────── */}
                <div className="bg-gray-50 px-4 py-4">
                    <p className="text-[10px] font-semibold tracking-widest text-blue-600 uppercase mb-1">
                        Activos / Movilizar
                    </p>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={goBack}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                            aria-label="Volver"
                        >
                            <ChevronLeft size={22} />
                        </button>
                        <span className="font-bold text-gray-800 text-xl">Generar Movimiento</span>
                    </div>
                </div>

                {/* ── Card info activo ─────────────────────────────────── */}
                <div className="bg-blue-600 rounded-xl mx-4 mt-3 p-4">
                    <p className="text-white font-bold text-lg leading-tight">
                        {activo.marca} {activo.modelo}
                    </p>
                    <p className="text-blue-100 text-sm mt-0.5">{activo.codigo_inventario}</p>
                    {activo.tipo && (
                        <p className="text-blue-200 text-xs mt-0.5">{activo.tipo.nombre_tipo}</p>
                    )}
                </div>

                {/* ── Card formulario ──────────────────────────────────── */}
                <div className="bg-white rounded-xl mx-4 mt-3 p-4">

                    {/* Origen (readonly) */}
                    <div className="mb-4">
                        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
                            Ubicación Actual (Origen)
                        </label>
                        <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-700 text-sm">
                            {activo.ubicacion_actual?.nombre_ubicacion ?? 'Sin ubicación'}
                        </div>
                    </div>

                    {/* Destino */}
                    <div className="mb-4">
                        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
                            Ubicación Destino *
                        </label>
                        <select
                            value={form.data.ubicacion_destino_id}
                            onChange={e => form.setData('ubicacion_destino_id', e.target.value)}
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white text-sm"
                            style={{ color: '#374151' }}
                        >
                            <option value="">— Seleccionar destino —</option>
                            {ubicaciones
                                .filter(u => u.id !== activo.ubicacion_actual_id)
                                .map(u => (
                                    <option key={u.id} value={u.id}>{u.nombre_ubicacion}</option>
                                ))
                            }
                        </select>
                        {form.errors.ubicacion_destino_id && (
                            <p className="text-red-500 text-xs mt-1">{form.errors.ubicacion_destino_id}</p>
                        )}
                    </div>

                    {/* Tipo movimiento */}
                    <div className="mb-4">
                        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
                            Tipo de Movimiento
                        </label>
                        <select
                            value={form.data.tipo_movimiento}
                            onChange={e => form.setData('tipo_movimiento', e.target.value)}
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white text-sm"
                            style={{ color: '#374151' }}
                        >
                            <option value="TRASLADO">Traslado</option>
                            <option value="ASIGNACION">Asignación</option>
                            <option value="DEVOLUCION">Devolución</option>
                            <option value="MANTENIMIENTO">Mantenimiento</option>
                        </select>
                    </div>

                    {/* Comentarios */}
                    <div className="mb-2">
                        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
                            Comentarios (opcional)
                        </label>
                        <textarea
                            value={form.data.comentarios}
                            onChange={e => form.setData('comentarios', e.target.value)}
                            placeholder="Ej: Traslado por mantenimiento preventivo"
                            rows={3}
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-700 resize-none"
                        />
                    </div>
                </div>

                {/* ── Botones ──────────────────────────────────────────── */}
                <div className="mx-4 mt-4 mb-24 flex gap-3">
                    <button
                        onClick={goBack}
                        className="flex-1 border border-gray-300 rounded-xl py-3 text-gray-600 font-medium text-sm"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={!form.data.ubicacion_destino_id || form.processing}
                        className="flex-1 bg-blue-700 text-white rounded-xl py-3 font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {form.processing ? 'Procesando...' : 'Confirmar Traslado'}
                    </button>
                </div>
            </div>

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

Movilizar.layout = null;
