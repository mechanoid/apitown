/* global customElements, HTMLElement */
import { html, render } from '../../vendor/lit-html/lit-html.js'
import { richText } from './helpers/rendering.js'
import { parameterTemplate } from './at-api-spec-parameters.js'
import { apiMediaTypeObject } from './at-api-media-type-object.js'

const headersTemplate = headers => html`
<h6>Response Headers</h6>
<table class="table">
  ${Object.keys(headers).map(headerName => {
    const headerParameter = headers[headerName]
    headerParameter.name = headerName // response headers align to the parameter structure, but name is set to the headerName provided as key
    return parameterTemplate(headerParameter)
  })}
</table>`

const template = ({ responseCode, response }) => html`
  <h5>${responseCode}</h5>
  ${response.description ? html`<div class="description">${richText(response.description)}</div>` : ''}
  ${response.headers ? headersTemplate(response.headers) : ''}
  ${response.content ? Object.keys(response.content).map(mediaType => apiMediaTypeObject({ mediaType, mediaTypeObject: response.content[mediaType] })) : ''}
`

class ApiResponseObject extends HTMLElement {
  constructor ({ responseCode, response } = {}) {
    super()
    this.responseCode = responseCode
    this.response = response
  }

  connectedCallback () {
    this.render()
  }

  render () {
    render(template({ responseCode: this.responseCode, response: this.response }), this)
  }
}

customElements.define('at-api-response-object', ApiResponseObject)

export const apiResponseObject = (options = {}) => {
  return new ApiResponseObject(options)
}
