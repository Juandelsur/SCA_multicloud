import { Head, Link, router } from '@inertiajs/react';
import {
    ArrowLeftRight,
    Camera,
    HelpCircle,
    History,
    Home,
    LayoutList,
    LogOut,
    Printer,
    RotateCcw,
    Search,
    UserCheck,
    Wrench,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { logout } from '@/routes';
import { show as activosShow } from '@/routes/activos';
import { index as historialIndex } from '@/routes/historial';
import { home as tecnicoHome, imprimir as tecnicoImprimir } from '@/routes/tecnico';

// ─── Tipos ───────────────────────────────────────────────────────────────────

interface Movimiento {
    id: number;
    tipo_movimiento: string;
    created_at: string;
    activo: { id: number; codigo_inventario: string; marca: string; modelo: string } | null;
    usuario_registra: { id: number; name: string } | null;
    ubicacion_origen: { nombre_ubicacion: string } | null;
    ubicacion_destino: { nombre_ubicacion: string } | null;
}

interface Props {
    ultimosMovimientos: Movimiento[];
    auth: { user: { name: string } };
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function tiempoRelativo(fecha: string): string {
    const diff = Date.now() - new Date(fecha).getTime();
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

type TipoMov = 'TRASLADO' | 'ASIGNACION' | 'DEVOLUCION' | 'MANTENIMIENTO';

const MOV_META: Record<TipoMov, { bg: string; badge: string; icon: React.ReactNode }> = {
    TRASLADO:     { bg: 'bg-blue-500',   badge: 'bg-blue-100 text-blue-700',     icon: <ArrowLeftRight size={16} className="text-white" /> },
    ASIGNACION:   { bg: 'bg-green-500',  badge: 'bg-green-100 text-green-700',   icon: <UserCheck size={16} className="text-white" /> },
    DEVOLUCION:   { bg: 'bg-orange-400', badge: 'bg-orange-100 text-orange-700', icon: <RotateCcw size={16} className="text-white" /> },
    MANTENIMIENTO:{ bg: 'bg-yellow-500', badge: 'bg-yellow-100 text-yellow-700', icon: <Wrench size={16} className="text-white" /> },
};

function movMeta(tipo: string) {
    return MOV_META[tipo as TipoMov] ?? {
        bg: 'bg-gray-400',
        badge: 'bg-gray-100 text-gray-600',
        icon: <HelpCircle size={16} className="text-white" />,
    };
}

// ─── QrScanner ───────────────────────────────────────────────────────────────

function QrScanner({ onResult, onClose, stopRef }: {
    onResult: (code: string) => void;
    onClose: () => void;
    stopRef: React.MutableRefObject<() => Promise<void>>;
}) {
    const scannerRef = useRef<any>(null);
    const startedRef = useRef(false);
    const decodedRef = useRef(false);

    useEffect(() => {
        if (startedRef.current) {
return;
}

        startedRef.current = true;

        const stopCamera = async () => {
            try {
                if (scannerRef.current) {
                    await scannerRef.current.stop();
                    scannerRef.current.clear();
                }
            } catch { /* ignorar error de stop */ }

            document.querySelectorAll('video').forEach(video => {
                const el = video as HTMLVideoElement;
                const stream = el.srcObject as MediaStream | null;

                if (stream) {
                    stream.getTracks().forEach(t => t.stop());
                    el.srcObject = null;
                }
            });
        };

        stopRef.current = stopCamera;

        const config = { fps: 10, qrbox: { width: 250, height: 250 } };

        const onDecode = (text: string) => {
            if (decodedRef.current) {
return;
}

            decodedRef.current = true;

            stopCamera().finally(() => {
 onResult(text); 
});
        };

        import('html5-qrcode').then(({ Html5Qrcode }) => {
            const scanner = new Html5Qrcode('qr-video-container');
            scannerRef.current = scanner;

            Html5Qrcode.getCameras()
                .then((cams: any[]) => {
                    if (!cams.length) {
 onClose();

 return; 
}

                    const cam = cams.find(c =>
                        /back|rear|trasera/i.test(c.label)
                    ) ?? cams[cams.length - 1];

                    return scanner.start(cam.id, config, onDecode, () => {});
                })
                .catch(() => {
                    scanner.start(
                        { facingMode: 'environment' }, config, onDecode, () => {}
                    ).catch(onClose);
                });
        });

        return () => {
 stopCamera(); 
};
    }, []);

    return (
        <div className="relative rounded-xl overflow-hidden">
            <div id="qr-video-container" className="w-full rounded-xl" />
            <div className="mt-3 text-center">
                <p className="text-white/80 text-sm mb-2">
                    ● Cámara activa — Apunta al código QR
                </p>
                <button
                    onClick={() => stopRef.current().then(onClose)}
                    className="bg-white/20 hover:bg-white/30 text-white rounded-lg px-6 py-2 text-sm font-medium"
                >
                    Cancelar
                </button>
            </div>
        </div>
    );
}

// ─── Página ───────────────────────────────────────────────────────────────────

export default function TecnicoScan({ ultimosMovimientos }: Props) {
    const [manualCode,   setManualCode]   = useState('');
    const [searching,    setSearching]    = useState(false);
    const [searchError,  setSearchError]  = useState('');
    const [camaraActiva, setCamaraActiva] = useState(false);
    const safeStopRef = useRef<() => Promise<void>>(async () => {});

    useEffect(() => {
        const handleBefore = () => {
 safeStopRef.current().catch(() => {}); 
};
        document.addEventListener('inertia:before', handleBefore);

        return () => document.removeEventListener('inertia:before', handleBefore);
    }, []);

    async function handleBuscarCodigo(code: string) {
        const upperCode = code.trim().toUpperCase();

        if (!upperCode) {
return;
}

        setSearching(true);
        setSearchError('');

        if (camaraActiva) {
            await safeStopRef.current();
            setCamaraActiva(false);
            await new Promise(resolve => setTimeout(resolve, 300));
        }

        try {
            const response = await fetch(
                `/api/activos/buscar?codigo=${encodeURIComponent(upperCode)}`,
                { headers: { 'Accept': 'application/json', 'X-Requested-With': 'XMLHttpRequest' } }
            );

            if (response.ok) {
                const data = await response.json();
                router.visit(activosShow({ activo: data.id }).url);
            } else {
                setSearchError(`No se encontró activo con código: ${upperCode}`);
            }
        } catch {
            setSearchError('Error al buscar. Intenta nuevamente.');
        } finally {
            setSearching(false);
        }
    }

    function handleBuscar() {
        handleBuscarCodigo(manualCode);
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Head title="Escanear Activo — SCA-IT" />

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

                {/* ── Header azul ─────────────────────────────────────── */}
                <div className="bg-blue-600 mx-4 mt-4 rounded-xl p-6 text-center">
                    <h1 className="text-white text-2xl font-bold mb-2">Escanear Activo</h1>
                    <p className="text-blue-100 text-sm">
                        Apunta la cámara al código QR o ingresa el código manualmente
                    </p>
                </div>

                {/* ── Card cámara ─────────────────────────────────────── */}
                <div className="bg-white rounded-xl mx-4 mt-3 p-6">
                    <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-8 text-center">
                        {!camaraActiva ? (
                            <>
                                <Camera size={48} className="text-white/60 mx-auto mb-4" />
                                <p className="text-white font-bold text-xl mb-2">Escáner QR</p>
                                <p className="text-white/70 text-sm mb-4">
                                    Presiona el botón para activar la cámara
                                </p>
                                <button
                                    onClick={() => setCamaraActiva(true)}
                                    className="bg-blue-800 hover:bg-blue-900 text-white rounded-xl px-6 py-3 font-medium transition-colors"
                                >
                                    📷 ACTIVAR CÁMARA
                                </button>
                                <p className="text-white/50 text-xs mt-2">
                                    Se solicitarán permisos de cámara
                                </p>
                            </>
                        ) : (
                            <QrScanner
                                stopRef={safeStopRef}
                                onResult={(code) => handleBuscarCodigo(code)}
                                onClose={() => setCamaraActiva(false)}
                            />
                        )}
                    </div>
                </div>

                {/* ── Card ingreso manual ──────────────────────────────── */}
                <div className="bg-white rounded-xl mx-4 mt-3 p-4">
                    <div className="flex items-center gap-2 mb-3">
                        <LayoutList size={18} className="text-blue-600" />
                        <span className="font-semibold text-gray-800">Ingreso Manual</span>
                    </div>

                    <div className="relative">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        <input
                            type="text"
                            value={manualCode}
                            onChange={e => {
 setManualCode(e.target.value); setSearchError(''); 
}}
                            onKeyDown={e => {
 if (e.key === 'Enter') {
handleBuscar();
} 
}}
                            placeholder="Código de activo o ubicación"
                            className="w-full pl-9 pr-3 py-3 border border-gray-300 rounded-xl text-sm text-gray-700 bg-white"
                        />
                    </div>
                    <p className="text-xs text-gray-400 mt-1.5">
                        Formato: INV-XX-XXXXXX o LOC-XXXXXX
                    </p>
                    {searchError && (
                        <p className="text-red-500 text-sm mt-1">{searchError}</p>
                    )}

                    <button
                        onClick={handleBuscar}
                        disabled={!manualCode.trim() || searching}
                        className="mt-3 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {searching ? 'Buscando...' : '🔍 BUSCAR'}
                    </button>
                </div>

                {/* ── Actividad reciente ───────────────────────────────── */}
                <div className="bg-white rounded-xl mx-4 mt-3 mb-6 p-4">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <History size={18} className="text-blue-600" />
                            <span className="font-semibold text-gray-800">Actividad Reciente</span>
                        </div>
                        <span className="rounded-full bg-blue-600 px-2.5 py-0.5 text-xs font-semibold text-white">
                            {ultimosMovimientos.length}
                        </span>
                    </div>

                    {ultimosMovimientos.length === 0 ? (
                        <div className="flex flex-col items-center py-8 text-gray-400">
                            <History size={32} className="mb-2 opacity-40" />
                            <p className="text-sm">Sin actividad reciente</p>
                        </div>
                    ) : (
                        <ul>
                            {ultimosMovimientos.map(mov => {
                                const meta = movMeta(mov.tipo_movimiento);

                                return (
                                    <li
                                        key={mov.id}
                                        onClick={() => mov.activo && router.visit(activosShow({ activo: mov.activo.id }).url)}
                                        className="flex items-center gap-3 py-3 border-b border-gray-100 last:border-0 cursor-pointer hover:bg-gray-50 -mx-4 px-4 transition-colors"
                                    >
                                        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${meta.bg}`}>
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
                                        </div>
                                        <span className="text-xs text-gray-400 shrink-0">
                                            {tiempoRelativo(mov.created_at)}
                                        </span>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
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

TecnicoScan.layout = null;
