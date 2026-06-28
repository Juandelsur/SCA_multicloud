import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\HistorialController::index
* @see app/Http/Controllers/HistorialController.php:11
* @route '/historial'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/historial',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\HistorialController::index
* @see app/Http/Controllers/HistorialController.php:11
* @route '/historial'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\HistorialController::index
* @see app/Http/Controllers/HistorialController.php:11
* @route '/historial'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\HistorialController::index
* @see app/Http/Controllers/HistorialController.php:11
* @route '/historial'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\HistorialController::index
* @see app/Http/Controllers/HistorialController.php:11
* @route '/historial'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\HistorialController::index
* @see app/Http/Controllers/HistorialController.php:11
* @route '/historial'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\HistorialController::index
* @see app/Http/Controllers/HistorialController.php:11
* @route '/historial'
*/
indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index.form = indexForm

/**
* @see \App\Http\Controllers\HistorialController::show
* @see app/Http/Controllers/HistorialController.php:25
* @route '/historial/{historialMovimiento}'
*/
export const show = (args: { historialMovimiento: number | { id: number } } | [historialMovimiento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/historial/{historialMovimiento}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\HistorialController::show
* @see app/Http/Controllers/HistorialController.php:25
* @route '/historial/{historialMovimiento}'
*/
show.url = (args: { historialMovimiento: number | { id: number } } | [historialMovimiento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { historialMovimiento: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { historialMovimiento: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            historialMovimiento: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        historialMovimiento: typeof args.historialMovimiento === 'object'
        ? args.historialMovimiento.id
        : args.historialMovimiento,
    }

    return show.definition.url
            .replace('{historialMovimiento}', parsedArgs.historialMovimiento.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\HistorialController::show
* @see app/Http/Controllers/HistorialController.php:25
* @route '/historial/{historialMovimiento}'
*/
show.get = (args: { historialMovimiento: number | { id: number } } | [historialMovimiento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\HistorialController::show
* @see app/Http/Controllers/HistorialController.php:25
* @route '/historial/{historialMovimiento}'
*/
show.head = (args: { historialMovimiento: number | { id: number } } | [historialMovimiento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\HistorialController::show
* @see app/Http/Controllers/HistorialController.php:25
* @route '/historial/{historialMovimiento}'
*/
const showForm = (args: { historialMovimiento: number | { id: number } } | [historialMovimiento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\HistorialController::show
* @see app/Http/Controllers/HistorialController.php:25
* @route '/historial/{historialMovimiento}'
*/
showForm.get = (args: { historialMovimiento: number | { id: number } } | [historialMovimiento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\HistorialController::show
* @see app/Http/Controllers/HistorialController.php:25
* @route '/historial/{historialMovimiento}'
*/
showForm.head = (args: { historialMovimiento: number | { id: number } } | [historialMovimiento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

const HistorialController = { index, show }

export default HistorialController