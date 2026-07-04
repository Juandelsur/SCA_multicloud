import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see routes/web.php:90
* @route '/activos/{activo}/movilizar'
*/
export const form = (args: { activo: number | { id: number } } | [activo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: form.url(args, options),
    method: 'get',
})

form.definition = {
    methods: ["get","head"],
    url: '/activos/{activo}/movilizar',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:90
* @route '/activos/{activo}/movilizar'
*/
form.url = (args: { activo: number | { id: number } } | [activo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { activo: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { activo: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            activo: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        activo: typeof args.activo === 'object'
        ? args.activo.id
        : args.activo,
    }

    return form.definition.url
            .replace('{activo}', parsedArgs.activo.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see routes/web.php:90
* @route '/activos/{activo}/movilizar'
*/
form.get = (args: { activo: number | { id: number } } | [activo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: form.url(args, options),
    method: 'get',
})

/**
* @see routes/web.php:90
* @route '/activos/{activo}/movilizar'
*/
form.head = (args: { activo: number | { id: number } } | [activo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: form.url(args, options),
    method: 'head',
})

/**
* @see routes/web.php:90
* @route '/activos/{activo}/movilizar'
*/
const formForm = (args: { activo: number | { id: number } } | [activo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: form.url(args, options),
    method: 'get',
})

/**
* @see routes/web.php:90
* @route '/activos/{activo}/movilizar'
*/
formForm.get = (args: { activo: number | { id: number } } | [activo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: form.url(args, options),
    method: 'get',
})

/**
* @see routes/web.php:90
* @route '/activos/{activo}/movilizar'
*/
formForm.head = (args: { activo: number | { id: number } } | [activo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: form.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

form.form = formForm
