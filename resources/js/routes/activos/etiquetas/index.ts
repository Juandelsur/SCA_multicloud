import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\ActivoController::pdf
* @see app/Http/Controllers/ActivoController.php:316
* @route '/activos/etiquetas/pdf'
*/
export const pdf = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: pdf.url(options),
    method: 'post',
})

pdf.definition = {
    methods: ["post"],
    url: '/activos/etiquetas/pdf',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ActivoController::pdf
* @see app/Http/Controllers/ActivoController.php:316
* @route '/activos/etiquetas/pdf'
*/
pdf.url = (options?: RouteQueryOptions) => {
    return pdf.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ActivoController::pdf
* @see app/Http/Controllers/ActivoController.php:316
* @route '/activos/etiquetas/pdf'
*/
pdf.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: pdf.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ActivoController::pdf
* @see app/Http/Controllers/ActivoController.php:316
* @route '/activos/etiquetas/pdf'
*/
const pdfForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: pdf.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ActivoController::pdf
* @see app/Http/Controllers/ActivoController.php:316
* @route '/activos/etiquetas/pdf'
*/
pdfForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: pdf.url(options),
    method: 'post',
})

pdf.form = pdfForm

const etiquetas = {
    pdf: Object.assign(pdf, pdf),
}

export default etiquetas