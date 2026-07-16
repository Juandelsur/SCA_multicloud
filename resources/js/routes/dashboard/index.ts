import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see routes/web.php:135
* @route '/dashboard/otros'
*/
export const otros = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: otros.url(options),
    method: 'get',
})

otros.definition = {
    methods: ["get","head"],
    url: '/dashboard/otros',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:135
* @route '/dashboard/otros'
*/
otros.url = (options?: RouteQueryOptions) => {
    return otros.definition.url + queryParams(options)
}

/**
* @see routes/web.php:135
* @route '/dashboard/otros'
*/
otros.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: otros.url(options),
    method: 'get',
})

/**
* @see routes/web.php:135
* @route '/dashboard/otros'
*/
otros.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: otros.url(options),
    method: 'head',
})

/**
* @see routes/web.php:135
* @route '/dashboard/otros'
*/
const otrosForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: otros.url(options),
    method: 'get',
})

/**
* @see routes/web.php:135
* @route '/dashboard/otros'
*/
otrosForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: otros.url(options),
    method: 'get',
})

/**
* @see routes/web.php:135
* @route '/dashboard/otros'
*/
otrosForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: otros.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

otros.form = otrosForm

/**
* @see routes/web.php:227
* @route '/dashboard/gestion'
*/
export const gestion = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: gestion.url(options),
    method: 'get',
})

gestion.definition = {
    methods: ["get","head"],
    url: '/dashboard/gestion',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:227
* @route '/dashboard/gestion'
*/
gestion.url = (options?: RouteQueryOptions) => {
    return gestion.definition.url + queryParams(options)
}

/**
* @see routes/web.php:227
* @route '/dashboard/gestion'
*/
gestion.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: gestion.url(options),
    method: 'get',
})

/**
* @see routes/web.php:227
* @route '/dashboard/gestion'
*/
gestion.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: gestion.url(options),
    method: 'head',
})

/**
* @see routes/web.php:227
* @route '/dashboard/gestion'
*/
const gestionForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: gestion.url(options),
    method: 'get',
})

/**
* @see routes/web.php:227
* @route '/dashboard/gestion'
*/
gestionForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: gestion.url(options),
    method: 'get',
})

/**
* @see routes/web.php:227
* @route '/dashboard/gestion'
*/
gestionForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: gestion.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

gestion.form = gestionForm

const dashboard = {
    otros: Object.assign(otros, otros),
    gestion: Object.assign(gestion, gestion),
}

export default dashboard