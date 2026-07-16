import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see routes/web.php:438
* @route '/jefe'
*/
export const home = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: home.url(options),
    method: 'get',
})

home.definition = {
    methods: ["get","head"],
    url: '/jefe',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:438
* @route '/jefe'
*/
home.url = (options?: RouteQueryOptions) => {
    return home.definition.url + queryParams(options)
}

/**
* @see routes/web.php:438
* @route '/jefe'
*/
home.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: home.url(options),
    method: 'get',
})

/**
* @see routes/web.php:438
* @route '/jefe'
*/
home.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: home.url(options),
    method: 'head',
})

/**
* @see routes/web.php:438
* @route '/jefe'
*/
const homeForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: home.url(options),
    method: 'get',
})

/**
* @see routes/web.php:438
* @route '/jefe'
*/
homeForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: home.url(options),
    method: 'get',
})

/**
* @see routes/web.php:438
* @route '/jefe'
*/
homeForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: home.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

home.form = homeForm

const jefe = {
    home: Object.assign(home, home),
}

export default jefe