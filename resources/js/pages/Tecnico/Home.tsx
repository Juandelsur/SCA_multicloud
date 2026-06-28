import { Head, Link, router } from '@inertiajs/react';
import {
    ArrowLeftRight,
    Clock,
    History,
    Home,
    LogOut,
    Pencil,
    Plus,
    Printer,
    QrCode,
} from 'lucide-react';
import { logout } from '@/routes';
import { create as activosCreate, index as activosIndex } from '@/routes/activos';
import { index as historialIndex } from '@/routes/historial';
import { imprimir as tecnicoImprimir, scan as tecnicoScan } from '@/routes/tecnico';

// -------------------------------------------------------
// Tipos
// -------------------------------------------------------
interface Activo {
    codigo_inventario: string;
    marca: string;
    modelo: string;
}

interface UbicacionDestino {
    nombre_ubicacion: string;
}

interface UsuarioRegistra {
    name: string;
}

interface Movimiento {
    id: number;
    activo: Activo;
    ubicacion_destino: UbicacionDestino;
    usuario_registra: UsuarioRegistra;
    created_at: string;
    tipo_movimiento: string;
}

interface Props {
    auth: { user: { name: string } };
    ultimosMovimientos: Movimiento[];
}

// -------------------------------------------------------
// Helper: fecha legible en español
// -------------------------------------------------------
function fechaRelativa(iso: string): string {
    const d = new Date(iso);

    return d.toLocaleDateString('es-CL', { day: 'numeric', month: 'short' });
}

// -------------------------------------------------------
// Sub-componentes
// -------------------------------------------------------
interface ActionCardProps {
    color: string;
    icon: React.ReactNode;
    title: string;
    subtitle: string;
    onClick: () => void;
}

function ActionCard({ color, icon, title, subtitle, onClick }: ActionCardProps) {
    return (
        <button
            onClick={onClick}
            className="flex flex-col items-center rounded-xl border border-gray-100 bg-white p-4 text-center shadow-sm active:scale-95 transition-transform cursor-pointer w-full"
        >
            <div
                className={`mb-3 flex h-14 w-14 items-center justify-center rounded-full ${color}`}
            >
                {icon}
            </div>
            <span className="text-sm font-bold text-gray-800">{title}</span>
            <span className="mt-0.5 text-xs text-gray-400">{subtitle}</span>
        </button>
    );
}

// -------------------------------------------------------
// Página principal
// -------------------------------------------------------
export default function TecnicoHome({ auth, ultimosMovimientos }: Props) {
    const fecha = new Date().toLocaleDateString('es-CL', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className="min-h-screen bg-gray-50">
            <Head title="Inicio — Técnico TI" />

            {/* ── NAVBAR ─────────────────────────────────── */}
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

            {/* ── CONTENIDO (debajo del navbar fijo) ──────── */}
            <div className="pt-14 pb-24">

                {/* Banner bienvenida */}
                <div className="bg-blue-50 px-4 py-6">
                    <p className="text-xl font-semibold text-blue-700">
                        Hola, Técnico TI {auth.user.name}
                    </p>
                    <p className="mt-0.5 text-sm capitalize text-blue-500">{fecha}</p>
                </div>

                {/* Grid de acciones */}
                <div className="grid grid-cols-3 gap-3 p-4">
                    <ActionCard
                        color="bg-green-500"
                        icon={<QrCode size={28} className="text-white" />}
                        title="Escanear QR"
                        subtitle="Registrar movimientos"
                        onClick={() => router.visit(tecnicoScan().url)}
                    />
                    <ActionCard
                        color="bg-blue-500"
                        icon={<Plus size={28} className="text-white" />}
                        title="Crear Activo"
                        subtitle="Registrar nuevo equipo"
                        onClick={() => router.visit(activosCreate().url)}
                    />
                    <ActionCard
                        color="bg-orange-400"
                        icon={<Pencil size={28} className="text-white" />}
                        title="Editar Activo"
                        subtitle="Modificar información"
                        onClick={() => router.visit(activosIndex().url)}
                    />
                </div>

                {/* Últimos movimientos */}
                <div className="px-4">
                    <div className="mb-3 flex items-center justify-between">
                        <h2 className="font-bold text-gray-800">
                            Últimos Movimientos del Equipo
                        </h2>
                        <button
                            onClick={() => router.visit(historialIndex().url)}
                            className="flex items-center gap-1 rounded-full border border-gray-300 px-3 py-1 text-xs text-blue-600"
                        >
                            <Clock size={12} />
                            VER HISTORIAL
                        </button>
                    </div>

                    {ultimosMovimientos.length === 0 ? (
                        <p className="py-8 text-center text-sm text-gray-400">
                            Sin movimientos registrados aún.
                        </p>
                    ) : (
                        <ul>
                            {ultimosMovimientos.map((mov) => (
                                <li
                                    key={mov.id}
                                    className="flex items-start gap-3 border-b border-gray-100 py-3"
                                >
                                    {/* Ícono izquierdo */}
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-500">
                                        <ArrowLeftRight size={18} className="text-white" />
                                    </div>

                                    {/* Texto */}
                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-semibold text-gray-800">
                                            {mov.activo.marca} {mov.activo.modelo}
                                        </p>
                                        <p className="mt-0.5 text-xs text-gray-400">
                                            Trasladado a{' '}
                                            <span className="font-medium">
                                                {mov.ubicacion_destino.nombre_ubicacion}
                                            </span>{' '}
                                            por {mov.usuario_registra.name} &bull;{' '}
                                            {fechaRelativa(mov.created_at)}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            {/* ── BOTTOM NAV ──────────────────────────────── */}
            <nav className="fixed inset-x-0 bottom-0 z-50 flex border-t border-gray-200 bg-white">
                <button className="flex flex-1 flex-col items-center justify-center py-3 text-xs text-blue-600">
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

// Página standalone: deshabilita el layout global de app.tsx.
// En Inertia v3 esto es informativo — el control real está en el
// case 'Tecnico/' de la función layout en app.tsx.
TecnicoHome.layout = null;
