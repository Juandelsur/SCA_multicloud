import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\AuditoriaController::index
* @see app/Http/Controllers/AuditoriaController.php:11
* @route '/auditoria'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/auditoria',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AuditoriaController::index
* @see app/Http/Controllers/AuditoriaController.php:11
* @route '/auditoria'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AuditoriaController::index
* @see app/Http/Controllers/AuditoriaController.php:11
* @route '/auditoria'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AuditoriaController::index
* @see app/Http/Controllers/AuditoriaController.php:11
* @route '/auditoria'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\AuditoriaController::index
* @see app/Http/Controllers/AuditoriaController.php:11
* @route '/auditoria'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AuditoriaController::index
* @see app/Http/Controllers/AuditoriaController.php:11
* @route '/auditoria'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AuditoriaController::index
* @see app/Http/Controllers/AuditoriaController.php:11
* @route '/auditoria'
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
* @see \App\Http\Controllers\AuditoriaController::show
* @see app/Http/Controllers/AuditoriaController.php:20
* @route '/auditoria/{auditoriaLog}'
*/
export const show = (args: { auditoriaLog: number | { id: number } } | [auditoriaLog: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/auditoria/{auditoriaLog}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AuditoriaController::show
* @see app/Http/Controllers/AuditoriaController.php:20
* @route '/auditoria/{auditoriaLog}'
*/
show.url = (args: { auditoriaLog: number | { id: number } } | [auditoriaLog: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { auditoriaLog: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { auditoriaLog: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            auditoriaLog: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        auditoriaLog: typeof args.auditoriaLog === 'object'
        ? args.auditoriaLog.id
        : args.auditoriaLog,
    }

    return show.definition.url
            .replace('{auditoriaLog}', parsedArgs.auditoriaLog.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AuditoriaController::show
* @see app/Http/Controllers/AuditoriaController.php:20
* @route '/auditoria/{auditoriaLog}'
*/
show.get = (args: { auditoriaLog: number | { id: number } } | [auditoriaLog: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AuditoriaController::show
* @see app/Http/Controllers/AuditoriaController.php:20
* @route '/auditoria/{auditoriaLog}'
*/
show.head = (args: { auditoriaLog: number | { id: number } } | [auditoriaLog: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\AuditoriaController::show
* @see app/Http/Controllers/AuditoriaController.php:20
* @route '/auditoria/{auditoriaLog}'
*/
const showForm = (args: { auditoriaLog: number | { id: number } } | [auditoriaLog: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AuditoriaController::show
* @see app/Http/Controllers/AuditoriaController.php:20
* @route '/auditoria/{auditoriaLog}'
*/
showForm.get = (args: { auditoriaLog: number | { id: number } } | [auditoriaLog: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AuditoriaController::show
* @see app/Http/Controllers/AuditoriaController.php:20
* @route '/auditoria/{auditoriaLog}'
*/
showForm.head = (args: { auditoriaLog: number | { id: number } } | [auditoriaLog: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

const AuditoriaController = { index, show }

export default AuditoriaController