import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\EstadoActivoController::index
* @see app/Http/Controllers/EstadoActivoController.php:14
* @route '/estados-activo'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/estados-activo',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\EstadoActivoController::index
* @see app/Http/Controllers/EstadoActivoController.php:14
* @route '/estados-activo'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\EstadoActivoController::index
* @see app/Http/Controllers/EstadoActivoController.php:14
* @route '/estados-activo'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\EstadoActivoController::index
* @see app/Http/Controllers/EstadoActivoController.php:14
* @route '/estados-activo'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\EstadoActivoController::index
* @see app/Http/Controllers/EstadoActivoController.php:14
* @route '/estados-activo'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\EstadoActivoController::index
* @see app/Http/Controllers/EstadoActivoController.php:14
* @route '/estados-activo'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\EstadoActivoController::index
* @see app/Http/Controllers/EstadoActivoController.php:14
* @route '/estados-activo'
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
* @see \App\Http\Controllers\EstadoActivoController::create
* @see app/Http/Controllers/EstadoActivoController.php:21
* @route '/estados-activo/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/estados-activo/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\EstadoActivoController::create
* @see app/Http/Controllers/EstadoActivoController.php:21
* @route '/estados-activo/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\EstadoActivoController::create
* @see app/Http/Controllers/EstadoActivoController.php:21
* @route '/estados-activo/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\EstadoActivoController::create
* @see app/Http/Controllers/EstadoActivoController.php:21
* @route '/estados-activo/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\EstadoActivoController::create
* @see app/Http/Controllers/EstadoActivoController.php:21
* @route '/estados-activo/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\EstadoActivoController::create
* @see app/Http/Controllers/EstadoActivoController.php:21
* @route '/estados-activo/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\EstadoActivoController::create
* @see app/Http/Controllers/EstadoActivoController.php:21
* @route '/estados-activo/create'
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
* @see \App\Http\Controllers\EstadoActivoController::store
* @see app/Http/Controllers/EstadoActivoController.php:26
* @route '/estados-activo'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/estados-activo',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\EstadoActivoController::store
* @see app/Http/Controllers/EstadoActivoController.php:26
* @route '/estados-activo'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\EstadoActivoController::store
* @see app/Http/Controllers/EstadoActivoController.php:26
* @route '/estados-activo'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\EstadoActivoController::store
* @see app/Http/Controllers/EstadoActivoController.php:26
* @route '/estados-activo'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\EstadoActivoController::store
* @see app/Http/Controllers/EstadoActivoController.php:26
* @route '/estados-activo'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\EstadoActivoController::show
* @see app/Http/Controllers/EstadoActivoController.php:34
* @route '/estados-activo/{estados_activo}'
*/
export const show = (args: { estados_activo: number | { id: number } } | [estados_activo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/estados-activo/{estados_activo}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\EstadoActivoController::show
* @see app/Http/Controllers/EstadoActivoController.php:34
* @route '/estados-activo/{estados_activo}'
*/
show.url = (args: { estados_activo: number | { id: number } } | [estados_activo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { estados_activo: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { estados_activo: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            estados_activo: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        estados_activo: typeof args.estados_activo === 'object'
        ? args.estados_activo.id
        : args.estados_activo,
    }

    return show.definition.url
            .replace('{estados_activo}', parsedArgs.estados_activo.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\EstadoActivoController::show
* @see app/Http/Controllers/EstadoActivoController.php:34
* @route '/estados-activo/{estados_activo}'
*/
show.get = (args: { estados_activo: number | { id: number } } | [estados_activo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\EstadoActivoController::show
* @see app/Http/Controllers/EstadoActivoController.php:34
* @route '/estados-activo/{estados_activo}'
*/
show.head = (args: { estados_activo: number | { id: number } } | [estados_activo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\EstadoActivoController::show
* @see app/Http/Controllers/EstadoActivoController.php:34
* @route '/estados-activo/{estados_activo}'
*/
const showForm = (args: { estados_activo: number | { id: number } } | [estados_activo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\EstadoActivoController::show
* @see app/Http/Controllers/EstadoActivoController.php:34
* @route '/estados-activo/{estados_activo}'
*/
showForm.get = (args: { estados_activo: number | { id: number } } | [estados_activo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\EstadoActivoController::show
* @see app/Http/Controllers/EstadoActivoController.php:34
* @route '/estados-activo/{estados_activo}'
*/
showForm.head = (args: { estados_activo: number | { id: number } } | [estados_activo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\EstadoActivoController::edit
* @see app/Http/Controllers/EstadoActivoController.php:41
* @route '/estados-activo/{estados_activo}/edit'
*/
export const edit = (args: { estados_activo: number | { id: number } } | [estados_activo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/estados-activo/{estados_activo}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\EstadoActivoController::edit
* @see app/Http/Controllers/EstadoActivoController.php:41
* @route '/estados-activo/{estados_activo}/edit'
*/
edit.url = (args: { estados_activo: number | { id: number } } | [estados_activo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { estados_activo: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { estados_activo: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            estados_activo: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        estados_activo: typeof args.estados_activo === 'object'
        ? args.estados_activo.id
        : args.estados_activo,
    }

    return edit.definition.url
            .replace('{estados_activo}', parsedArgs.estados_activo.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\EstadoActivoController::edit
* @see app/Http/Controllers/EstadoActivoController.php:41
* @route '/estados-activo/{estados_activo}/edit'
*/
edit.get = (args: { estados_activo: number | { id: number } } | [estados_activo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\EstadoActivoController::edit
* @see app/Http/Controllers/EstadoActivoController.php:41
* @route '/estados-activo/{estados_activo}/edit'
*/
edit.head = (args: { estados_activo: number | { id: number } } | [estados_activo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\EstadoActivoController::edit
* @see app/Http/Controllers/EstadoActivoController.php:41
* @route '/estados-activo/{estados_activo}/edit'
*/
const editForm = (args: { estados_activo: number | { id: number } } | [estados_activo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\EstadoActivoController::edit
* @see app/Http/Controllers/EstadoActivoController.php:41
* @route '/estados-activo/{estados_activo}/edit'
*/
editForm.get = (args: { estados_activo: number | { id: number } } | [estados_activo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\EstadoActivoController::edit
* @see app/Http/Controllers/EstadoActivoController.php:41
* @route '/estados-activo/{estados_activo}/edit'
*/
editForm.head = (args: { estados_activo: number | { id: number } } | [estados_activo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\EstadoActivoController::update
* @see app/Http/Controllers/EstadoActivoController.php:48
* @route '/estados-activo/{estados_activo}'
*/
export const update = (args: { estados_activo: number | { id: number } } | [estados_activo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/estados-activo/{estados_activo}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\EstadoActivoController::update
* @see app/Http/Controllers/EstadoActivoController.php:48
* @route '/estados-activo/{estados_activo}'
*/
update.url = (args: { estados_activo: number | { id: number } } | [estados_activo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { estados_activo: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { estados_activo: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            estados_activo: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        estados_activo: typeof args.estados_activo === 'object'
        ? args.estados_activo.id
        : args.estados_activo,
    }

    return update.definition.url
            .replace('{estados_activo}', parsedArgs.estados_activo.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\EstadoActivoController::update
* @see app/Http/Controllers/EstadoActivoController.php:48
* @route '/estados-activo/{estados_activo}'
*/
update.put = (args: { estados_activo: number | { id: number } } | [estados_activo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\EstadoActivoController::update
* @see app/Http/Controllers/EstadoActivoController.php:48
* @route '/estados-activo/{estados_activo}'
*/
update.patch = (args: { estados_activo: number | { id: number } } | [estados_activo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\EstadoActivoController::update
* @see app/Http/Controllers/EstadoActivoController.php:48
* @route '/estados-activo/{estados_activo}'
*/
const updateForm = (args: { estados_activo: number | { id: number } } | [estados_activo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\EstadoActivoController::update
* @see app/Http/Controllers/EstadoActivoController.php:48
* @route '/estados-activo/{estados_activo}'
*/
updateForm.put = (args: { estados_activo: number | { id: number } } | [estados_activo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\EstadoActivoController::update
* @see app/Http/Controllers/EstadoActivoController.php:48
* @route '/estados-activo/{estados_activo}'
*/
updateForm.patch = (args: { estados_activo: number | { id: number } } | [estados_activo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\EstadoActivoController::destroy
* @see app/Http/Controllers/EstadoActivoController.php:56
* @route '/estados-activo/{estados_activo}'
*/
export const destroy = (args: { estados_activo: number | { id: number } } | [estados_activo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/estados-activo/{estados_activo}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\EstadoActivoController::destroy
* @see app/Http/Controllers/EstadoActivoController.php:56
* @route '/estados-activo/{estados_activo}'
*/
destroy.url = (args: { estados_activo: number | { id: number } } | [estados_activo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { estados_activo: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { estados_activo: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            estados_activo: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        estados_activo: typeof args.estados_activo === 'object'
        ? args.estados_activo.id
        : args.estados_activo,
    }

    return destroy.definition.url
            .replace('{estados_activo}', parsedArgs.estados_activo.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\EstadoActivoController::destroy
* @see app/Http/Controllers/EstadoActivoController.php:56
* @route '/estados-activo/{estados_activo}'
*/
destroy.delete = (args: { estados_activo: number | { id: number } } | [estados_activo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\EstadoActivoController::destroy
* @see app/Http/Controllers/EstadoActivoController.php:56
* @route '/estados-activo/{estados_activo}'
*/
const destroyForm = (args: { estados_activo: number | { id: number } } | [estados_activo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\EstadoActivoController::destroy
* @see app/Http/Controllers/EstadoActivoController.php:56
* @route '/estados-activo/{estados_activo}'
*/
destroyForm.delete = (args: { estados_activo: number | { id: number } } | [estados_activo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const estadosActivo = {
    index: Object.assign(index, index),
    create: Object.assign(create, create),
    store: Object.assign(store, store),
    show: Object.assign(show, show),
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default estadosActivo