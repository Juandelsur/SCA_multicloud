import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see routes/web.php:291
* @route '/gestion/activos'
*/
export const activos = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: activos.url(options),
    method: 'get',
})

activos.definition = {
    methods: ["get","head"],
    url: '/gestion/activos',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:291
* @route '/gestion/activos'
*/
activos.url = (options?: RouteQueryOptions) => {
    return activos.definition.url + queryParams(options)
}

/**
* @see routes/web.php:291
* @route '/gestion/activos'
*/
activos.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: activos.url(options),
    method: 'get',
})

/**
* @see routes/web.php:291
* @route '/gestion/activos'
*/
activos.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: activos.url(options),
    method: 'head',
})

/**
* @see routes/web.php:291
* @route '/gestion/activos'
*/
const activosForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: activos.url(options),
    method: 'get',
})

/**
* @see routes/web.php:291
* @route '/gestion/activos'
*/
activosForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: activos.url(options),
    method: 'get',
})

/**
* @see routes/web.php:291
* @route '/gestion/activos'
*/
activosForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: activos.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

activos.form = activosForm

/**
* @see routes/web.php:368
* @route '/gestion/estados-activo'
*/
export const estadosActivo = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: estadosActivo.url(options),
    method: 'get',
})

estadosActivo.definition = {
    methods: ["get","head"],
    url: '/gestion/estados-activo',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:368
* @route '/gestion/estados-activo'
*/
estadosActivo.url = (options?: RouteQueryOptions) => {
    return estadosActivo.definition.url + queryParams(options)
}

/**
* @see routes/web.php:368
* @route '/gestion/estados-activo'
*/
estadosActivo.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: estadosActivo.url(options),
    method: 'get',
})

/**
* @see routes/web.php:368
* @route '/gestion/estados-activo'
*/
estadosActivo.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: estadosActivo.url(options),
    method: 'head',
})

/**
* @see routes/web.php:368
* @route '/gestion/estados-activo'
*/
const estadosActivoForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: estadosActivo.url(options),
    method: 'get',
})

/**
* @see routes/web.php:368
* @route '/gestion/estados-activo'
*/
estadosActivoForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: estadosActivo.url(options),
    method: 'get',
})

/**
* @see routes/web.php:368
* @route '/gestion/estados-activo'
*/
estadosActivoForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: estadosActivo.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

estadosActivo.form = estadosActivoForm

/**
* @see routes/web.php:369
* @route '/gestion/departamentos'
*/
export const departamentos = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: departamentos.url(options),
    method: 'get',
})

departamentos.definition = {
    methods: ["get","head"],
    url: '/gestion/departamentos',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:369
* @route '/gestion/departamentos'
*/
departamentos.url = (options?: RouteQueryOptions) => {
    return departamentos.definition.url + queryParams(options)
}

/**
* @see routes/web.php:369
* @route '/gestion/departamentos'
*/
departamentos.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: departamentos.url(options),
    method: 'get',
})

/**
* @see routes/web.php:369
* @route '/gestion/departamentos'
*/
departamentos.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: departamentos.url(options),
    method: 'head',
})

/**
* @see routes/web.php:369
* @route '/gestion/departamentos'
*/
const departamentosForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: departamentos.url(options),
    method: 'get',
})

/**
* @see routes/web.php:369
* @route '/gestion/departamentos'
*/
departamentosForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: departamentos.url(options),
    method: 'get',
})

/**
* @see routes/web.php:369
* @route '/gestion/departamentos'
*/
departamentosForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: departamentos.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

departamentos.form = departamentosForm

/**
* @see routes/web.php:370
* @route '/gestion/roles'
*/
export const roles = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: roles.url(options),
    method: 'get',
})

roles.definition = {
    methods: ["get","head"],
    url: '/gestion/roles',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:370
* @route '/gestion/roles'
*/
roles.url = (options?: RouteQueryOptions) => {
    return roles.definition.url + queryParams(options)
}

/**
* @see routes/web.php:370
* @route '/gestion/roles'
*/
roles.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: roles.url(options),
    method: 'get',
})

/**
* @see routes/web.php:370
* @route '/gestion/roles'
*/
roles.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: roles.url(options),
    method: 'head',
})

/**
* @see routes/web.php:370
* @route '/gestion/roles'
*/
const rolesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: roles.url(options),
    method: 'get',
})

/**
* @see routes/web.php:370
* @route '/gestion/roles'
*/
rolesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: roles.url(options),
    method: 'get',
})

/**
* @see routes/web.php:370
* @route '/gestion/roles'
*/
rolesForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: roles.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

roles.form = rolesForm

/**
* @see routes/web.php:371
* @route '/gestion/tipos-equipo'
*/
export const tiposEquipo = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: tiposEquipo.url(options),
    method: 'get',
})

tiposEquipo.definition = {
    methods: ["get","head"],
    url: '/gestion/tipos-equipo',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:371
* @route '/gestion/tipos-equipo'
*/
tiposEquipo.url = (options?: RouteQueryOptions) => {
    return tiposEquipo.definition.url + queryParams(options)
}

/**
* @see routes/web.php:371
* @route '/gestion/tipos-equipo'
*/
tiposEquipo.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: tiposEquipo.url(options),
    method: 'get',
})

/**
* @see routes/web.php:371
* @route '/gestion/tipos-equipo'
*/
tiposEquipo.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: tiposEquipo.url(options),
    method: 'head',
})

/**
* @see routes/web.php:371
* @route '/gestion/tipos-equipo'
*/
const tiposEquipoForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: tiposEquipo.url(options),
    method: 'get',
})

/**
* @see routes/web.php:371
* @route '/gestion/tipos-equipo'
*/
tiposEquipoForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: tiposEquipo.url(options),
    method: 'get',
})

/**
* @see routes/web.php:371
* @route '/gestion/tipos-equipo'
*/
tiposEquipoForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: tiposEquipo.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

tiposEquipo.form = tiposEquipoForm

/**
* @see routes/web.php:372
* @route '/gestion/ubicaciones'
*/
export const ubicaciones = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ubicaciones.url(options),
    method: 'get',
})

ubicaciones.definition = {
    methods: ["get","head"],
    url: '/gestion/ubicaciones',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:372
* @route '/gestion/ubicaciones'
*/
ubicaciones.url = (options?: RouteQueryOptions) => {
    return ubicaciones.definition.url + queryParams(options)
}

/**
* @see routes/web.php:372
* @route '/gestion/ubicaciones'
*/
ubicaciones.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ubicaciones.url(options),
    method: 'get',
})

/**
* @see routes/web.php:372
* @route '/gestion/ubicaciones'
*/
ubicaciones.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ubicaciones.url(options),
    method: 'head',
})

/**
* @see routes/web.php:372
* @route '/gestion/ubicaciones'
*/
const ubicacionesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: ubicaciones.url(options),
    method: 'get',
})

/**
* @see routes/web.php:372
* @route '/gestion/ubicaciones'
*/
ubicacionesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: ubicaciones.url(options),
    method: 'get',
})

/**
* @see routes/web.php:372
* @route '/gestion/ubicaciones'
*/
ubicacionesForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: ubicaciones.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

ubicaciones.form = ubicacionesForm

/**
* @see routes/web.php:373
* @route '/gestion/usuarios'
*/
export const usuarios = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: usuarios.url(options),
    method: 'get',
})

usuarios.definition = {
    methods: ["get","head"],
    url: '/gestion/usuarios',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:373
* @route '/gestion/usuarios'
*/
usuarios.url = (options?: RouteQueryOptions) => {
    return usuarios.definition.url + queryParams(options)
}

/**
* @see routes/web.php:373
* @route '/gestion/usuarios'
*/
usuarios.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: usuarios.url(options),
    method: 'get',
})

/**
* @see routes/web.php:373
* @route '/gestion/usuarios'
*/
usuarios.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: usuarios.url(options),
    method: 'head',
})

/**
* @see routes/web.php:373
* @route '/gestion/usuarios'
*/
const usuariosForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: usuarios.url(options),
    method: 'get',
})

/**
* @see routes/web.php:373
* @route '/gestion/usuarios'
*/
usuariosForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: usuarios.url(options),
    method: 'get',
})

/**
* @see routes/web.php:373
* @route '/gestion/usuarios'
*/
usuariosForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: usuarios.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

usuarios.form = usuariosForm

const gestion = {
    activos: Object.assign(activos, activos),
    estadosActivo: Object.assign(estadosActivo, estadosActivo),
    departamentos: Object.assign(departamentos, departamentos),
    roles: Object.assign(roles, roles),
    tiposEquipo: Object.assign(tiposEquipo, tiposEquipo),
    ubicaciones: Object.assign(ubicaciones, ubicaciones),
    usuarios: Object.assign(usuarios, usuarios),
}

export default gestion