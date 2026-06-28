import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see routes/web.php:65
* @route '/api/activos/buscar'
*/
export const buscar = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: buscar.url(options),
    method: 'get',
})

buscar.definition = {
    methods: ["get","head"],
    url: '/api/activos/buscar',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:65
* @route '/api/activos/buscar'
*/
buscar.url = (options?: RouteQueryOptions) => {
    return buscar.definition.url + queryParams(options)
}

/**
* @see routes/web.php:65
* @route '/api/activos/buscar'
*/
buscar.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: buscar.url(options),
    method: 'get',
})

/**
* @see routes/web.php:65
* @route '/api/activos/buscar'
*/
buscar.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: buscar.url(options),
    method: 'head',
})

/**
* @see routes/web.php:65
* @route '/api/activos/buscar'
*/
const buscarForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: buscar.url(options),
    method: 'get',
})

/**
* @see routes/web.php:65
* @route '/api/activos/buscar'
*/
buscarForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: buscar.url(options),
    method: 'get',
})

/**
* @see routes/web.php:65
* @route '/api/activos/buscar'
*/
buscarForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: buscar.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

buscar.form = buscarForm

const activos = {
    buscar: Object.assign(buscar, buscar),
}

export default activos