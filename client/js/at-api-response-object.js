/* global customElements, HTMLElement */
import { html, render } from '../../vendor/lit-html/lit-html.js'
import { richText } from './helpers/rendering.js'
import { parameterTemplate } from './at-api-spec-parameters.js'
import { apiMediaTypeObject } from './at-api-media-type-object.js'

// TODO: think about rendering links (even when they do not work in a REST way (operation vs. resource))
const headersTemplate = headers => html`
<h6>Response Headers</h6>
<table class="table">
  ${Object.entries(headers).map(([headerName, headerParameter]) => {
    headerParameter.name = headerName // response headers align to the parameter structure, but name is set to the headerName provided as key
    return parameterTemplate(headerParameter)
  })}
</table>`

export const template = ({ responseCode, response, headline = true }) => html`
  ${headline ? html`<h5>${responseCode}</h5>` : ''}
  ${response.description ? html`<div class="description">${richText(response.description)}</div>` : ''}
  ${response.headers ? headersTemplate(response.headers) : ''}
  ${response.content ? Object.entries(response.content).map(([mediaType, mediaTypeObject]) => apiMediaTypeObject({ mediaType, mediaTypeObject })) : ''}
`

class ApiResponseObject extends HTMLElement {
  constructor ({ responseCode, response, headline = true } = {}) {
    super()
    this.responseCode = responseCode
    this.response = response
    this.headline = headline
  }

  connectedCallback () {
    this.render()
  }

  render () {
    render(template({ responseCode: this.responseCode, response: this.response, headline: this.headline }), this)
  }
}

customElements.define('at-api-response-object', ApiResponseObject)

export const apiResponseObject = (options = {}) => {
  return new ApiResponseObject(options)
}
