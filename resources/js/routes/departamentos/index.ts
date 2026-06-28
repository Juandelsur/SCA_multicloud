import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\DepartamentoController::index
* @see app/Http/Controllers/DepartamentoController.php:14
* @route '/departamentos'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/departamentos',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DepartamentoController::index
* @see app/Http/Controllers/DepartamentoController.php:14
* @route '/departamentos'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DepartamentoController::index
* @see app/Http/Controllers/DepartamentoController.php:14
* @route '/departamentos'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DepartamentoController::index
* @see app/Http/Controllers/DepartamentoController.php:14
* @route '/departamentos'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DepartamentoController::index
* @see app/Http/Controllers/DepartamentoController.php:14
* @route '/departamentos'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DepartamentoController::index
* @see app/Http/Controllers/DepartamentoController.php:14
* @route '/departamentos'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DepartamentoController::index
* @see app/Http/Controllers/DepartamentoController.php:14
* @route '/departamentos'
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
* @see \App\Http\Controllers\DepartamentoController::create
* @see app/Http/Controllers/DepartamentoController.php:21
* @route '/departamentos/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/departamentos/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DepartamentoController::create
* @see app/Http/Controllers/DepartamentoController.php:21
* @route '/departamentos/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DepartamentoController::create
* @see app/Http/Controllers/DepartamentoController.php:21
* @route '/departamentos/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DepartamentoController::create
* @see app/Http/Controllers/DepartamentoController.php:21
* @route '/departamentos/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DepartamentoController::create
* @see app/Http/Controllers/DepartamentoController.php:21
* @route '/departamentos/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DepartamentoController::create
* @see app/Http/Controllers/DepartamentoController.php:21
* @route '/departamentos/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DepartamentoController::create
* @see app/Http/Controllers/DepartamentoController.php:21
* @route '/departamentos/create'
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
* @see \App\Http\Controllers\DepartamentoController::store
* @see app/Http/Controllers/DepartamentoController.php:26
* @route '/departamentos'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/departamentos',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\DepartamentoController::store
* @see app/Http/Controllers/DepartamentoController.php:26
* @route '/departamentos'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DepartamentoController::store
* @see app/Http/Controllers/DepartamentoController.php:26
* @route '/departamentos'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DepartamentoController::store
* @see app/Http/Controllers/DepartamentoController.php:26
* @route '/departamentos'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DepartamentoController::store
* @see app/Http/Controllers/DepartamentoController.php:26
* @route '/departamentos'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\DepartamentoController::show
* @see app/Http/Controllers/DepartamentoController.php:34
* @route '/departamentos/{departamento}'
*/
export const show = (args: { departamento: number | { id: number } } | [departamento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/departamentos/{departamento}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DepartamentoController::show
* @see app/Http/Controllers/DepartamentoController.php:34
* @route '/departamentos/{departamento}'
*/
show.url = (args: { departamento: number | { id: number } } | [departamento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { departamento: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { departamento: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            departamento: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        departamento: typeof args.departamento === 'object'
        ? args.departamento.id
        : args.departamento,
    }

    return show.definition.url
            .replace('{departamento}', parsedArgs.departamento.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DepartamentoController::show
* @see app/Http/Controllers/DepartamentoController.php:34
* @route '/departamentos/{departamento}'
*/
show.get = (args: { departamento: number | { id: number } } | [departamento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DepartamentoController::show
* @see app/Http/Controllers/DepartamentoController.php:34
* @route '/departamentos/{departamento}'
*/
show.head = (args: { departamento: number | { id: number } } | [departamento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DepartamentoController::show
* @see app/Http/Controllers/DepartamentoController.php:34
* @route '/departamentos/{departamento}'
*/
const showForm = (args: { departamento: number | { id: number } } | [departamento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DepartamentoController::show
* @see app/Http/Controllers/DepartamentoController.php:34
* @route '/departamentos/{departamento}'
*/
showForm.get = (args: { departamento: number | { id: number } } | [departamento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DepartamentoController::show
* @see app/Http/Controllers/DepartamentoController.php:34
* @route '/departamentos/{departamento}'
*/
showForm.head = (args: { departamento: number | { id: number } } | [departamento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\DepartamentoController::edit
* @see app/Http/Controllers/DepartamentoController.php:41
* @route '/departamentos/{departamento}/edit'
*/
export const edit = (args: { departamento: number | { id: number } } | [departamento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/departamentos/{departamento}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DepartamentoController::edit
* @see app/Http/Controllers/DepartamentoController.php:41
* @route '/departamentos/{departamento}/edit'
*/
edit.url = (args: { departamento: number | { id: number } } | [departamento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { departamento: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { departamento: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            departamento: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        departamento: typeof args.departamento === 'object'
        ? args.departamento.id
        : args.departamento,
    }

    return edit.definition.url
            .replace('{departamento}', parsedArgs.departamento.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DepartamentoController::edit
* @see app/Http/Controllers/DepartamentoController.php:41
* @route '/departamentos/{departamento}/edit'
*/
edit.get = (args: { departamento: number | { id: number } } | [departamento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DepartamentoController::edit
* @see app/Http/Controllers/DepartamentoController.php:41
* @route '/departamentos/{departamento}/edit'
*/
edit.head = (args: { departamento: number | { id: number } } | [departamento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DepartamentoController::edit
* @see app/Http/Controllers/DepartamentoController.php:41
* @route '/departamentos/{departamento}/edit'
*/
const editForm = (args: { departamento: number | { id: number } } | [departamento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DepartamentoController::edit
* @see app/Http/Controllers/DepartamentoController.php:41
* @route '/departamentos/{departamento}/edit'
*/
editForm.get = (args: { departamento: number | { id: number } } | [departamento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DepartamentoController::edit
* @see app/Http/Controllers/DepartamentoController.php:41
* @route '/departamentos/{departamento}/edit'
*/
editForm.head = (args: { departamento: number | { id: number } } | [departamento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\DepartamentoController::update
* @see app/Http/Controllers/DepartamentoController.php:48
* @route '/departamentos/{departamento}'
*/
export const update = (args: { departamento: number | { id: number } } | [departamento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/departamentos/{departamento}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\DepartamentoController::update
* @see app/Http/Controllers/DepartamentoController.php:48
* @route '/departamentos/{departamento}'
*/
update.url = (args: { departamento: number | { id: number } } | [departamento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { departamento: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { departamento: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            departamento: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        departamento: typeof args.departamento === 'object'
        ? args.departamento.id
        : args.departamento,
    }

    return update.definition.url
            .replace('{departamento}', parsedArgs.departamento.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DepartamentoController::update
* @see app/Http/Controllers/DepartamentoController.php:48
* @route '/departamentos/{departamento}'
*/
update.put = (args: { departamento: number | { id: number } } | [departamento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\DepartamentoController::update
* @see app/Http/Controllers/DepartamentoController.php:48
* @route '/departamentos/{departamento}'
*/
update.patch = (args: { departamento: number | { id: number } } | [departamento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\DepartamentoController::update
* @see app/Http/Controllers/DepartamentoController.php:48
* @route '/departamentos/{departamento}'
*/
const updateForm = (args: { departamento: number | { id: number } } | [departamento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DepartamentoController::update
* @see app/Http/Controllers/DepartamentoController.php:48
* @route '/departamentos/{departamento}'
*/
updateForm.put = (args: { departamento: number | { id: number } } | [departamento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DepartamentoController::update
* @see app/Http/Controllers/DepartamentoController.php:48
* @route '/departamentos/{departamento}'
*/
updateForm.patch = (args: { departamento: number | { id: number } } | [departamento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\DepartamentoController::destroy
* @see app/Http/Controllers/DepartamentoController.php:56
* @route '/departamentos/{departamento}'
*/
export const destroy = (args: { departamento: number | { id: number } } | [departamento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/departamentos/{departamento}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\DepartamentoController::destroy
* @see app/Http/Controllers/DepartamentoController.php:56
* @route '/departamentos/{departamento}'
*/
destroy.url = (args: { departamento: number | { id: number } } | [departamento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { departamento: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { departamento: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            departamento: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        departamento: typeof args.departamento === 'object'
        ? args.departamento.id
        : args.departamento,
    }

    return destroy.definition.url
            .replace('{departamento}', parsedArgs.departamento.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DepartamentoController::destroy
* @see app/Http/Controllers/DepartamentoController.php:56
* @route '/departamentos/{departamento}'
*/
destroy.delete = (args: { departamento: number | { id: number } } | [departamento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\DepartamentoController::destroy
* @see app/Http/Controllers/DepartamentoController.php:56
* @route '/departamentos/{departamento}'
*/
const destroyForm = (args: { departamento: number | { id: number } } | [departamento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DepartamentoController::destroy
* @see app/Http/Controllers/DepartamentoController.php:56
* @route '/departamentos/{departamento}'
*/
destroyForm.delete = (args: { departamento: number | { id: number } } | [departamento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const departamentos = {
    index: Object.assign(index, index),
    create: Object.assign(create, create),
    store: Object.assign(store, store),
    show: Object.assign(show, show),
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default departamentos