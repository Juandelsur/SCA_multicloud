import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\TipoEquipoController::index
* @see app/Http/Controllers/TipoEquipoController.php:14
* @route '/tipos-equipo'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/tipos-equipo',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TipoEquipoController::index
* @see app/Http/Controllers/TipoEquipoController.php:14
* @route '/tipos-equipo'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TipoEquipoController::index
* @see app/Http/Controllers/TipoEquipoController.php:14
* @route '/tipos-equipo'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TipoEquipoController::index
* @see app/Http/Controllers/TipoEquipoController.php:14
* @route '/tipos-equipo'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\TipoEquipoController::index
* @see app/Http/Controllers/TipoEquipoController.php:14
* @route '/tipos-equipo'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TipoEquipoController::index
* @see app/Http/Controllers/TipoEquipoController.php:14
* @route '/tipos-equipo'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TipoEquipoController::index
* @see app/Http/Controllers/TipoEquipoController.php:14
* @route '/tipos-equipo'
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
* @see \App\Http\Controllers\TipoEquipoController::create
* @see app/Http/Controllers/TipoEquipoController.php:21
* @route '/tipos-equipo/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/tipos-equipo/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TipoEquipoController::create
* @see app/Http/Controllers/TipoEquipoController.php:21
* @route '/tipos-equipo/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TipoEquipoController::create
* @see app/Http/Controllers/TipoEquipoController.php:21
* @route '/tipos-equipo/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TipoEquipoController::create
* @see app/Http/Controllers/TipoEquipoController.php:21
* @route '/tipos-equipo/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\TipoEquipoController::create
* @see app/Http/Controllers/TipoEquipoController.php:21
* @route '/tipos-equipo/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TipoEquipoController::create
* @see app/Http/Controllers/TipoEquipoController.php:21
* @route '/tipos-equipo/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TipoEquipoController::create
* @see app/Http/Controllers/TipoEquipoController.php:21
* @route '/tipos-equipo/create'
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
* @see \App\Http\Controllers\TipoEquipoController::store
* @see app/Http/Controllers/TipoEquipoController.php:26
* @route '/tipos-equipo'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/tipos-equipo',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\TipoEquipoController::store
* @see app/Http/Controllers/TipoEquipoController.php:26
* @route '/tipos-equipo'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TipoEquipoController::store
* @see app/Http/Controllers/TipoEquipoController.php:26
* @route '/tipos-equipo'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TipoEquipoController::store
* @see app/Http/Controllers/TipoEquipoController.php:26
* @route '/tipos-equipo'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TipoEquipoController::store
* @see app/Http/Controllers/TipoEquipoController.php:26
* @route '/tipos-equipo'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\TipoEquipoController::show
* @see app/Http/Controllers/TipoEquipoController.php:34
* @route '/tipos-equipo/{tipos_equipo}'
*/
export const show = (args: { tipos_equipo: number | { id: number } } | [tipos_equipo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/tipos-equipo/{tipos_equipo}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TipoEquipoController::show
* @see app/Http/Controllers/TipoEquipoController.php:34
* @route '/tipos-equipo/{tipos_equipo}'
*/
show.url = (args: { tipos_equipo: number | { id: number } } | [tipos_equipo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { tipos_equipo: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { tipos_equipo: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            tipos_equipo: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        tipos_equipo: typeof args.tipos_equipo === 'object'
        ? args.tipos_equipo.id
        : args.tipos_equipo,
    }

    return show.definition.url
            .replace('{tipos_equipo}', parsedArgs.tipos_equipo.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TipoEquipoController::show
* @see app/Http/Controllers/TipoEquipoController.php:34
* @route '/tipos-equipo/{tipos_equipo}'
*/
show.get = (args: { tipos_equipo: number | { id: number } } | [tipos_equipo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TipoEquipoController::show
* @see app/Http/Controllers/TipoEquipoController.php:34
* @route '/tipos-equipo/{tipos_equipo}'
*/
show.head = (args: { tipos_equipo: number | { id: number } } | [tipos_equipo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\TipoEquipoController::show
* @see app/Http/Controllers/TipoEquipoController.php:34
* @route '/tipos-equipo/{tipos_equipo}'
*/
const showForm = (args: { tipos_equipo: number | { id: number } } | [tipos_equipo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TipoEquipoController::show
* @see app/Http/Controllers/TipoEquipoController.php:34
* @route '/tipos-equipo/{tipos_equipo}'
*/
showForm.get = (args: { tipos_equipo: number | { id: number } } | [tipos_equipo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TipoEquipoController::show
* @see app/Http/Controllers/TipoEquipoController.php:34
* @route '/tipos-equipo/{tipos_equipo}'
*/
showForm.head = (args: { tipos_equipo: number | { id: number } } | [tipos_equipo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\TipoEquipoController::edit
* @see app/Http/Controllers/TipoEquipoController.php:41
* @route '/tipos-equipo/{tipos_equipo}/edit'
*/
export const edit = (args: { tipos_equipo: number | { id: number } } | [tipos_equipo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/tipos-equipo/{tipos_equipo}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TipoEquipoController::edit
* @see app/Http/Controllers/TipoEquipoController.php:41
* @route '/tipos-equipo/{tipos_equipo}/edit'
*/
edit.url = (args: { tipos_equipo: number | { id: number } } | [tipos_equipo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { tipos_equipo: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { tipos_equipo: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            tipos_equipo: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        tipos_equipo: typeof args.tipos_equipo === 'object'
        ? args.tipos_equipo.id
        : args.tipos_equipo,
    }

    return edit.definition.url
            .replace('{tipos_equipo}', parsedArgs.tipos_equipo.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TipoEquipoController::edit
* @see app/Http/Controllers/TipoEquipoController.php:41
* @route '/tipos-equipo/{tipos_equipo}/edit'
*/
edit.get = (args: { tipos_equipo: number | { id: number } } | [tipos_equipo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TipoEquipoController::edit
* @see app/Http/Controllers/TipoEquipoController.php:41
* @route '/tipos-equipo/{tipos_equipo}/edit'
*/
edit.head = (args: { tipos_equipo: number | { id: number } } | [tipos_equipo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\TipoEquipoController::edit
* @see app/Http/Controllers/TipoEquipoController.php:41
* @route '/tipos-equipo/{tipos_equipo}/edit'
*/
const editForm = (args: { tipos_equipo: number | { id: number } } | [tipos_equipo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TipoEquipoController::edit
* @see app/Http/Controllers/TipoEquipoController.php:41
* @route '/tipos-equipo/{tipos_equipo}/edit'
*/
editForm.get = (args: { tipos_equipo: number | { id: number } } | [tipos_equipo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TipoEquipoController::edit
* @see app/Http/Controllers/TipoEquipoController.php:41
* @route '/tipos-equipo/{tipos_equipo}/edit'
*/
editForm.head = (args: { tipos_equipo: number | { id: number } } | [tipos_equipo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\TipoEquipoController::update
* @see app/Http/Controllers/TipoEquipoController.php:48
* @route '/tipos-equipo/{tipos_equipo}'
*/
export const update = (args: { tipos_equipo: number | { id: number } } | [tipos_equipo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/tipos-equipo/{tipos_equipo}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\TipoEquipoController::update
* @see app/Http/Controllers/TipoEquipoController.php:48
* @route '/tipos-equipo/{tipos_equipo}'
*/
update.url = (args: { tipos_equipo: number | { id: number } } | [tipos_equipo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { tipos_equipo: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { tipos_equipo: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            tipos_equipo: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        tipos_equipo: typeof args.tipos_equipo === 'object'
        ? args.tipos_equipo.id
        : args.tipos_equipo,
    }

    return update.definition.url
            .replace('{tipos_equipo}', parsedArgs.tipos_equipo.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TipoEquipoController::update
* @see app/Http/Controllers/TipoEquipoController.php:48
* @route '/tipos-equipo/{tipos_equipo}'
*/
update.put = (args: { tipos_equipo: number | { id: number } } | [tipos_equipo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\TipoEquipoController::update
* @see app/Http/Controllers/TipoEquipoController.php:48
* @route '/tipos-equipo/{tipos_equipo}'
*/
update.patch = (args: { tipos_equipo: number | { id: number } } | [tipos_equipo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\TipoEquipoController::update
* @see app/Http/Controllers/TipoEquipoController.php:48
* @route '/tipos-equipo/{tipos_equipo}'
*/
const updateForm = (args: { tipos_equipo: number | { id: number } } | [tipos_equipo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TipoEquipoController::update
* @see app/Http/Controllers/TipoEquipoController.php:48
* @route '/tipos-equipo/{tipos_equipo}'
*/
updateForm.put = (args: { tipos_equipo: number | { id: number } } | [tipos_equipo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TipoEquipoController::update
* @see app/Http/Controllers/TipoEquipoController.php:48
* @route '/tipos-equipo/{tipos_equipo}'
*/
updateForm.patch = (args: { tipos_equipo: number | { id: number } } | [tipos_equipo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\TipoEquipoController::destroy
* @see app/Http/Controllers/TipoEquipoController.php:56
* @route '/tipos-equipo/{tipos_equipo}'
*/
export const destroy = (args: { tipos_equipo: number | { id: number } } | [tipos_equipo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/tipos-equipo/{tipos_equipo}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\TipoEquipoController::destroy
* @see app/Http/Controllers/TipoEquipoController.php:56
* @route '/tipos-equipo/{tipos_equipo}'
*/
destroy.url = (args: { tipos_equipo: number | { id: number } } | [tipos_equipo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { tipos_equipo: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { tipos_equipo: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            tipos_equipo: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        tipos_equipo: typeof args.tipos_equipo === 'object'
        ? args.tipos_equipo.id
        : args.tipos_equipo,
    }

    return destroy.definition.url
            .replace('{tipos_equipo}', parsedArgs.tipos_equipo.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TipoEquipoController::destroy
* @see app/Http/Controllers/TipoEquipoController.php:56
* @route '/tipos-equipo/{tipos_equipo}'
*/
destroy.delete = (args: { tipos_equipo: number | { id: number } } | [tipos_equipo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\TipoEquipoController::destroy
* @see app/Http/Controllers/TipoEquipoController.php:56
* @route '/tipos-equipo/{tipos_equipo}'
*/
const destroyForm = (args: { tipos_equipo: number | { id: number } } | [tipos_equipo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TipoEquipoController::destroy
* @see app/Http/Controllers/TipoEquipoController.php:56
* @route '/tipos-equipo/{tipos_equipo}'
*/
destroyForm.delete = (args: { tipos_equipo: number | { id: number } } | [tipos_equipo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const TipoEquipoController = { index, create, store, show, edit, update, destroy }

export default TipoEquipoController