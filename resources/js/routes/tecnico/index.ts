import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see routes/web.php:396
* @route '/tecnico'
*/
export const home = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: home.url(options),
    method: 'get',
})

home.definition = {
    methods: ["get","head"],
    url: '/tecnico',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:396
* @route '/tecnico'
*/
home.url = (options?: RouteQueryOptions) => {
    return home.definition.url + queryParams(options)
}

/**
* @see routes/web.php:396
* @route '/tecnico'
*/
home.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: home.url(options),
    method: 'get',
})

/**
* @see routes/web.php:396
* @route '/tecnico'
*/
home.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: home.url(options),
    method: 'head',
})

/**
* @see routes/web.php:396
* @route '/tecnico'
*/
const homeForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: home.url(options),
    method: 'get',
})

/**
* @see routes/web.php:396
* @route '/tecnico'
*/
homeForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: home.url(options),
    method: 'get',
})

/**
* @see routes/web.php:396
* @route '/tecnico'
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

/**
* @see routes/web.php:408
* @route '/tecnico/scan'
*/
export const scan = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: scan.url(options),
    method: 'get',
})

scan.definition = {
    methods: ["get","head"],
    url: '/tecnico/scan',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:408
* @route '/tecnico/scan'
*/
scan.url = (options?: RouteQueryOptions) => {
    return scan.definition.url + queryParams(options)
}

/**
* @see routes/web.php:408
* @route '/tecnico/scan'
*/
scan.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: scan.url(options),
    method: 'get',
})

/**
* @see routes/web.php:408
* @route '/tecnico/scan'
*/
scan.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: scan.url(options),
    method: 'head',
})

/**
* @see routes/web.php:408
* @route '/tecnico/scan'
*/
const scanForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: scan.url(options),
    method: 'get',
})

/**
* @see routes/web.php:408
* @route '/tecnico/scan'
*/
scanForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: scan.url(options),
    method: 'get',
})

/**
* @see routes/web.php:408
* @route '/tecnico/scan'
*/
scanForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: scan.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

scan.form = scanForm

/**
* @see routes/web.php:421
* @route '/tecnico/imprimir'
*/
export const imprimir = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: imprimir.url(options),
    method: 'get',
})

imprimir.definition = {
    methods: ["get","head"],
    url: '/tecnico/imprimir',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:421
* @route '/tecnico/imprimir'
*/
imprimir.url = (options?: RouteQueryOptions) => {
    return imprimir.definition.url + queryParams(options)
}

/**
* @see routes/web.php:421
* @route '/tecnico/imprimir'
*/
imprimir.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: imprimir.url(options),
    method: 'get',
})

/**
* @see routes/web.php:421
* @route '/tecnico/imprimir'
*/
imprimir.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: imprimir.url(options),
    method: 'head',
})

/**
* @see routes/web.php:421
* @route '/tecnico/imprimir'
*/
const imprimirForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: imprimir.url(options),
    method: 'get',
})

/**
* @see routes/web.php:421
* @route '/tecnico/imprimir'
*/
imprimirForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: imprimir.url(options),
    method: 'get',
})

/**
* @see routes/web.php:421
* @route '/tecnico/imprimir'
*/
imprimirForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: imprimir.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

imprimir.form = imprimirForm

const tecnico = {
    home: Object.assign(home, home),
    scan: Object.assign(scan, scan),
    imprimir: Object.assign(imprimir, imprimir),
}

export default tecnico