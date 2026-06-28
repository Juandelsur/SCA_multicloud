import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ActivoController::index
* @see app/Http/Controllers/ActivoController.php:30
* @route '/activos'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/activos',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ActivoController::index
* @see app/Http/Controllers/ActivoController.php:30
* @route '/activos'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ActivoController::index
* @see app/Http/Controllers/ActivoController.php:30
* @route '/activos'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ActivoController::index
* @see app/Http/Controllers/ActivoController.php:30
* @route '/activos'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ActivoController::index
* @see app/Http/Controllers/ActivoController.php:30
* @route '/activos'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ActivoController::index
* @see app/Http/Controllers/ActivoController.php:30
* @route '/activos'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ActivoController::index
* @see app/Http/Controllers/ActivoController.php:30
* @route '/activos'
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
* @see \App\Http\Controllers\ActivoController::create
* @see app/Http/Controllers/ActivoController.php:41
* @route '/activos/crear'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/activos/crear',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ActivoController::create
* @see app/Http/Controllers/ActivoController.php:41
* @route '/activos/crear'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ActivoController::create
* @see app/Http/Controllers/ActivoController.php:41
* @route '/activos/crear'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ActivoController::create
* @see app/Http/Controllers/ActivoController.php:41
* @route '/activos/crear'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ActivoController::create
* @see app/Http/Controllers/ActivoController.php:41
* @route '/activos/crear'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ActivoController::create
* @see app/Http/Controllers/ActivoController.php:41
* @route '/activos/crear'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ActivoController::create
* @see app/Http/Controllers/ActivoController.php:41
* @route '/activos/crear'
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
* @see \App\Http\Controllers\ActivoController::store
* @see app/Http/Controllers/ActivoController.php:52
* @route '/activos'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/activos',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ActivoController::store
* @see app/Http/Controllers/ActivoController.php:52
* @route '/activos'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ActivoController::store
* @see app/Http/Controllers/ActivoController.php:52
* @route '/activos'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ActivoController::store
* @see app/Http/Controllers/ActivoController.php:52
* @route '/activos'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ActivoController::store
* @see app/Http/Controllers/ActivoController.php:52
* @route '/activos'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\ActivoController::etiquetas
* @see app/Http/Controllers/ActivoController.php:187
* @route '/activos/etiquetas'
*/
export const etiquetas = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: etiquetas.url(options),
    method: 'get',
})

etiquetas.definition = {
    methods: ["get","head"],
    url: '/activos/etiquetas',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ActivoController::etiquetas
* @see app/Http/Controllers/ActivoController.php:187
* @route '/activos/etiquetas'
*/
etiquetas.url = (options?: RouteQueryOptions) => {
    return etiquetas.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ActivoController::etiquetas
* @see app/Http/Controllers/ActivoController.php:187
* @route '/activos/etiquetas'
*/
etiquetas.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: etiquetas.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ActivoController::etiquetas
* @see app/Http/Controllers/ActivoController.php:187
* @route '/activos/etiquetas'
*/
etiquetas.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: etiquetas.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ActivoController::etiquetas
* @see app/Http/Controllers/ActivoController.php:187
* @route '/activos/etiquetas'
*/
const etiquetasForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: etiquetas.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ActivoController::etiquetas
* @see app/Http/Controllers/ActivoController.php:187
* @route '/activos/etiquetas'
*/
etiquetasForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: etiquetas.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ActivoController::etiquetas
* @see app/Http/Controllers/ActivoController.php:187
* @route '/activos/etiquetas'
*/
etiquetasForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: etiquetas.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

etiquetas.form = etiquetasForm

/**
* @see \App\Http\Controllers\ActivoController::etiquetasPdf
* @see app/Http/Controllers/ActivoController.php:204
* @route '/activos/etiquetas/pdf'
*/
export const etiquetasPdf = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: etiquetasPdf.url(options),
    method: 'post',
})

etiquetasPdf.definition = {
    methods: ["post"],
    url: '/activos/etiquetas/pdf',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ActivoController::etiquetasPdf
* @see app/Http/Controllers/ActivoController.php:204
* @route '/activos/etiquetas/pdf'
*/
etiquetasPdf.url = (options?: RouteQueryOptions) => {
    return etiquetasPdf.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ActivoController::etiquetasPdf
* @see app/Http/Controllers/ActivoController.php:204
* @route '/activos/etiquetas/pdf'
*/
etiquetasPdf.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: etiquetasPdf.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ActivoController::etiquetasPdf
* @see app/Http/Controllers/ActivoController.php:204
* @route '/activos/etiquetas/pdf'
*/
const etiquetasPdfForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: etiquetasPdf.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ActivoController::etiquetasPdf
* @see app/Http/Controllers/ActivoController.php:204
* @route '/activos/etiquetas/pdf'
*/
etiquetasPdfForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: etiquetasPdf.url(options),
    method: 'post',
})

etiquetasPdf.form = etiquetasPdfForm

/**
* @see \App\Http\Controllers\ActivoController::show
* @see app/Http/Controllers/ActivoController.php:73
* @route '/activos/{activo}'
*/
export const show = (args: { activo: number | { id: number } } | [activo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/activos/{activo}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ActivoController::show
* @see app/Http/Controllers/ActivoController.php:73
* @route '/activos/{activo}'
*/
show.url = (args: { activo: number | { id: number } } | [activo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return show.definition.url
            .replace('{activo}', parsedArgs.activo.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ActivoController::show
* @see app/Http/Controllers/ActivoController.php:73
* @route '/activos/{activo}'
*/
show.get = (args: { activo: number | { id: number } } | [activo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ActivoController::show
* @see app/Http/Controllers/ActivoController.php:73
* @route '/activos/{activo}'
*/
show.head = (args: { activo: number | { id: number } } | [activo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ActivoController::show
* @see app/Http/Controllers/ActivoController.php:73
* @route '/activos/{activo}'
*/
const showForm = (args: { activo: number | { id: number } } | [activo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ActivoController::show
* @see app/Http/Controllers/ActivoController.php:73
* @route '/activos/{activo}'
*/
showForm.get = (args: { activo: number | { id: number } } | [activo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ActivoController::show
* @see app/Http/Controllers/ActivoController.php:73
* @route '/activos/{activo}'
*/
showForm.head = (args: { activo: number | { id: number } } | [activo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\ActivoController::edit
* @see app/Http/Controllers/ActivoController.php:94
* @route '/activos/{activo}/editar'
*/
export const edit = (args: { activo: number | { id: number } } | [activo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/activos/{activo}/editar',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ActivoController::edit
* @see app/Http/Controllers/ActivoController.php:94
* @route '/activos/{activo}/editar'
*/
edit.url = (args: { activo: number | { id: number } } | [activo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return edit.definition.url
            .replace('{activo}', parsedArgs.activo.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ActivoController::edit
* @see app/Http/Controllers/ActivoController.php:94
* @route '/activos/{activo}/editar'
*/
edit.get = (args: { activo: number | { id: number } } | [activo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ActivoController::edit
* @see app/Http/Controllers/ActivoController.php:94
* @route '/activos/{activo}/editar'
*/
edit.head = (args: { activo: number | { id: number } } | [activo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ActivoController::edit
* @see app/Http/Controllers/ActivoController.php:94
* @route '/activos/{activo}/editar'
*/
const editForm = (args: { activo: number | { id: number } } | [activo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ActivoController::edit
* @see app/Http/Controllers/ActivoController.php:94
* @route '/activos/{activo}/editar'
*/
editForm.get = (args: { activo: number | { id: number } } | [activo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ActivoController::edit
* @see app/Http/Controllers/ActivoController.php:94
* @route '/activos/{activo}/editar'
*/
editForm.head = (args: { activo: number | { id: number } } | [activo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\ActivoController::update
* @see app/Http/Controllers/ActivoController.php:106
* @route '/activos/{activo}'
*/
const update1a48873612817b5b1957efecfce8a355 = (args: { activo: number | { id: number } } | [activo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update1a48873612817b5b1957efecfce8a355.url(args, options),
    method: 'put',
})

update1a48873612817b5b1957efecfce8a355.definition = {
    methods: ["put"],
    url: '/activos/{activo}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\ActivoController::update
* @see app/Http/Controllers/ActivoController.php:106
* @route '/activos/{activo}'
*/
update1a48873612817b5b1957efecfce8a355.url = (args: { activo: number | { id: number } } | [activo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return update1a48873612817b5b1957efecfce8a355.definition.url
            .replace('{activo}', parsedArgs.activo.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ActivoController::update
* @see app/Http/Controllers/ActivoController.php:106
* @route '/activos/{activo}'
*/
update1a48873612817b5b1957efecfce8a355.put = (args: { activo: number | { id: number } } | [activo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update1a48873612817b5b1957efecfce8a355.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\ActivoController::update
* @see app/Http/Controllers/ActivoController.php:106
* @route '/activos/{activo}'
*/
const update1a48873612817b5b1957efecfce8a355Form = (args: { activo: number | { id: number } } | [activo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update1a48873612817b5b1957efecfce8a355.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ActivoController::update
* @see app/Http/Controllers/ActivoController.php:106
* @route '/activos/{activo}'
*/
update1a48873612817b5b1957efecfce8a355Form.put = (args: { activo: number | { id: number } } | [activo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update1a48873612817b5b1957efecfce8a355.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update1a48873612817b5b1957efecfce8a355.form = update1a48873612817b5b1957efecfce8a355Form
/**
* @see \App\Http\Controllers\ActivoController::update
* @see app/Http/Controllers/ActivoController.php:106
* @route '/activos/{activo}'
*/
const update1a48873612817b5b1957efecfce8a355 = (args: { activo: number | { id: number } } | [activo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update1a48873612817b5b1957efecfce8a355.url(args, options),
    method: 'patch',
})

update1a48873612817b5b1957efecfce8a355.definition = {
    methods: ["patch"],
    url: '/activos/{activo}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\ActivoController::update
* @see app/Http/Controllers/ActivoController.php:106
* @route '/activos/{activo}'
*/
update1a48873612817b5b1957efecfce8a355.url = (args: { activo: number | { id: number } } | [activo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return update1a48873612817b5b1957efecfce8a355.definition.url
            .replace('{activo}', parsedArgs.activo.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ActivoController::update
* @see app/Http/Controllers/ActivoController.php:106
* @route '/activos/{activo}'
*/
update1a48873612817b5b1957efecfce8a355.patch = (args: { activo: number | { id: number } } | [activo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update1a48873612817b5b1957efecfce8a355.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\ActivoController::update
* @see app/Http/Controllers/ActivoController.php:106
* @route '/activos/{activo}'
*/
const update1a48873612817b5b1957efecfce8a355Form = (args: { activo: number | { id: number } } | [activo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update1a48873612817b5b1957efecfce8a355.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ActivoController::update
* @see app/Http/Controllers/ActivoController.php:106
* @route '/activos/{activo}'
*/
update1a48873612817b5b1957efecfce8a355Form.patch = (args: { activo: number | { id: number } } | [activo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update1a48873612817b5b1957efecfce8a355.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update1a48873612817b5b1957efecfce8a355.form = update1a48873612817b5b1957efecfce8a355Form

/**
* Multiple routes resolve to \App\Http\Controllers\ActivoController::update, so this export is a
* dictionary keyed by URI rather than a callable. Call a specific route with `update['<uri>'](...)`,
* or import the route by name from your generated `routes/` directory.
*/
export const update = {
    '/activos/{activo}': update1a48873612817b5b1957efecfce8a355,
    '/activos/{activo}': update1a48873612817b5b1957efecfce8a355,
}

/**
* @see \App\Http\Controllers\ActivoController::destroy
* @see app/Http/Controllers/ActivoController.php:131
* @route '/activos/{activo}'
*/
export const destroy = (args: { activo: number | { id: number } } | [activo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/activos/{activo}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\ActivoController::destroy
* @see app/Http/Controllers/ActivoController.php:131
* @route '/activos/{activo}'
*/
destroy.url = (args: { activo: number | { id: number } } | [activo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return destroy.definition.url
            .replace('{activo}', parsedArgs.activo.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ActivoController::destroy
* @see app/Http/Controllers/ActivoController.php:131
* @route '/activos/{activo}'
*/
destroy.delete = (args: { activo: number | { id: number } } | [activo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\ActivoController::destroy
* @see app/Http/Controllers/ActivoController.php:131
* @route '/activos/{activo}'
*/
const destroyForm = (args: { activo: number | { id: number } } | [activo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ActivoController::destroy
* @see app/Http/Controllers/ActivoController.php:131
* @route '/activos/{activo}'
*/
destroyForm.delete = (args: { activo: number | { id: number } } | [activo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

/**
* @see \App\Http\Controllers\ActivoController::movilizar
* @see app/Http/Controllers/ActivoController.php:152
* @route '/activos/{activo}/movilizar'
*/
export const movilizar = (args: { activo: number | { id: number } } | [activo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: movilizar.url(args, options),
    method: 'post',
})

movilizar.definition = {
    methods: ["post"],
    url: '/activos/{activo}/movilizar',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ActivoController::movilizar
* @see app/Http/Controllers/ActivoController.php:152
* @route '/activos/{activo}/movilizar'
*/
movilizar.url = (args: { activo: number | { id: number } } | [activo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return movilizar.definition.url
            .replace('{activo}', parsedArgs.activo.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ActivoController::movilizar
* @see app/Http/Controllers/ActivoController.php:152
* @route '/activos/{activo}/movilizar'
*/
movilizar.post = (args: { activo: number | { id: number } } | [activo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: movilizar.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ActivoController::movilizar
* @see app/Http/Controllers/ActivoController.php:152
* @route '/activos/{activo}/movilizar'
*/
const movilizarForm = (args: { activo: number | { id: number } } | [activo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: movilizar.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ActivoController::movilizar
* @see app/Http/Controllers/ActivoController.php:152
* @route '/activos/{activo}/movilizar'
*/
movilizarForm.post = (args: { activo: number | { id: number } } | [activo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: movilizar.url(args, options),
    method: 'post',
})

movilizar.form = movilizarForm

const ActivoController = { index, create, store, etiquetas, etiquetasPdf, show, edit, update, destroy, movilizar }

export default ActivoController