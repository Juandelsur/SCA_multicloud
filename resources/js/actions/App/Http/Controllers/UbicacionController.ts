import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\UbicacionController::index
* @see app/Http/Controllers/UbicacionController.php:15
* @route '/ubicaciones'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/ubicaciones',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\UbicacionController::index
* @see app/Http/Controllers/UbicacionController.php:15
* @route '/ubicaciones'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\UbicacionController::index
* @see app/Http/Controllers/UbicacionController.php:15
* @route '/ubicaciones'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\UbicacionController::index
* @see app/Http/Controllers/UbicacionController.php:15
* @route '/ubicaciones'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\UbicacionController::index
* @see app/Http/Controllers/UbicacionController.php:15
* @route '/ubicaciones'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\UbicacionController::index
* @see app/Http/Controllers/UbicacionController.php:15
* @route '/ubicaciones'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\UbicacionController::index
* @see app/Http/Controllers/UbicacionController.php:15
* @route '/ubicaciones'
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
* @see \App\Http\Controllers\UbicacionController::create
* @see app/Http/Controllers/UbicacionController.php:22
* @route '/ubicaciones/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/ubicaciones/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\UbicacionController::create
* @see app/Http/Controllers/UbicacionController.php:22
* @route '/ubicaciones/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\UbicacionController::create
* @see app/Http/Controllers/UbicacionController.php:22
* @route '/ubicaciones/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\UbicacionController::create
* @see app/Http/Controllers/UbicacionController.php:22
* @route '/ubicaciones/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\UbicacionController::create
* @see app/Http/Controllers/UbicacionController.php:22
* @route '/ubicaciones/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\UbicacionController::create
* @see app/Http/Controllers/UbicacionController.php:22
* @route '/ubicaciones/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\UbicacionController::create
* @see app/Http/Controllers/UbicacionController.php:22
* @route '/ubicaciones/create'
*/
createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

create.form = createForm

/**
* @see \App\Http\Controllers\UbicacionController::store
* @see app/Http/Controllers/UbicacionController.php:29
* @route '/ubicaciones'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/ubicaciones',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\UbicacionController::store
* @see app/Http/Controllers/UbicacionController.php:29
* @route '/ubicaciones'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\UbicacionController::store
* @see app/Http/Controllers/UbicacionController.php:29
* @route '/ubicaciones'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\UbicacionController::store
* @see app/Http/Controllers/UbicacionController.php:29
* @route '/ubicaciones'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\UbicacionController::store
* @see app/Http/Controllers/UbicacionController.php:29
* @route '/ubicaciones'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\UbicacionController::show
* @see app/Http/Controllers/UbicacionController.php:37
* @route '/ubicaciones/{ubicacione}'
*/
export const show = (args: { ubicacione: string | number } | [ubicacione: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/ubicaciones/{ubicacione}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\UbicacionController::show
* @see app/Http/Controllers/UbicacionController.php:37
* @route '/ubicaciones/{ubicacione}'
*/
show.url = (args: { ubicacione: string | number } | [ubicacione: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { ubicacione: args }
    }

    if (Array.isArray(args)) {
        args = {
            ubicacione: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        ubicacione: args.ubicacione,
    }

    return show.definition.url
            .replace('{ubicacione}', parsedArgs.ubicacione.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\UbicacionController::show
* @see app/Http/Controllers/UbicacionController.php:37
* @route '/ubicaciones/{ubicacione}'
*/
show.get = (args: { ubicacione: string | number } | [ubicacione: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\UbicacionController::show
* @see app/Http/Controllers/UbicacionController.php:37
* @route '/ubicaciones/{ubicacione}'
*/
show.head = (args: { ubicacione: string | number } | [ubicacione: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\UbicacionController::show
* @see app/Http/Controllers/UbicacionController.php:37
* @route '/ubicaciones/{ubicacione}'
*/
const showForm = (args: { ubicacione: string | number } | [ubicacione: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\UbicacionController::show
* @see app/Http/Controllers/UbicacionController.php:37
* @route '/ubicaciones/{ubicacione}'
*/
showForm.get = (args: { ubicacione: string | number } | [ubicacione: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\UbicacionController::show
* @see app/Http/Controllers/UbicacionController.php:37
* @route '/ubicaciones/{ubicacione}'
*/
showForm.head = (args: { ubicacione: string | number } | [ubicacione: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

/**
* @see \App\Http\Controllers\UbicacionController::edit
* @see app/Http/Controllers/UbicacionController.php:44
* @route '/ubicaciones/{ubicacione}/edit'
*/
export const edit = (args: { ubicacione: string | number } | [ubicacione: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/ubicaciones/{ubicacione}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\UbicacionController::edit
* @see app/Http/Controllers/UbicacionController.php:44
* @route '/ubicaciones/{ubicacione}/edit'
*/
edit.url = (args: { ubicacione: string | number } | [ubicacione: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { ubicacione: args }
    }

    if (Array.isArray(args)) {
        args = {
            ubicacione: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        ubicacione: args.ubicacione,
    }

    return edit.definition.url
            .replace('{ubicacione}', parsedArgs.ubicacione.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\UbicacionController::edit
* @see app/Http/Controllers/UbicacionController.php:44
* @route '/ubicaciones/{ubicacione}/edit'
*/
edit.get = (args: { ubicacione: string | number } | [ubicacione: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\UbicacionController::edit
* @see app/Http/Controllers/UbicacionController.php:44
* @route '/ubicaciones/{ubicacione}/edit'
*/
edit.head = (args: { ubicacione: string | number } | [ubicacione: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\UbicacionController::edit
* @see app/Http/Controllers/UbicacionController.php:44
* @route '/ubicaciones/{ubicacione}/edit'
*/
const editForm = (args: { ubicacione: string | number } | [ubicacione: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\UbicacionController::edit
* @see app/Http/Controllers/UbicacionController.php:44
* @route '/ubicaciones/{ubicacione}/edit'
*/
editForm.get = (args: { ubicacione: string | number } | [ubicacione: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\UbicacionController::edit
* @see app/Http/Controllers/UbicacionController.php:44
* @route '/ubicaciones/{ubicacione}/edit'
*/
editForm.head = (args: { ubicacione: string | number } | [ubicacione: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

edit.form = editForm

/**
* @see \App\Http\Controllers\UbicacionController::update
* @see app/Http/Controllers/UbicacionController.php:52
* @route '/ubicaciones/{ubicacione}'
*/
export const update = (args: { ubicacione: string | number } | [ubicacione: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/ubicaciones/{ubicacione}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\UbicacionController::update
* @see app/Http/Controllers/UbicacionController.php:52
* @route '/ubicaciones/{ubicacione}'
*/
update.url = (args: { ubicacione: string | number } | [ubicacione: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { ubicacione: args }
    }

    if (Array.isArray(args)) {
        args = {
            ubicacione: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        ubicacione: args.ubicacione,
    }

    return update.definition.url
            .replace('{ubicacione}', parsedArgs.ubicacione.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\UbicacionController::update
* @see app/Http/Controllers/UbicacionController.php:52
* @route '/ubicaciones/{ubicacione}'
*/
update.put = (args: { ubicacione: string | number } | [ubicacione: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\UbicacionController::update
* @see app/Http/Controllers/UbicacionController.php:52
* @route '/ubicaciones/{ubicacione}'
*/
update.patch = (args: { ubicacione: string | number } | [ubicacione: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\UbicacionController::update
* @see app/Http/Controllers/UbicacionController.php:52
* @route '/ubicaciones/{ubicacione}'
*/
const updateForm = (args: { ubicacione: string | number } | [ubicacione: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\UbicacionController::update
* @see app/Http/Controllers/UbicacionController.php:52
* @route '/ubicaciones/{ubicacione}'
*/
updateForm.put = (args: { ubicacione: string | number } | [ubicacione: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\UbicacionController::update
* @see app/Http/Controllers/UbicacionController.php:52
* @route '/ubicaciones/{ubicacione}'
*/
updateForm.patch = (args: { ubicacione: string | number } | [ubicacione: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

/**
* @see \App\Http\Controllers\UbicacionController::destroy
* @see app/Http/Controllers/UbicacionController.php:60
* @route '/ubicaciones/{ubicacione}'
*/
export const destroy = (args: { ubicacione: string | number } | [ubicacione: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/ubicaciones/{ubicacione}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\UbicacionController::destroy
* @see app/Http/Controllers/UbicacionController.php:60
* @route '/ubicaciones/{ubicacione}'
*/
destroy.url = (args: { ubicacione: string | number } | [ubicacione: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { ubicacione: args }
    }

    if (Array.isArray(args)) {
        args = {
            ubicacione: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        ubicacione: args.ubicacione,
    }

    return destroy.definition.url
            .replace('{ubicacione}', parsedArgs.ubicacione.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\UbicacionController::destroy
* @see app/Http/Controllers/UbicacionController.php:60
* @route '/ubicaciones/{ubicacione}'
*/
destroy.delete = (args: { ubicacione: string | number } | [ubicacione: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\UbicacionController::destroy
* @see app/Http/Controllers/UbicacionController.php:60
* @route '/ubicaciones/{ubicacione}'
*/
const destroyForm = (args: { ubicacione: string | number } | [ubicacione: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\UbicacionController::destroy
* @see app/Http/Controllers/UbicacionController.php:60
* @route '/ubicaciones/{ubicacione}'
*/
destroyForm.delete = (args: { ubicacione: string | number } | [ubicacione: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const UbicacionController = { index, create, store, show, edit, update, destroy }

export default UbicacionController