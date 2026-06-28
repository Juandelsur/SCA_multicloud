import { Head, Link, router } from '@inertiajs/react';
import {
    AlignJustify,
    CheckSquare,
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    Filter,
    History,
    Home,
    Info,
    LogOut,
    MapPin,
    Printer,
    QrCode,
    Search,
    Trash2,
    X,
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useMemo, useState } from 'react';
import { logout } from '@/routes';
import { index as historialIndex } from '@/routes/historial';
import { home as tecnicoHome } from '@/routes/tecnico';

// ─── Tipos ───────────────────────────────────────────────────────────────────

interface Activo {
    id: number;
    codigo_inventario: string;
    marca: string;
    modelo: string;
    numero_serie: string | null;
    ubicacion_actual: { nombre_ubicacion: string } | null;
    tipo: { nombre_tipo: string } | null;
    estado: { nombre_estado: string } | null;
}

interface Ubicacion {
    id: number;
    nombre_ubicacion: string;
    codigo_qr: string;
    departamento: { nombre_departamento: string } | null;
}

interface ColaItem {
    tipo: 'activo' | 'ubicacion';
    id: number;
    label: string;
    codigo: string;
}

interface Props {
    activos: Activo[];
    ubicaciones: Ubicacion[];
    departamentos: Array<{ id: number; nombre_departamento: string }>;
    marcas: string[];
    tipos: Array<{ id: number; nombre_tipo: string }>;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const PER_PAGE = 10;

function estadoBadge(nombre: string | undefined): string {
    switch (nombre) {
        case 'Operativo':      return 'bg-green-100 text-green-700';
        case 'De Baja':        return 'bg-red-100 text-red-700';
        case 'En Reparación':  return 'bg-orange-100 text-orange-700';
        default:               return 'bg-gray-100 text-gray-600';
    }
}

// ─── TabActivos ──────────────────────────────────────────────────────────────

interface TabActivosProps {
    activos: Activo[];
    marcas: string[];
    tipos: Array<{ id: number; nombre_tipo: string }>;
    ubicaciones: Ubicacion[];
    cola: ColaItem[];
    setCola: React.Dispatch<React.SetStateAction<ColaItem[]>>;
    selectedActivos: Set<number>;
    setSelectedActivos: React.Dispatch<React.SetStateAction<Set<number>>>;
    searchActivo: string;
    setSearchActivo: (v: string) => void;
    filtroMarca: string;
    setFiltroMarca: (v: string) => void;
    filtroTipo: string;
    setFiltroTipo: (v: string) => void;
    filtroUbicacionActual: string;
    setFiltroUbicacionActual: (v: string) => void;
    pageActivos: number;
    setPageActivos: (v: number) => void;
}

function TabActivos({
    activos, marcas, tipos, ubicaciones,
    cola, setCola,
    selectedActivos, setSelectedActivos,
    searchActivo, setSearchActivo,
    filtroMarca, setFiltroMarca,
    filtroTipo, setFiltroTipo,
    filtroUbicacionActual, setFiltroUbicacionActual,
    pageActivos, setPageActivos,
}: TabActivosProps) {

    const activosFiltrados = useMemo(() => activos.filter(a => {
        const q = searchActivo.toLowerCase();
        const matchSearch = !q ||
            a.codigo_inventario.toLowerCase().includes(q) ||
            a.marca.toLowerCase().includes(q) ||
            a.modelo.toLowerCase().includes(q) ||
            (a.numero_serie?.toLowerCase().includes(q) ?? false);
        const matchMarca = !filtroMarca || a.marca === filtroMarca;
        const matchTipo  = !filtroTipo  || a.tipo?.nombre_tipo === filtroTipo;
        const matchUbic  = !filtroUbicacionActual ||
            a.ubicacion_actual?.nombre_ubicacion === filtroUbicacionActual;

        return matchSearch && matchMarca && matchTipo && matchUbic;
    }), [activos, searchActivo, filtroMarca, filtroTipo, filtroUbicacionActual]);

    const totalPages    = Math.max(1, Math.ceil(activosFiltrados.length / PER_PAGE));
    const pageSafe      = Math.min(pageActivos, totalPages);
    const activosPagina = activosFiltrados.slice((pageSafe - 1) * PER_PAGE, pageSafe * PER_PAGE);
    const firstItem     = activosFiltrados.length === 0 ? 0 : (pageSafe - 1) * PER_PAGE + 1;
    const lastItem      = Math.min(pageSafe * PER_PAGE, activosFiltrados.length);

    const todaLaPaginaSeleccionada =
        activosPagina.length > 0 && activosPagina.every(a => selectedActivos.has(a.id));

    function togglePagina(checked: boolean) {
        setSelectedActivos(prev => {
            const next = new Set(prev);
            activosPagina.forEach(a => checked ? next.add(a.id) : next.delete(a.id));

            return next;
        });
    }

    function toggleActivo(id: number) {
        setSelectedActivos(prev => {
            const next = new Set(prev);

            if (next.has(id)) {
 next.delete(id); 
} else {
 next.add(id); 
}

            return next;
        });
    }

    function agregarACola() {
        const nuevos = activosFiltrados
            .filter(a =>
                selectedActivos.has(a.id) &&
                !cola.find(c => c.id === a.id && c.tipo === 'activo')
            )
            .map<ColaItem>(a => ({
                tipo: 'activo',
                id: a.id,
                label: `${a.marca} ${a.modelo}`,
                codigo: a.codigo_inventario,
            }));
        setCola(prev => [...prev, ...nuevos]);
        setSelectedActivos(new Set());
    }

    return (
        <div className="flex flex-col">
            {/* ── Filtros ─────────────────────────────────────────────────── */}
            <div className="p-4 bg-white border-b space-y-3">
                <div className="flex gap-3">
                    <div className="flex-1 relative">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        <input
                            type="text"
                            value={searchActivo}
                            onChange={e => {
 setSearchActivo(e.target.value); setPageActivos(1); 
}}
                            placeholder="Buscar activo..."
                            className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white"
                        />
                    </div>
                    <select
                        value={filtroMarca}
                        onChange={e => {
 setFiltroMarca(e.target.value); setPageActivos(1); 
}}
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white min-w-[140px]"
                        style={{ color: '#374151' }}
                    >
                        <option value="">— Marca —</option>
                        {marcas.map(m => (
                            <option key={m} value={m}>{m}</option>
                        ))}
                    </select>
                    <select
                        value={filtroTipo}
                        onChange={e => {
 setFiltroTipo(e.target.value); setPageActivos(1); 
}}
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white min-w-[160px]"
                        style={{ color: '#374151' }}
                    >
                        <option value="">— Tipo de Equipo —</option>
                        {tipos.map(t => (
                            <option key={t.id} value={t.nombre_tipo}>{t.nombre_tipo}</option>
                        ))}
                    </select>
                </div>
                <div className="flex gap-3">
                    <select
                        value={filtroUbicacionActual}
                        onChange={e => {
 setFiltroUbicacionActual(e.target.value); setPageActivos(1); 
}}
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white"
                        style={{ color: '#374151' }}
                    >
                        <option value="">— Ubicación Actual —</option>
                        {ubicaciones.map(u => (
                            <option key={u.id} value={u.nombre_ubicacion}>{u.nombre_ubicacion}</option>
                        ))}
                    </select>
                    <button
                        onClick={() => {
                            setSearchActivo('');
                            setFiltroMarca('');
                            setFiltroTipo('');
                            setFiltroUbicacionActual('');
                            setPageActivos(1);
                        }}
                        className="flex items-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg text-sm hover:bg-blue-50 transition-colors"
                    >
                        <Filter size={14} />
                        LIMPIAR FILTROS
                    </button>
                </div>
                <p className="text-xs text-gray-400">
                    Buscar por código, marca, modelo o número de serie
                </p>
            </div>

            {/* ── Barra de selección ──────────────────────────────────────── */}
            <div className="bg-blue-50 flex items-center gap-3 px-4 py-3">
                <span className="rounded-full bg-blue-800 px-2.5 py-0.5 text-xs font-semibold text-white">
                    {selectedActivos.size} de {activosFiltrados.length} seleccionados
                </span>
                <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={todaLaPaginaSeleccionada}
                        onChange={e => togglePagina(e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300 accent-blue-700"
                    />
                    Seleccionar esta página
                </label>
            </div>

            {/* ── Tabla ───────────────────────────────────────────────────── */}
            <div className="overflow-x-auto bg-white">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-gray-100 bg-gray-50 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                            <th className="px-4 py-3 w-8">
                                <input
                                    type="checkbox"
                                    checked={todaLaPaginaSeleccionada}
                                    onChange={e => togglePagina(e.target.checked)}
                                    className="h-4 w-4 rounded border-gray-300 accent-blue-700"
                                />
                            </th>
                            <th className="px-4 py-3">Nombre</th>
                            <th className="px-4 py-3">Código</th>
                            <th className="px-4 py-3">Marca</th>
                            <th className="px-4 py-3">Ubicación</th>
                            <th className="px-4 py-3">Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {activosPagina.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-4 py-10 text-center text-gray-400">
                                    Sin activos que coincidan con los filtros.
                                </td>
                            </tr>
                        ) : activosPagina.map(a => (
                            <tr
                                key={a.id}
                                onClick={() => toggleActivo(a.id)}
                                className={[
                                    'border-b border-gray-50 cursor-pointer transition-colors',
                                    selectedActivos.has(a.id) ? 'bg-blue-50' : 'hover:bg-gray-50',
                                ].join(' ')}
                            >
                                <td className="px-4 py-3">
                                    <input
                                        type="checkbox"
                                        checked={selectedActivos.has(a.id)}
                                        onChange={() => toggleActivo(a.id)}
                                        onClick={e => e.stopPropagation()}
                                        className="h-4 w-4 rounded border-gray-300 accent-blue-700"
                                    />
                                </td>
                                <td className="px-4 py-3 font-medium text-gray-800">
                                    {a.marca} {a.modelo}
                                </td>
                                <td className="px-4 py-3 text-gray-500">
                                    {a.codigo_inventario}
                                </td>
                                <td className="px-4 py-3 text-gray-700">
                                    {a.marca}
                                </td>
                                <td className="px-4 py-3">
                                    {a.ubicacion_actual ? (
                                        <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-700">
                                            {a.ubicacion_actual.nombre_ubicacion}
                                        </span>
                                    ) : (
                                        <span className="text-gray-300 text-xs">—</span>
                                    )}
                                </td>
                                <td className="px-4 py-3">
                                    {a.estado ? (
                                        <span className={`rounded-full px-2 py-0.5 text-xs ${estadoBadge(a.estado.nombre_estado)}`}>
                                            {a.estado.nombre_estado}
                                        </span>
                                    ) : (
                                        <span className="text-gray-300 text-xs">—</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* ── Paginación ──────────────────────────────────────────────── */}
            <div className="flex items-center justify-between bg-white px-4 py-3 border-t border-gray-100">
                <span className="text-xs text-gray-500">
                    {firstItem}–{lastItem} de {activosFiltrados.length}
                </span>
                <div className="flex items-center gap-1">
                    <button onClick={() => setPageActivos(1)} disabled={pageSafe === 1}
                        className="rounded p-1 text-gray-400 hover:text-gray-700 disabled:opacity-30">
                        <ChevronsLeft size={16} />
                    </button>
                    <button onClick={() => setPageActivos(pageSafe - 1)} disabled={pageSafe === 1}
                        className="rounded p-1 text-gray-400 hover:text-gray-700 disabled:opacity-30">
                        <ChevronLeft size={16} />
                    </button>
                    <span className="min-w-[4rem] text-center text-xs text-gray-600">
                        {pageSafe} / {totalPages}
                    </span>
                    <button onClick={() => setPageActivos(pageSafe + 1)} disabled={pageSafe === totalPages}
                        className="rounded p-1 text-gray-400 hover:text-gray-700 disabled:opacity-30">
                        <ChevronRight size={16} />
                    </button>
                    <button onClick={() => setPageActivos(totalPages)} disabled={pageSafe === totalPages}
                        className="rounded p-1 text-gray-400 hover:text-gray-700 disabled:opacity-30">
                        <ChevronsRight size={16} />
                    </button>
                </div>
            </div>

            {/* ── Botón agregar a cola ─────────────────────────────────────── */}
            <div className="flex justify-end bg-white px-4 pb-4">
                <button
                    onClick={agregarACola}
                    disabled={selectedActivos.size === 0}
                    className={[
                        'rounded-xl px-5 py-3 text-sm font-bold transition-colors',
                        selectedActivos.size > 0
                            ? 'bg-green-600 text-white hover:bg-green-700'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed',
                    ].join(' ')}
                >
                    + AGREGAR {selectedActivos.size > 0 ? selectedActivos.size : ''} SELECCIONADOS A COLA
                </button>
            </div>
        </div>
    );
}

// ─── TabUbicaciones ──────────────────────────────────────────────────────────

interface TabUbicacionesProps {
    activos: Activo[];
    ubicaciones: Ubicacion[];
    departamentos: Array<{ id: number; nombre_departamento: string }>;
    cola: ColaItem[];
    setCola: React.Dispatch<React.SetStateAction<ColaItem[]>>;
}

function TabUbicaciones({ activos, ubicaciones, departamentos, cola, setCola }: TabUbicacionesProps) {
    const [filtroDept, setFiltroDept] = useState('');
    const [filtroUbic, setFiltroUbic] = useState('');
    const [searchText, setSearchText] = useState('');
    const [selected, setSelected]     = useState<Set<number>>(new Set());
    const [page, setPage]             = useState(1);

    const ubicacionesFiltradas = useMemo(() =>
        ubicaciones.filter(u => !filtroDept || u.departamento?.nombre_departamento === filtroDept),
        [ubicaciones, filtroDept]
    );

    const activosFiltrados = useMemo(() => activos.filter(a => {
        const matchUbic = !filtroUbic || a.ubicacion_actual?.nombre_ubicacion === filtroUbic;
        const q = searchText.toLowerCase();
        const matchSearch = !q ||
            a.codigo_inventario.toLowerCase().includes(q) ||
            a.marca.toLowerCase().includes(q) ||
            a.modelo.toLowerCase().includes(q) ||
            (a.numero_serie?.toLowerCase().includes(q) ?? false);

        return matchUbic && matchSearch;
    }), [activos, filtroUbic, searchText]);

    const totalPages    = Math.max(1, Math.ceil(activosFiltrados.length / PER_PAGE));
    const pageSafe      = Math.min(page, totalPages);
    const activosPagina = activosFiltrados.slice((pageSafe - 1) * PER_PAGE, pageSafe * PER_PAGE);
    const firstItem     = activosFiltrados.length === 0 ? 0 : (pageSafe - 1) * PER_PAGE + 1;
    const lastItem      = Math.min(pageSafe * PER_PAGE, activosFiltrados.length);

    const todaLaPaginaSeleccionada =
        activosPagina.length > 0 && activosPagina.every(a => selected.has(a.id));

    function togglePagina(checked: boolean) {
        setSelected(prev => {
            const next = new Set(prev);
            activosPagina.forEach(a => checked ? next.add(a.id) : next.delete(a.id));

            return next;
        });
    }

    function toggleActivo(id: number) {
        setSelected(prev => {
            const next = new Set(prev);

            if (next.has(id)) {
 next.delete(id); 
} else {
 next.add(id); 
}

            return next;
        });
    }

    function agregarACola() {
        const nuevos = activosFiltrados
            .filter(a => selected.has(a.id) && !cola.find(c => c.id === a.id && c.tipo === 'activo'))
            .map<ColaItem>(a => ({
                tipo: 'activo',
                id: a.id,
                label: `${a.marca} ${a.modelo}`,
                codigo: a.codigo_inventario,
            }));
        setCola(prev => [...prev, ...nuevos]);
        setSelected(new Set());
    }

    return (
        <div className="flex flex-col">
            {/* ── Filtros de ubicación ─────────────────────────────────────── */}
            <div className="p-4 bg-white border-b space-y-3">
                <select
                    value={filtroDept}
                    onChange={e => {
 setFiltroDept(e.target.value); setFiltroUbic(''); setPage(1); 
}}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white"
                    style={{ color: '#374151' }}
                >
                    <option value="">— Departamento —</option>
                    {departamentos.map(d => (
                        <option key={d.id} value={d.nombre_departamento}>{d.nombre_departamento}</option>
                    ))}
                </select>
                <select
                    value={filtroUbic}
                    onChange={e => {
 setFiltroUbic(e.target.value); setPage(1); 
}}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white"
                    style={{ color: '#374151' }}
                >
                    <option value="">— Ubicación —</option>
                    {ubicacionesFiltradas.map(u => (
                        <option key={u.id} value={u.nombre_ubicacion}>{u.nombre_ubicacion}</option>
                    ))}
                </select>
                <div className="relative">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    <input
                        type="text"
                        value={searchText}
                        onChange={e => {
 setSearchText(e.target.value); setPage(1); 
}}
                        placeholder="Buscar activo en esta ubicación..."
                        className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white"
                    />
                </div>
            </div>

            {/* ── Barra de selección ──────────────────────────────────────── */}
            <div className="bg-blue-50 flex items-center gap-3 px-4 py-3">
                <span className="rounded-full bg-blue-800 px-2.5 py-0.5 text-xs font-semibold text-white">
                    {selected.size} de {activosFiltrados.length} seleccionados
                </span>
                <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={todaLaPaginaSeleccionada}
                        onChange={e => togglePagina(e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300 accent-blue-700"
                    />
                    Seleccionar esta página
                </label>
            </div>

            {/* ── Tabla ───────────────────────────────────────────────────── */}
            <div className="overflow-x-auto bg-white">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-gray-100 bg-gray-50 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                            <th className="px-4 py-3 w-8">
                                <input
                                    type="checkbox"
                                    checked={todaLaPaginaSeleccionada}
                                    onChange={e => togglePagina(e.target.checked)}
                                    className="h-4 w-4 rounded border-gray-300 accent-blue-700"
                                />
                            </th>
                            <th className="px-4 py-3">Nombre</th>
                            <th className="px-4 py-3">Código</th>
                            <th className="px-4 py-3">Marca</th>
                            <th className="px-4 py-3">Ubicación</th>
                            <th className="px-4 py-3">Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {activosPagina.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-4 py-10 text-center text-gray-400">
                                    {filtroUbic
                                        ? 'Sin activos en esta ubicación.'
                                        : 'Seleccioná una ubicación para ver sus activos.'}
                                </td>
                            </tr>
                        ) : activosPagina.map(a => (
                            <tr
                                key={a.id}
                                onClick={() => toggleActivo(a.id)}
                                className={[
                                    'border-b border-gray-50 cursor-pointer transition-colors',
                                    selected.has(a.id) ? 'bg-blue-50' : 'hover:bg-gray-50',
                                ].join(' ')}
                            >
                                <td className="px-4 py-3">
                                    <input
                                        type="checkbox"
                                        checked={selected.has(a.id)}
                                        onChange={() => toggleActivo(a.id)}
                                        onClick={e => e.stopPropagation()}
                                        className="h-4 w-4 rounded border-gray-300 accent-blue-700"
                                    />
                                </td>
                                <td className="px-4 py-3 font-medium text-gray-800">
                                    {a.marca} {a.modelo}
                                </td>
                                <td className="px-4 py-3 text-gray-500">
                                    {a.codigo_inventario}
                                </td>
                                <td className="px-4 py-3 text-gray-700">
                                    {a.marca}
                                </td>
                                <td className="px-4 py-3">
                                    {a.ubicacion_actual ? (
                                        <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-700">
                                            {a.ubicacion_actual.nombre_ubicacion}
                                        </span>
                                    ) : (
                                        <span className="text-gray-300 text-xs">—</span>
                                    )}
                                </td>
                                <td className="px-4 py-3">
                                    {a.estado ? (
                                        <span className={`rounded-full px-2 py-0.5 text-xs ${estadoBadge(a.estado.nombre_estado)}`}>
                                            {a.estado.nombre_estado}
                                        </span>
                                    ) : (
                                        <span className="text-gray-300 text-xs">—</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* ── Paginación ──────────────────────────────────────────────── */}
            <div className="flex items-center justify-between bg-white px-4 py-3 border-t border-gray-100">
                <span className="text-xs text-gray-500">
                    {firstItem}–{lastItem} de {activosFiltrados.length}
                </span>
                <div className="flex items-center gap-1">
                    <button onClick={() => setPage(1)} disabled={pageSafe === 1}
                        className="rounded p-1 text-gray-400 hover:text-gray-700 disabled:opacity-30">
                        <ChevronsLeft size={16} />
                    </button>
                    <button onClick={() => setPage(pageSafe - 1)} disabled={pageSafe === 1}
                        className="rounded p-1 text-gray-400 hover:text-gray-700 disabled:opacity-30">
                        <ChevronLeft size={16} />
                    </button>
                    <span className="min-w-[4rem] text-center text-xs text-gray-600">
                        {pageSafe} / {totalPages}
                    </span>
                    <button onClick={() => setPage(pageSafe + 1)} disabled={pageSafe === totalPages}
                        className="rounded p-1 text-gray-400 hover:text-gray-700 disabled:opacity-30">
                        <ChevronRight size={16} />
                    </button>
                    <button onClick={() => setPage(totalPages)} disabled={pageSafe === totalPages}
                        className="rounded p-1 text-gray-400 hover:text-gray-700 disabled:opacity-30">
                        <ChevronsRight size={16} />
                    </button>
                </div>
            </div>

            {/* ── Botón agregar a cola ─────────────────────────────────────── */}
            <div className="flex justify-end bg-white px-4 pb-4">
                <button
                    onClick={agregarACola}
                    disabled={selected.size === 0}
                    className={[
                        'rounded-xl px-5 py-3 text-sm font-bold transition-colors',
                        selected.size > 0
                            ? 'bg-green-600 text-white hover:bg-green-700'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed',
                    ].join(' ')}
                >
                    + AGREGAR {selected.size > 0 ? selected.size : ''} SELECCIONADOS A COLA
                </button>
            </div>
        </div>
    );
}

// ─── TabManual ───────────────────────────────────────────────────────────────

interface TabManualProps {
    activos: Activo[];
    cola: ColaItem[];
    setCola: React.Dispatch<React.SetStateAction<ColaItem[]>>;
}

function TabManual({ activos, cola, setCola }: TabManualProps) {
    const [manualInput, setManualInput] = useState('');
    const [manualCodes, setManualCodes] = useState<string[]>([]);
    const [errorManual, setErrorManual] = useState('');

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key !== 'Enter') {
return;
}

        e.preventDefault();
        const code = manualInput.trim().toUpperCase();

        if (!code) {
return;
}

        if (manualCodes.includes(code)) {
            setErrorManual(`El código ${code} ya está en la lista.`);

            return;
        }

        const found = activos.find(a => a.codigo_inventario.toUpperCase() === code);

        if (!found) {
            setErrorManual(`No se encontró ningún activo con código "${code}".`);

            return;
        }

        setManualCodes(prev => [...prev, code]);
        setManualInput('');
        setErrorManual('');
    }

    function removeCode(code: string) {
        setManualCodes(prev => prev.filter(c => c !== code));
    }

    function limpiar() {
        setManualCodes([]);
        setManualInput('');
        setErrorManual('');
    }

    function agregarACola() {
        const nuevos = activos
            .filter(a =>
                manualCodes.includes(a.codigo_inventario.toUpperCase()) &&
                !cola.find(c => c.id === a.id && c.tipo === 'activo')
            )
            .map<ColaItem>(a => ({
                tipo: 'activo',
                id: a.id,
                label: `${a.marca} ${a.modelo}`,
                codigo: a.codigo_inventario,
            }));
        setCola(prev => [...prev, ...nuevos]);
        limpiar();
    }

    return (
        <div className="p-4 flex flex-col gap-4">
            {/* Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex gap-2 text-sm text-blue-700">
                <Info size={16} className="shrink-0 mt-0.5" />
                <span>
                    Ingresá los códigos de inventario uno por uno.
                    Presioná <strong>Enter</strong> para agregar cada uno a la lista.
                </span>
            </div>

            {/* Input */}
            <div>
                <div className="relative">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    <input
                        type="text"
                        value={manualInput}
                        onChange={e => {
 setManualInput(e.target.value); setErrorManual(''); 
}}
                        onKeyDown={handleKeyDown}
                        placeholder="Código de inventario — presioná Enter para agregar"
                        className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white"
                    />
                </div>
                {errorManual && (
                    <p className="mt-1.5 text-xs text-red-600">{errorManual}</p>
                )}
            </div>

            {/* Chips */}
            {manualCodes.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {manualCodes.map(code => (
                        <span
                            key={code}
                            className="flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1.5 text-xs font-medium text-blue-800"
                        >
                            {code}
                            <button
                                onClick={() => removeCode(code)}
                                className="hover:text-blue-900 transition-colors"
                                aria-label={`Quitar ${code}`}
                            >
                                <X size={12} />
                            </button>
                        </span>
                    ))}
                </div>
            )}

            {/* Botones */}
            <div className="flex gap-3 justify-end">
                <button
                    onClick={limpiar}
                    disabled={manualCodes.length === 0}
                    className="px-4 py-2 text-sm border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-40 transition-colors"
                >
                    LIMPIAR
                </button>
                <button
                    onClick={agregarACola}
                    disabled={manualCodes.length === 0}
                    className={[
                        'rounded-xl px-5 py-2 text-sm font-bold transition-colors',
                        manualCodes.length > 0
                            ? 'bg-green-600 text-white hover:bg-green-700'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed',
                    ].join(' ')}
                >
                    + AGREGAR {manualCodes.length > 0 ? manualCodes.length : ''} A COLA
                </button>
            </div>
        </div>
    );
}

// ─── TabQrUbicaciones ────────────────────────────────────────────────────────

interface TabQrUbicacionesProps {
    ubicaciones: Ubicacion[];
    departamentos: Array<{ id: number; nombre_departamento: string }>;
    cola: ColaItem[];
    setCola: React.Dispatch<React.SetStateAction<ColaItem[]>>;
}

function TabQrUbicaciones({ ubicaciones, departamentos, cola, setCola }: TabQrUbicacionesProps) {
    const [filtroDept, setFiltroDept] = useState('');
    const [searchText, setSearchText] = useState('');
    const [selected, setSelected]     = useState<Set<number>>(new Set());

    const filtradas = useMemo(() => ubicaciones.filter(u => {
        const matchDept   = !filtroDept || u.departamento?.nombre_departamento === filtroDept;
        const q           = searchText.toLowerCase();
        const matchSearch = !q ||
            u.nombre_ubicacion.toLowerCase().includes(q) ||
            u.codigo_qr.toLowerCase().includes(q);

        return matchDept && matchSearch;
    }), [ubicaciones, filtroDept, searchText]);

    const todasSeleccionadas = filtradas.length > 0 && filtradas.every(u => selected.has(u.id));

    function toggleUbicacion(id: number) {
        setSelected(prev => {
            const next = new Set(prev);

            if (next.has(id)) {
 next.delete(id); 
} else {
 next.add(id); 
}

            return next;
        });
    }

    function toggleTodas(checked: boolean) {
        setSelected(prev => {
            const next = new Set(prev);
            filtradas.forEach(u => checked ? next.add(u.id) : next.delete(u.id));

            return next;
        });
    }

    function agregarACola() {
        const nuevos = filtradas
            .filter(u => selected.has(u.id) && !cola.find(c => c.id === u.id && c.tipo === 'ubicacion'))
            .map<ColaItem>(u => ({
                tipo: 'ubicacion',
                id: u.id,
                label: u.nombre_ubicacion,
                codigo: u.codigo_qr,
            }));
        setCola(prev => [...prev, ...nuevos]);
        setSelected(new Set());
    }

    return (
        <div className="flex flex-col">
            {/* Info */}
            <div className="m-4 bg-purple-50 border border-purple-200 rounded-lg p-3 flex gap-2 text-sm text-purple-700">
                <Info size={16} className="shrink-0 mt-0.5" />
                <span>Seleccioná ubicaciones para imprimir sus etiquetas QR de locación.</span>
            </div>

            {/* Filtros */}
            <div className="px-4 pb-4 bg-white border-b space-y-3">
                <select
                    value={filtroDept}
                    onChange={e => setFiltroDept(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white"
                    style={{ color: '#374151' }}
                >
                    <option value="">— Departamento —</option>
                    {departamentos.map(d => (
                        <option key={d.id} value={d.nombre_departamento}>{d.nombre_departamento}</option>
                    ))}
                </select>
                <div className="relative">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    <input
                        type="text"
                        value={searchText}
                        onChange={e => setSearchText(e.target.value)}
                        placeholder="Buscar ubicación o código QR..."
                        className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white"
                    />
                </div>
            </div>

            {/* Barra de selección */}
            <div className="bg-purple-50 flex items-center gap-3 px-4 py-3">
                <span className="rounded-full bg-purple-600 px-2.5 py-0.5 text-xs font-semibold text-white">
                    {selected.size} de {filtradas.length} seleccionadas
                </span>
                <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={todasSeleccionadas}
                        onChange={e => toggleTodas(e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300 accent-purple-600"
                    />
                    Seleccionar todas
                </label>
            </div>

            {/* Lista de ubicaciones */}
            <div className="bg-white divide-y divide-gray-100">
                {filtradas.length === 0 ? (
                    <p className="py-10 text-center text-sm text-gray-400">
                        Sin ubicaciones que coincidan.
                    </p>
                ) : filtradas.map(u => (
                    <div
                        key={u.id}
                        onClick={() => toggleUbicacion(u.id)}
                        className={[
                            'flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors',
                            selected.has(u.id) ? 'bg-purple-50' : 'hover:bg-gray-50',
                        ].join(' ')}
                    >
                        <input
                            type="checkbox"
                            checked={selected.has(u.id)}
                            onChange={() => toggleUbicacion(u.id)}
                            onClick={e => e.stopPropagation()}
                            className="h-4 w-4 rounded border-gray-300 accent-purple-600 shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-gray-800 truncate">
                                {u.nombre_ubicacion}
                            </p>
                            <div className="mt-1 flex flex-wrap gap-2">
                                <span className="rounded-full bg-purple-100 px-2 py-0.5 text-xs text-purple-700">
                                    {u.codigo_qr}
                                </span>
                                {u.departamento && (
                                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                                        {u.departamento.nombre_departamento}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Botón agregar a cola */}
            <div className="flex justify-end bg-white px-4 py-4 border-t border-gray-100">
                <button
                    onClick={agregarACola}
                    disabled={selected.size === 0}
                    className={[
                        'rounded-xl px-5 py-3 text-sm font-bold transition-colors',
                        selected.size > 0
                            ? 'bg-purple-600 text-white hover:bg-purple-700'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed',
                    ].join(' ')}
                >
                    + AGREGAR {selected.size > 0 ? selected.size : ''} UBICACIONES A COLA
                </button>
            </div>
        </div>
    );
}

// ─── Definición de tabs ──────────────────────────────────────────────────────

type TabId = 'activos' | 'ubicaciones' | 'manual' | 'qr-ubicaciones';

const TABS: Array<{ id: TabId; label: string; icon: React.ReactNode }> = [
    { id: 'activos',        label: 'POR ACTIVOS',     icon: <CheckSquare size={14} /> },
    { id: 'ubicaciones',    label: 'POR UBICACIONES',  icon: <MapPin size={14} /> },
    { id: 'manual',         label: 'MANUAL',           icon: <AlignJustify size={14} /> },
    { id: 'qr-ubicaciones', label: 'QR UBICACIONES',   icon: <QrCode size={14} /> },
];

// ─── Componente principal ────────────────────────────────────────────────────

export default function TecnicoImprimir({ activos, ubicaciones, departamentos, marcas, tipos }: Props) {
    const [activeTab, setActiveTab]   = useState<TabId>('activos');
    const [cola, setCola]             = useState<ColaItem[]>([]);
    const [showPreview, setShowPreview] = useState(false);

    // Estado de TabActivos levantado al padre para persistir entre cambios de tab
    const [selectedActivos, setSelectedActivos]             = useState<Set<number>>(new Set());
    const [searchActivo, setSearchActivo]                   = useState('');
    const [filtroMarca, setFiltroMarca]                     = useState('');
    const [filtroTipo, setFiltroTipo]                       = useState('');
    const [filtroUbicacionActual, setFiltroUbicacionActual] = useState('');
    const [pageActivos, setPageActivos]                     = useState(1);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Head title="Imprimir Etiquetas — SCA-IT" />

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

            {/* ── Barra de tabs ─────────────────────────────────────────── */}
            <div className="fixed inset-x-0 top-14 z-40 flex bg-blue-700">
                {TABS.map((tab) => {
                    const active = activeTab === tab.id;

                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={[
                                'flex flex-1 flex-col items-center justify-center gap-0.5 py-2 text-[10px] font-semibold transition-colors',
                                active
                                    ? 'border-b-2 border-white text-white'
                                    : 'text-blue-200 hover:text-white',
                            ].join(' ')}
                        >
                            {tab.icon}
                            <span>{tab.label}</span>
                        </button>
                    );
                })}
            </div>

            {/* ── Contenido principal ───────────────────────────────────── */}
            <div className="mt-[104px] flex-1 pb-16">
                {activeTab === 'activos' && (
                    <TabActivos
                        activos={activos}
                        marcas={marcas}
                        tipos={tipos}
                        ubicaciones={ubicaciones}
                        cola={cola}
                        setCola={setCola}
                        selectedActivos={selectedActivos}
                        setSelectedActivos={setSelectedActivos}
                        searchActivo={searchActivo}
                        setSearchActivo={setSearchActivo}
                        filtroMarca={filtroMarca}
                        setFiltroMarca={setFiltroMarca}
                        filtroTipo={filtroTipo}
                        setFiltroTipo={setFiltroTipo}
                        filtroUbicacionActual={filtroUbicacionActual}
                        setFiltroUbicacionActual={setFiltroUbicacionActual}
                        pageActivos={pageActivos}
                        setPageActivos={setPageActivos}
                    />
                )}
                {activeTab === 'ubicaciones' && (
                    <TabUbicaciones
                        activos={activos}
                        ubicaciones={ubicaciones}
                        departamentos={departamentos}
                        cola={cola}
                        setCola={setCola}
                    />
                )}
                {activeTab === 'manual' && (
                    <TabManual
                        activos={activos}
                        cola={cola}
                        setCola={setCola}
                    />
                )}
                {activeTab === 'qr-ubicaciones' && (
                    <TabQrUbicaciones
                        ubicaciones={ubicaciones}
                        departamentos={departamentos}
                        cola={cola}
                        setCola={setCola}
                    />
                )}
            </div>

            {/* ── Cola de impresión (en flujo, no fija) ─────────────────── */}
            {cola.length > 0 && (
                <div className="border-t-2 border-gray-200 bg-white px-4 pt-4 pb-20">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <Printer size={18} className="text-green-600" />
                            <span className="font-bold text-gray-800">Cola de Impresión</span>
                        </div>
                        <button
                            onClick={() => setCola([])}
                            className="flex items-center gap-1 text-red-500 text-sm hover:text-red-700"
                        >
                            <Trash2 size={14} />
                            LIMPIAR TODO
                        </button>
                    </div>

                    {/* Chips de activos */}
                    {cola.filter(x => x.tipo === 'activo').length > 0 && (
                        <div className="mb-3">
                            <p className="text-xs font-medium text-gray-500 mb-2">
                                Activos ({cola.filter(x => x.tipo === 'activo').length})
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {cola.filter(x => x.tipo === 'activo').map(item => (
                                    <span
                                        key={item.id}
                                        className="flex items-center gap-1 bg-gray-100 rounded-full px-3 py-1 text-xs text-gray-700"
                                    >
                                        {item.codigo} - {item.label}
                                        <button
                                            onClick={() => setCola(prev =>
                                                prev.filter(c => !(c.id === item.id && c.tipo === 'activo'))
                                            )}
                                        >
                                            <X size={12} className="text-gray-400 hover:text-red-500" />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Chips de ubicaciones */}
                    {cola.filter(x => x.tipo === 'ubicacion').length > 0 && (
                        <div>
                            <p className="text-xs font-medium text-gray-500 mb-2">
                                Ubicaciones ({cola.filter(x => x.tipo === 'ubicacion').length})
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {cola.filter(x => x.tipo === 'ubicacion').map(item => (
                                    <span
                                        key={item.id}
                                        className="flex items-center gap-1 bg-purple-100 rounded-full px-3 py-1 text-xs text-purple-700"
                                    >
                                        {item.codigo} - {item.label}
                                        <button
                                            onClick={() => setCola(prev =>
                                                prev.filter(c => !(c.id === item.id && c.tipo === 'ubicacion'))
                                            )}
                                        >
                                            <X size={12} className="text-purple-400 hover:text-red-500" />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* ── Botón flotante Vista Previa ───────────────────────────── */}
            {cola.length > 0 && (
                <div className="fixed bottom-20 right-4 z-40">
                    <button
                        onClick={() => setShowPreview(true)}
                        className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white rounded-full px-5 py-3 shadow-lg font-medium text-sm"
                    >
                        <Printer size={18} />
                        VISTA PREVIA / IMPRIMIR ({cola.length})
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
                <button className="flex flex-1 flex-col items-center justify-center py-3 text-xs text-blue-600">
                    <Printer size={22} />
                    <span className="mt-0.5">Imprimir</span>
                </button>
            </nav>

            {/* ── Vista Previa / Impresión (overlay fullscreen) ─────────── */}
            {showPreview && (
                <>
                    <style>{`
                        @media print {
                            body * { visibility: hidden !important; }
                            #print-area, #print-area * { visibility: visible !important; }
                            #print-area {
                                position: fixed !important;
                                top: 0 !important;
                                left: 0 !important;
                                width: 100% !important;
                                display: grid !important;
                                grid-template-columns: repeat(3, 1fr) !important;
                                gap: 0.5cm !important;
                                padding: 0.5cm !important;
                            }
                            #print-area svg {
                                visibility: visible !important;
                                display: block !important;
                            }
                            @page { margin: 0.3cm; size: A4; }
                        }
                    `}</style>

                    <div className="fixed inset-0 z-50 bg-white flex flex-col">
                        {/* Header */}
                        <div className="bg-blue-700 text-white h-14 flex items-center px-4 gap-4 flex-shrink-0">
                            <button
                                onClick={() => setShowPreview(false)}
                                className="hover:bg-blue-600 p-1 rounded"
                            >
                                <X size={20} />
                            </button>
                            <span className="flex-1 font-semibold">
                                Vista Previa de Etiquetas ({cola.length} elementos)
                            </span>
                            <button
                                onClick={() => window.print()}
                                className="flex items-center gap-2 bg-white text-blue-700 rounded px-4 py-2 font-semibold text-sm hover:bg-blue-50"
                            >
                                <Printer size={16} />
                                IMPRIMIR AHORA
                            </button>
                        </div>

                        {/* Grid de etiquetas */}
                        <div className="flex-1 overflow-auto p-6">
                            <div id="print-area" className="grid grid-cols-3 gap-4">
                                {cola.map(item => (
                                    <div
                                        key={item.tipo + item.id}
                                        className="border border-dashed border-gray-400 rounded p-3 flex items-center justify-between min-h-[90px]"
                                    >
                                        {/* Nombre */}
                                        <div className="flex-1 pr-2">
                                            <p className="font-semibold text-sm text-gray-800 leading-tight">
                                                {item.label}
                                            </p>
                                            {item.tipo === 'ubicacion' && (
                                                <p className="text-xs text-purple-600 mt-1">{item.codigo}</p>
                                            )}
                                        </div>

                                        {/* QR + código rotado */}
                                        <div className="flex items-center gap-1 flex-shrink-0">
                                            <QRCodeSVG
                                                value={item.codigo}
                                                size={64}
                                                level="M"
                                                includeMargin={false}
                                            />
                                            <span
                                                style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                                                className="text-xs text-gray-400 select-none"
                                            >
                                                {item.codigo}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

// Página standalone: el case 'Tecnico/' en app.tsx devuelve null para el layout global.
TecnicoImprimir.layout = null;
