import { Head, Link, router, useForm } from '@inertiajs/react';
import {
    AlertTriangle,
    ArrowLeft,
    ChevronLeft,
    ChevronRight,
    ClipboardList,
    Eye,
    FileText,
    Hash,
    Home,
    Image as ImageIcon,
    Info,
    Laptop,
    Loader2,
    LogOut,
    MapPin,
    Package,
    Pencil,
    Plus,
    ScanBarcode,
    Search,
    Settings,
    Share2,
    Smartphone,
    Tag,
    Tags,
    Trash2,
    X,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { dashboard, logout } from '@/routes';
import { destroy as activosDestroy, store as activosStore, update as activosUpdate } from '@/routes/activos';
import { gestion as dashboardGestion, otros as dashboardOtros } from '@/routes/dashboard';
import { activos as gestionActivos } from '@/routes/gestion';

const FOTO_MAX_BYTES = 5 * 1024 * 1024;

// ─── Tipos ───────────────────────────────────────────────────────────────────

interface Activo {
    id: number;
    codigo_inventario: string;
    marca: string;
    modelo: string;
    numero_serie: string | null;
    notas: string | null;
    foto_url: string | null;
    tipo_id: number;
    estado_id: number;
    ubicacion_actual_id: number;
    tipo: { nombre_tipo: string } | null;
    estado: { nombre_estado: string } | null;
    ubicacion_actual: {
        nombre_ubicacion: string;
        departamento: { nombre_departamento: string } | null;
    } | null;
}

interface ActivosPaginados {
    data: Activo[];
    current_page: number;
    last_page: number;
    total: number;
}

interface Filtros {
    search?: string;
    marca?: string;
    tipo_id?: string;
    estado_id?: string;
    ubicacion_id?: string;
}

interface Props {
    activos: ActivosPaginados | null;
    marcas: string[];
    tipos: Array<{ id: number; nombre_tipo: string }>;
    estados: Array<{ id: number; nombre_estado: string }>;
    ubicaciones: Array<{ id: number; label: string }>;
    filtros: Filtros;
}

export default function GestionActivosIndex({ activos, marcas, tipos, estados, ubicaciones, filtros }: Props) {
    const [search, setSearch]             = useState(filtros.search ?? '');
    const [filtroMarca, setFiltroMarca]   = useState(filtros.marca ?? '');
    const [filtroTipo, setFiltroTipo]     = useState(filtros.tipo_id ?? '');
    const [filtroEstado, setFiltroEstado] = useState(filtros.estado_id ?? '');
    const [filtroUbic, setFiltroUbic]     = useState(filtros.ubicacion_id ?? '');
    const [isLoading, setIsLoading]       = useState(false);
    const [activoVer, setActivoVer]       = useState<Activo | null>(null);
    const [activoEliminar, setActivoEliminar] = useState<Activo | null>(null);
    const [deleteError, setDeleteError]   = useState<string | null>(null);
    const [isDeleting, setIsDeleting]     = useState(false);

    const [showCrear, setShowCrear]       = useState(false);
    const [fotoPreview, setFotoPreview]   = useState<string | null>(null);
    const [fotoError, setFotoError]       = useState<string | null>(null);
    const fotoInputRef = useRef<HTMLInputElement>(null);

    const crearForm = useForm({
        tipo_id: '',
        marca: '',
        modelo: '',
        numero_serie: '',
        estado_id: '',
        ubicacion_actual_id: '',
        notas: '',
        foto: null as File | null,
    });

    // Revoca el object URL del preview al reemplazarlo o desmontar, para no filtrar memoria.
    useEffect(() => {
        return () => {
            if (fotoPreview) {
                URL.revokeObjectURL(fotoPreview);
            }
        };
    }, [fotoPreview]);

    function abrirCrear() {
        crearForm.reset();
        crearForm.clearErrors();
        setFotoPreview(null);
        setFotoError(null);
        setShowCrear(true);
    }

    function cerrarCrear() {
        setShowCrear(false);
    }

    function handleFotoChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0] ?? null;
        setFotoError(null);

        if (!file) {
            crearForm.setData('foto', null);
            setFotoPreview(null);

            return;
        }

        if (file.size > FOTO_MAX_BYTES) {
            setFotoError('La imagen no puede superar los 5MB.');
            e.target.value = '';
            crearForm.setData('foto', null);
            setFotoPreview(null);

            return;
        }

        crearForm.setData('foto', file);
        setFotoPreview(URL.createObjectURL(file));
    }

    function quitarFoto() {
        crearForm.setData('foto', null);
        setFotoPreview(null);
        setFotoError(null);

        if (fotoInputRef.current) {
            fotoInputRef.current.value = '';
        }
    }

    function handleSubmitCrear(e: React.FormEvent) {
        e.preventDefault();

        if (fotoError) {
            return;
        }

        crearForm.post(activosStore().url, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setShowCrear(false);
                crearForm.reset();
                setFotoPreview(null);
                router.reload({ only: ['activos'] });
            },
        });
    }

    // ── Editar activo ──────────────────────────────────────────────────────
    const [activoEditar, setActivoEditar]     = useState<Activo | null>(null);
    const [fotoPreviewEdit, setFotoPreviewEdit] = useState<string | null>(null);
    const [fotoErrorEdit, setFotoErrorEdit]   = useState<string | null>(null);
    const fotoInputEditRef = useRef<HTMLInputElement>(null);

    const editForm = useForm({
        _method: 'put',
        tipo_id: '',
        marca: '',
        modelo: '',
        numero_serie: '',
        estado_id: '',
        ubicacion_actual_id: '',
        notas: '',
        foto: null as File | null,
        eliminar_foto: false,
    });

    useEffect(() => {
        return () => {
            if (fotoPreviewEdit) {
                URL.revokeObjectURL(fotoPreviewEdit);
            }
        };
    }, [fotoPreviewEdit]);

    function abrirEditar(a: Activo) {
        editForm.clearErrors();
        editForm.setData({
            _method: 'put',
            tipo_id: String(a.tipo_id),
            marca: a.marca,
            modelo: a.modelo,
            numero_serie: a.numero_serie ?? '',
            estado_id: String(a.estado_id),
            ubicacion_actual_id: String(a.ubicacion_actual_id),
            notas: a.notas ?? '',
            foto: null,
            eliminar_foto: false,
        });
        setFotoPreviewEdit(null);
        setFotoErrorEdit(null);
        setActivoEditar(a);
    }

    function cerrarEditar() {
        setActivoEditar(null);
    }

    function handleFotoChangeEdit(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0] ?? null;
        setFotoErrorEdit(null);

        if (!file) {
            editForm.setData('foto', null);
            setFotoPreviewEdit(null);

            return;
        }

        if (file.size > FOTO_MAX_BYTES) {
            setFotoErrorEdit('La imagen no puede superar los 5MB.');
            e.target.value = '';
            editForm.setData('foto', null);
            setFotoPreviewEdit(null);

            return;
        }

        editForm.setData('foto', file);
        editForm.setData('eliminar_foto', false); // mutuamente excluyente con "eliminar foto actual"
        setFotoPreviewEdit(URL.createObjectURL(file));
    }

    function cancelarNuevaFoto() {
        editForm.setData('foto', null);
        setFotoPreviewEdit(null);
        setFotoErrorEdit(null);

        if (fotoInputEditRef.current) {
            fotoInputEditRef.current.value = '';
        }
    }

    function marcarEliminarFotoActual() {
        editForm.setData('eliminar_foto', true);
        editForm.setData('foto', null);
        setFotoPreviewEdit(null);
        setFotoErrorEdit(null);

        if (fotoInputEditRef.current) {
            fotoInputEditRef.current.value = '';
        }
    }

    function deshacerEliminarFotoActual() {
        editForm.setData('eliminar_foto', false);
    }

    function handleSubmitEditar(e: React.FormEvent) {
        e.preventDefault();

        if (!activoEditar || fotoErrorEdit) {
            return;
        }

        editForm.post(activosUpdate(activoEditar.id).url, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setActivoEditar(null);
                editForm.reset();
                setFotoPreviewEdit(null);
                router.reload({ only: ['activos'] });
            },
        });
    }

    useEffect(() => {
        if (!activoVer && !activoEliminar && !showCrear && !activoEditar) {
            return;
        }

        function onKeyDown(e: KeyboardEvent) {
            if (e.key === 'Escape') {
                setActivoVer(null);
                cerrarModalEliminar();
                cerrarCrear();
                cerrarEditar();
            }
        }

        document.addEventListener('keydown', onKeyDown);

        return () => document.removeEventListener('keydown', onKeyDown);
    }, [activoVer, activoEliminar, showCrear, activoEditar]);

    function cerrarModalEliminar() {
        setActivoEliminar(null);
        setDeleteError(null);
    }

    function confirmarEliminar() {
        if (!activoEliminar) {
            return;
        }

        setIsDeleting(true);
        setDeleteError(null);

        router.delete(activosDestroy(activoEliminar.id).url, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (page) => {
                const error = (page.props.flash as { error?: string | null } | undefined)?.error;

                if (error) {
                    setDeleteError(error);

                    return;
                }

                setActivoEliminar(null);
                router.reload({ only: ['activos'] });
            },
            onError: () => setDeleteError('Ocurrió un error al eliminar el activo. Intenta nuevamente.'),
            onFinish: () => setIsDeleting(false),
        });
    }

    // Acepta overrides explícitos para evitar leer estado desactualizado
    // (setFiltroX + buscar en el mismo evento vería el valor viejo si se leyera de state).
    function buscarCon(overrides: Partial<{
        search: string; marca: string; tipo_id: string; estado_id: string; ubicacion_id: string; page: number;
    }>) {
        const s  = overrides.search       ?? search;
        const m  = overrides.marca        ?? filtroMarca;
        const t  = overrides.tipo_id      ?? filtroTipo;
        const es = overrides.estado_id    ?? filtroEstado;
        const u  = overrides.ubicacion_id ?? filtroUbic;
        const page = overrides.page ?? 1;

        setIsLoading(true);
        router.get(
            gestionActivos().url,
            {
                ...(s.trim() ? { search: s.trim() } : {}),
                ...(m        ? { marca: m } : {}),
                ...(t        ? { tipo_id: t } : {}),
                ...(es       ? { estado_id: es } : {}),
                ...(u        ? { ubicacion_id: u } : {}),
                ...(page > 1 ? { page } : {}),
            },
            {
                preserveState: true,
                preserveScroll: true,
                only: ['activos', 'filtros'],
                onFinish: () => setIsLoading(false),
            }
        );
    }

    // Los selects y el input de texto SOLO actualizan estado local. La búsqueda
    // se dispara únicamente con el botón Buscar o Enter en el campo de texto.
    function handleSelectChange(setter: (v: string) => void) {
        return (e: React.ChangeEvent<HTMLSelectElement>) => setter(e.target.value);
    }

    function handleSearchKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            buscarCon({ page: 1 });
        }
    }

    const mostrando = activos ? activos.data.length : 0;
    const total      = activos ? activos.total : 0;

    return (
        <div className="min-h-screen bg-gray-50">
            <Head title="Gestión Activos — SCA-IT" />

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
                <div className="flex items-center justify-between bg-blue-50 px-4 py-5">
                    <p className="text-xl font-bold text-blue-700">Gestión Activos</p>
                    <button
                        onClick={abrirCrear}
                        className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                    >
                        <Plus size={16} />
                        NUEVO
                    </button>
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
                            placeholder="Buscar por código, número de serie o modelo"
                            className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-9 pr-3 text-sm text-gray-700"
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                        <select
                            value={filtroMarca}
                            onChange={handleSelectChange(setFiltroMarca)}
                            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700"
                        >
                            <option value="">Filtrar por Marca</option>
                            {marcas.map(m => (
                                <option key={m} value={m}>{m}</option>
                            ))}
                        </select>

                        <select
                            value={filtroTipo}
                            onChange={handleSelectChange(setFiltroTipo)}
                            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700"
                        >
                            <option value="">Filtrar por Tipo de Equipo</option>
                            {tipos.map(t => (
                                <option key={t.id} value={t.id}>{t.nombre_tipo}</option>
                            ))}
                        </select>

                        <select
                            value={filtroEstado}
                            onChange={handleSelectChange(setFiltroEstado)}
                            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700"
                        >
                            <option value="">Filtrar por Estado Activo</option>
                            {estados.map(es => (
                                <option key={es.id} value={es.id}>{es.nombre_estado}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row">
                        <select
                            value={filtroUbic}
                            onChange={handleSelectChange(setFiltroUbic)}
                            className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700"
                        >
                            <option value="">Filtrar por Ubicación</option>
                            {ubicaciones.map(u => (
                                <option key={u.id} value={u.id}>{u.label}</option>
                            ))}
                        </select>

                        <button
                            onClick={() => buscarCon({ page: 1 })}
                            className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                        >
                            <Search size={16} />
                            Buscar
                        </button>
                    </div>
                </div>

                {/* Resultado */}
                <div className="px-4">
                    <p className="mb-3 text-sm text-gray-500">
                        Mostrando {mostrando} de {total} activos
                    </p>

                    {isLoading ? (
                        <div className="flex flex-col items-center py-16 text-blue-600">
                            <Loader2 size={32} className="mb-3 animate-spin" />
                            <p className="text-sm">Cargando activos...</p>
                        </div>
                    ) : !activos ? (
                        <div className="rounded-xl border border-dashed border-gray-200 py-16 text-center text-sm text-gray-400">
                            Usa la búsqueda o los filtros para ver activos.
                        </div>
                    ) : activos.data.length === 0 ? (
                        <div className="rounded-xl border border-dashed border-gray-200 py-16 text-center text-sm text-gray-400">
                            Sin activos que coincidan con la búsqueda.
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {activos.data.map(a => (
                                <div
                                    key={a.id}
                                    className="flex items-center justify-between rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
                                >
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate font-bold text-gray-800">{a.marca} {a.modelo}</p>
                                        <div className="mt-1 flex flex-wrap items-center gap-2">
                                            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                                                {a.codigo_inventario}
                                            </span>
                                            {a.ubicacion_actual && (
                                                <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-700">
                                                    {a.ubicacion_actual.nombre_ubicacion}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="ml-3 flex shrink-0 gap-2">
                                        <button
                                            onClick={() => setActivoVer(a)}
                                            className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-500 text-white hover:bg-gray-600"
                                            aria-label="Ver"
                                        >
                                            <Eye size={16} />
                                        </button>
                                        <button
                                            onClick={() => abrirEditar(a)}
                                            className="flex h-9 w-9 items-center justify-center rounded-full bg-yellow-500 text-white hover:bg-yellow-600"
                                            aria-label="Editar"
                                        >
                                            <Pencil size={16} />
                                        </button>
                                        <button
                                            onClick={() => setActivoEliminar(a)}
                                            className="flex h-9 w-9 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600"
                                            aria-label="Eliminar"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Paginación */}
                    {activos && activos.last_page > 1 && (
                        <div className="mt-4 flex items-center justify-between">
                            <button
                                onClick={() => buscarCon({ page: activos.current_page - 1 })}
                                disabled={activos.current_page === 1}
                                className="flex items-center gap-1 rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-600 disabled:opacity-30"
                            >
                                <ChevronLeft size={16} />
                                Anterior
                            </button>
                            <span className="text-xs text-gray-500">
                                Página {activos.current_page} de {activos.last_page}
                            </span>
                            <button
                                onClick={() => buscarCon({ page: activos.current_page + 1 })}
                                disabled={activos.current_page === activos.last_page}
                                className="flex items-center gap-1 rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-600 disabled:opacity-30"
                            >
                                Siguiente
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    )}
                </div>

                {/* Volver */}
                <div className="p-4">
                    <Link
                        href={dashboardGestion().url}
                        className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-gray-300 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50"
                    >
                        <ArrowLeft size={16} />
                        VOLVER
                    </Link>
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
                    className="flex flex-1 flex-col items-center justify-center py-3 text-xs text-blue-600"
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

            {/* ── Modal "Ver activo" ───────────────────────────────────── */}
            {activoVer && (
                <div
                    className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4"
                    onClick={() => setActivoVer(null)}
                >
                    <div
                        className="w-full max-w-md overflow-hidden rounded-xl bg-white shadow-xl"
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex items-center gap-3 bg-slate-100 px-5 py-4">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white">
                                <Info size={18} className="text-slate-500" />
                            </div>
                            <span className="font-bold text-gray-800">Detalles del Activo</span>
                        </div>

                        {/* Cuerpo */}
                        <div className="max-h-[70vh] overflow-y-auto px-5 py-2">
                            <DatoFila icon={<ScanBarcode size={16} />} label="Código de Inventario">
                                {activoVer.codigo_inventario}
                            </DatoFila>
                            <DatoFila icon={<Smartphone size={16} />} label="Tipo de Equipo">
                                {activoVer.tipo?.nombre_tipo ?? '—'}
                            </DatoFila>
                            <DatoFila icon={<Tag size={16} />} label="Marca">
                                {activoVer.marca}
                            </DatoFila>
                            <DatoFila icon={<Tags size={16} />} label="Modelo">
                                {activoVer.modelo}
                            </DatoFila>
                            <DatoFila icon={<Hash size={16} />} label="Número de Serie">
                                {activoVer.numero_serie ?? '—'}
                            </DatoFila>
                            <DatoFila icon={<Share2 size={16} />} label="Estado">
                                {activoVer.estado?.nombre_estado ?? '—'}
                            </DatoFila>
                            <DatoFila icon={<MapPin size={16} />} label="Ubicación Actual">
                                {activoVer.ubicacion_actual
                                    ? `${activoVer.ubicacion_actual.departamento?.nombre_departamento ?? 'Sin depto.'} - ${activoVer.ubicacion_actual.nombre_ubicacion}`
                                    : '—'}
                            </DatoFila>
                            <DatoFila icon={<FileText size={16} />} label="Notas">
                                {activoVer.notas || 'Sin notas'}
                            </DatoFila>
                            <DatoFila icon={<Package size={16} />} label="Fotografía" isLast>
                                {activoVer.foto_url ? (
                                    <img
                                        src={activoVer.foto_url}
                                        alt={`${activoVer.marca} ${activoVer.modelo}`}
                                        className="mt-1 h-32 w-32 rounded-lg object-cover"
                                    />
                                ) : (
                                    <div className="mt-1 flex h-24 w-full flex-col items-center justify-center gap-1.5 rounded-lg bg-gray-50 text-gray-300">
                                        <Package size={28} />
                                        <span className="text-xs">Sin fotografía</span>
                                    </div>
                                )}
                            </DatoFila>
                        </div>

                        {/* Footer */}
                        <div className="flex justify-end border-t border-gray-100 px-5 py-3">
                            <button
                                onClick={() => setActivoVer(null)}
                                className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                            >
                                CERRAR
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Modal "Eliminar activo" ───────────────────────────────── */}
            {activoEliminar && (
                <div
                    className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4"
                    onClick={cerrarModalEliminar}
                >
                    <div
                        className="w-full max-w-sm rounded-xl bg-white p-5 shadow-xl"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="flex flex-col items-center text-center">
                            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                                <AlertTriangle size={22} className="text-red-600" />
                            </div>
                            <p className="font-bold text-gray-800">Confirmar Eliminación</p>
                            <p className="mt-1 text-sm text-gray-500">
                                ¿Estás seguro de que deseas eliminar este activo?
                            </p>

                            <p className="mt-3 font-bold text-gray-800">
                                {activoEliminar.marca} {activoEliminar.modelo}
                            </p>
                            <p className="text-xs text-gray-400">{activoEliminar.codigo_inventario}</p>

                            {deleteError && (
                                <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600">
                                    {deleteError}
                                </p>
                            )}
                        </div>

                        <div className="mt-5 flex justify-end gap-3">
                            <button
                                onClick={cerrarModalEliminar}
                                disabled={isDeleting}
                                className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                            >
                                CANCELAR
                            </button>
                            <button
                                onClick={confirmarEliminar}
                                disabled={isDeleting}
                                className="flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50"
                            >
                                {isDeleting && <Loader2 size={14} className="animate-spin" />}
                                ELIMINAR
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Modal "Nuevo Activo" ─────────────────────────────────── */}
            {showCrear && (
                <div
                    className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4"
                    onClick={cerrarCrear}
                >
                    <div
                        className="w-full max-w-md overflow-hidden rounded-xl bg-white shadow-xl"
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex items-center gap-3 bg-blue-600 px-5 py-4">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/20">
                                <Laptop size={18} className="text-white" />
                            </div>
                            <span className="font-bold text-white">Nuevo Activo</span>
                        </div>

                        <form onSubmit={handleSubmitCrear}>
                            <div className="max-h-[70vh] overflow-y-auto px-5 py-4 space-y-4">
                                {/* Banner informativo */}
                                <div className="rounded-lg bg-blue-50 px-3 py-2 text-xs text-blue-700">
                                    El código de inventario se generará automáticamente.
                                </div>

                                {/* Tipo de Equipo */}
                                <div>
                                    <label className="mb-1 block text-xs font-semibold text-gray-600">
                                        Tipo de Equipo *
                                    </label>
                                    <select
                                        value={crearForm.data.tipo_id}
                                        onChange={e => crearForm.setData('tipo_id', e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700"
                                    >
                                        <option value="">Selecciona un tipo</option>
                                        {tipos.map(t => (
                                            <option key={t.id} value={t.id}>{t.nombre_tipo}</option>
                                        ))}
                                    </select>
                                    {crearForm.errors.tipo_id && (
                                        <p className="mt-1 text-xs text-red-600">{crearForm.errors.tipo_id}</p>
                                    )}
                                </div>

                                {/* Marca / Modelo */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="mb-1 block text-xs font-semibold text-gray-600">
                                            Marca *
                                        </label>
                                        <input
                                            type="text"
                                            value={crearForm.data.marca}
                                            onChange={e => crearForm.setData('marca', e.target.value)}
                                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700"
                                        />
                                        {crearForm.errors.marca && (
                                            <p className="mt-1 text-xs text-red-600">{crearForm.errors.marca}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="mb-1 block text-xs font-semibold text-gray-600">
                                            Modelo *
                                        </label>
                                        <input
                                            type="text"
                                            value={crearForm.data.modelo}
                                            onChange={e => crearForm.setData('modelo', e.target.value)}
                                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700"
                                        />
                                        {crearForm.errors.modelo && (
                                            <p className="mt-1 text-xs text-red-600">{crearForm.errors.modelo}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Número de Serie */}
                                <div>
                                    <label className="mb-1 block text-xs font-semibold text-gray-600">
                                        Número de Serie
                                    </label>
                                    <div className="relative">
                                        <Hash size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                        <input
                                            type="text"
                                            value={crearForm.data.numero_serie}
                                            onChange={e => crearForm.setData('numero_serie', e.target.value)}
                                            className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-8 pr-3 text-sm text-gray-700"
                                        />
                                    </div>
                                    {crearForm.errors.numero_serie && (
                                        <p className="mt-1 text-xs text-red-600">{crearForm.errors.numero_serie}</p>
                                    )}
                                </div>

                                {/* Estado */}
                                <div>
                                    <label className="mb-1 block text-xs font-semibold text-gray-600">
                                        Estado *
                                    </label>
                                    <select
                                        value={crearForm.data.estado_id}
                                        onChange={e => crearForm.setData('estado_id', e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700"
                                    >
                                        <option value="">Selecciona un estado</option>
                                        {estados.map(es => (
                                            <option key={es.id} value={es.id}>{es.nombre_estado}</option>
                                        ))}
                                    </select>
                                    {crearForm.errors.estado_id && (
                                        <p className="mt-1 text-xs text-red-600">{crearForm.errors.estado_id}</p>
                                    )}
                                </div>

                                {/* Ubicación Actual */}
                                <div>
                                    <label className="mb-1 block text-xs font-semibold text-gray-600">
                                        Ubicación Actual *
                                    </label>
                                    <select
                                        value={crearForm.data.ubicacion_actual_id}
                                        onChange={e => crearForm.setData('ubicacion_actual_id', e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700"
                                    >
                                        <option value="">Selecciona una ubicación</option>
                                        {ubicaciones.map(u => (
                                            <option key={u.id} value={u.id}>{u.label}</option>
                                        ))}
                                    </select>
                                    {crearForm.errors.ubicacion_actual_id && (
                                        <p className="mt-1 text-xs text-red-600">{crearForm.errors.ubicacion_actual_id}</p>
                                    )}
                                </div>

                                {/* Notas */}
                                <div>
                                    <label className="mb-1 block text-xs font-semibold text-gray-600">
                                        Notas
                                    </label>
                                    <textarea
                                        value={crearForm.data.notas}
                                        onChange={e => crearForm.setData('notas', e.target.value)}
                                        rows={3}
                                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700"
                                    />
                                    {crearForm.errors.notas && (
                                        <p className="mt-1 text-xs text-red-600">{crearForm.errors.notas}</p>
                                    )}
                                </div>

                                {/* Fotografía */}
                                <div>
                                    <label className="mb-1 block text-xs font-semibold text-gray-600">
                                        Fotografía
                                    </label>

                                    <div className="flex items-center gap-3">
                                        {fotoPreview ? (
                                            <div className="relative">
                                                <img
                                                    src={fotoPreview}
                                                    alt="Vista previa"
                                                    className="h-20 w-20 rounded-lg object-cover"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={quitarFoto}
                                                    aria-label="Quitar fotografía"
                                                    className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white"
                                                >
                                                    <X size={12} />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-gray-50 text-gray-300">
                                                <ImageIcon size={28} />
                                            </div>
                                        )}

                                        <input
                                            ref={fotoInputRef}
                                            type="file"
                                            accept="image/jpeg,image/png,image/webp"
                                            onChange={handleFotoChange}
                                            className="flex-1 text-xs text-gray-500"
                                        />
                                    </div>

                                    {(fotoError || crearForm.errors.foto) && (
                                        <p className="mt-1 text-xs text-red-600">
                                            {fotoError ?? crearForm.errors.foto}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="flex justify-end gap-3 border-t border-gray-100 px-5 py-3">
                                <button
                                    type="button"
                                    onClick={cerrarCrear}
                                    disabled={crearForm.processing}
                                    className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                                >
                                    CANCELAR
                                </button>
                                <button
                                    type="submit"
                                    disabled={crearForm.processing || !!fotoError}
                                    className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                                >
                                    {crearForm.processing && <Loader2 size={14} className="animate-spin" />}
                                    CREAR
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ── Modal "Editar Activo" ────────────────────────────────── */}
            {activoEditar && (
                <div
                    className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4"
                    onClick={cerrarEditar}
                >
                    <div
                        className="w-full max-w-md overflow-hidden rounded-xl bg-white shadow-xl"
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex items-center gap-3 bg-blue-600 px-5 py-4">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/20">
                                <Laptop size={18} className="text-white" />
                            </div>
                            <span className="font-bold text-white">Editar Activo</span>
                        </div>

                        <form onSubmit={handleSubmitEditar}>
                            <div className="max-h-[70vh] overflow-y-auto px-5 py-4 space-y-4">
                                {/* Código de Inventario (readonly) */}
                                <div>
                                    <label className="mb-1 block text-xs font-semibold text-gray-600">
                                        Código de Inventario
                                    </label>
                                    <input
                                        type="text"
                                        value={activoEditar.codigo_inventario}
                                        disabled
                                        readOnly
                                        className="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-100 px-3 py-2 text-sm text-gray-500"
                                    />
                                    <p className="mt-1 text-[11px] text-gray-400">Generado automáticamente</p>
                                </div>

                                {/* Tipo de Equipo */}
                                <div>
                                    <label className="mb-1 block text-xs font-semibold text-gray-600">
                                        Tipo de Equipo *
                                    </label>
                                    <select
                                        value={editForm.data.tipo_id}
                                        onChange={e => editForm.setData('tipo_id', e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700"
                                    >
                                        <option value="">Selecciona un tipo</option>
                                        {tipos.map(t => (
                                            <option key={t.id} value={t.id}>{t.nombre_tipo}</option>
                                        ))}
                                    </select>
                                    {editForm.errors.tipo_id && (
                                        <p className="mt-1 text-xs text-red-600">{editForm.errors.tipo_id}</p>
                                    )}
                                </div>

                                {/* Marca / Modelo */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="mb-1 block text-xs font-semibold text-gray-600">
                                            Marca *
                                        </label>
                                        <input
                                            type="text"
                                            value={editForm.data.marca}
                                            onChange={e => editForm.setData('marca', e.target.value)}
                                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700"
                                        />
                                        {editForm.errors.marca && (
                                            <p className="mt-1 text-xs text-red-600">{editForm.errors.marca}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="mb-1 block text-xs font-semibold text-gray-600">
                                            Modelo *
                                        </label>
                                        <input
                                            type="text"
                                            value={editForm.data.modelo}
                                            onChange={e => editForm.setData('modelo', e.target.value)}
                                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700"
                                        />
                                        {editForm.errors.modelo && (
                                            <p className="mt-1 text-xs text-red-600">{editForm.errors.modelo}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Número de Serie */}
                                <div>
                                    <label className="mb-1 block text-xs font-semibold text-gray-600">
                                        Número de Serie
                                    </label>
                                    <div className="relative">
                                        <Hash size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                        <input
                                            type="text"
                                            value={editForm.data.numero_serie}
                                            onChange={e => editForm.setData('numero_serie', e.target.value)}
                                            className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-8 pr-3 text-sm text-gray-700"
                                        />
                                    </div>
                                    {editForm.errors.numero_serie && (
                                        <p className="mt-1 text-xs text-red-600">{editForm.errors.numero_serie}</p>
                                    )}
                                </div>

                                {/* Estado */}
                                <div>
                                    <label className="mb-1 block text-xs font-semibold text-gray-600">
                                        Estado *
                                    </label>
                                    <select
                                        value={editForm.data.estado_id}
                                        onChange={e => editForm.setData('estado_id', e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700"
                                    >
                                        <option value="">Selecciona un estado</option>
                                        {estados.map(es => (
                                            <option key={es.id} value={es.id}>{es.nombre_estado}</option>
                                        ))}
                                    </select>
                                    {editForm.errors.estado_id && (
                                        <p className="mt-1 text-xs text-red-600">{editForm.errors.estado_id}</p>
                                    )}
                                </div>

                                {/* Ubicación Actual */}
                                <div>
                                    <label className="mb-1 block text-xs font-semibold text-gray-600">
                                        Ubicación Actual *
                                    </label>
                                    <select
                                        value={editForm.data.ubicacion_actual_id}
                                        onChange={e => editForm.setData('ubicacion_actual_id', e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700"
                                    >
                                        <option value="">Selecciona una ubicación</option>
                                        {ubicaciones.map(u => (
                                            <option key={u.id} value={u.id}>{u.label}</option>
                                        ))}
                                    </select>
                                    {editForm.errors.ubicacion_actual_id && (
                                        <p className="mt-1 text-xs text-red-600">{editForm.errors.ubicacion_actual_id}</p>
                                    )}
                                </div>

                                {/* Notas */}
                                <div>
                                    <label className="mb-1 block text-xs font-semibold text-gray-600">
                                        Notas
                                    </label>
                                    <textarea
                                        value={editForm.data.notas}
                                        onChange={e => editForm.setData('notas', e.target.value)}
                                        rows={3}
                                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700"
                                    />
                                    {editForm.errors.notas && (
                                        <p className="mt-1 text-xs text-red-600">{editForm.errors.notas}</p>
                                    )}
                                </div>

                                {/* Fotografía */}
                                <div>
                                    <label className="mb-1 block text-xs font-semibold text-gray-600">
                                        Fotografía
                                    </label>

                                    <div className="flex items-center gap-3">
                                        {fotoPreviewEdit ? (
                                            <div className="relative">
                                                <img
                                                    src={fotoPreviewEdit}
                                                    alt="Vista previa"
                                                    className="h-20 w-20 rounded-lg object-cover"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={cancelarNuevaFoto}
                                                    aria-label="Cancelar nueva fotografía"
                                                    className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white"
                                                >
                                                    <X size={12} />
                                                </button>
                                            </div>
                                        ) : editForm.data.eliminar_foto ? (
                                            <div className="flex h-20 w-20 flex-col items-center justify-center gap-1 rounded-lg bg-red-50 p-1 text-center text-[10px] text-red-400">
                                                <ImageIcon size={20} />
                                                Se eliminará
                                            </div>
                                        ) : activoEditar.foto_url ? (
                                            <img
                                                src={activoEditar.foto_url}
                                                alt={`${activoEditar.marca} ${activoEditar.modelo}`}
                                                className="h-20 w-20 rounded-lg object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-gray-50 text-gray-300">
                                                <ImageIcon size={28} />
                                            </div>
                                        )}

                                        <div className="flex flex-1 flex-col items-start gap-1.5">
                                            <input
                                                ref={fotoInputEditRef}
                                                type="file"
                                                accept="image/jpeg,image/png,image/webp"
                                                onChange={handleFotoChangeEdit}
                                                className={
                                                    activoEditar.foto_url || fotoPreviewEdit
                                                        ? 'hidden'
                                                        : 'text-xs text-gray-500'
                                                }
                                            />

                                            {(activoEditar.foto_url || fotoPreviewEdit) && (
                                                <button
                                                    type="button"
                                                    onClick={() => fotoInputEditRef.current?.click()}
                                                    className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-50"
                                                >
                                                    Cambiar foto
                                                </button>
                                            )}

                                            {activoEditar.foto_url && !fotoPreviewEdit && !editForm.data.eliminar_foto && (
                                                <button
                                                    type="button"
                                                    onClick={marcarEliminarFotoActual}
                                                    className="text-xs text-red-600 hover:underline"
                                                >
                                                    Eliminar foto actual
                                                </button>
                                            )}

                                            {editForm.data.eliminar_foto && (
                                                <button
                                                    type="button"
                                                    onClick={deshacerEliminarFotoActual}
                                                    className="text-xs text-blue-600 hover:underline"
                                                >
                                                    Deshacer eliminación
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    {(fotoErrorEdit || editForm.errors.foto) && (
                                        <p className="mt-1 text-xs text-red-600">
                                            {fotoErrorEdit ?? editForm.errors.foto}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="flex justify-end gap-3 border-t border-gray-100 px-5 py-3">
                                <button
                                    type="button"
                                    onClick={cerrarEditar}
                                    disabled={editForm.processing}
                                    className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                                >
                                    CANCELAR
                                </button>
                                <button
                                    type="submit"
                                    disabled={editForm.processing || !!fotoErrorEdit}
                                    className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                                >
                                    {editForm.processing && <Loader2 size={14} className="animate-spin" />}
                                    ACTUALIZAR
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

function DatoFila({ icon, label, children, isLast }: {
    icon: React.ReactNode;
    label: string;
    children: React.ReactNode;
    isLast?: boolean;
}) {
    return (
        <div className={`flex gap-3 py-3 ${isLast ? '' : 'border-b border-gray-100'}`}>
            <div className="mt-0.5 shrink-0 text-gray-400">{icon}</div>
            <div className="min-w-0 flex-1">
                <p className="text-xs text-gray-400">{label}</p>
                <div className="text-sm text-gray-800">{children}</div>
            </div>
        </div>
    );
}

GestionActivosIndex.layout = null;
