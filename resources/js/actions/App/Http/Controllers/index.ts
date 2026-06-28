import ActivoController from './ActivoController'
import HistorialController from './HistorialController'
import AuditoriaController from './AuditoriaController'
import DepartamentoController from './DepartamentoController'
import UbicacionController from './UbicacionController'
import TipoEquipoController from './TipoEquipoController'
import EstadoActivoController from './EstadoActivoController'
import UsuarioController from './UsuarioController'
import Settings from './Settings'

const Controllers = {
    ActivoController: Object.assign(ActivoController, ActivoController),
    HistorialController: Object.assign(HistorialController, HistorialController),
    AuditoriaController: Object.assign(AuditoriaController, AuditoriaController),
    DepartamentoController: Object.assign(DepartamentoController, DepartamentoController),
    UbicacionController: Object.assign(UbicacionController, UbicacionController),
    TipoEquipoController: Object.assign(TipoEquipoController, TipoEquipoController),
    EstadoActivoController: Object.assign(EstadoActivoController, EstadoActivoController),
    UsuarioController: Object.assign(UsuarioController, UsuarioController),
    Settings: Object.assign(Settings, Settings),
}

export default Controllers