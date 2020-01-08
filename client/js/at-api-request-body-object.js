/* global customElements, HTMLElement */
import { html, render } from '../../vendor/lit-html/lit-html.js'
import { richText } from './helpers/rendering.js'
import { apiMediaTypeObject } from './at-api-media-type-object.js'

export const template = ({ description, content, required, headline } = {}) => html`
  ${headline ? html`<h4>Request Body</h4>` : ''}
  <span class="required-hint">
    ${required ? html`<strong>(required)</strong>` : ''}
  </span>

  ${description ? html`<div class="description">${richText(description)}</div>` : ''}
  ${content ? Object.entries(content).map(([mediaType, mediaTypeObject]) => apiMediaTypeObject({ mediaType, mediaTypeObject })) : ''}
`

class ApiRequestBodyObject extends HTMLElement {
  constructor ({ requestBody, headline = true } = {}) {
    super()
    this.requestBody = requestBody
    this.headline = headline
  }

  connectedCallback () {
    this.render()
  }

  render () {
    render(template({ ...this.requestBody, headline: this.headline }), this)
  }
}

customElements.define('at-api-request-body-object', ApiRequestBodyObject)

export const apiRequestBodyObject = (options = {}) => {
  return new ApiRequestBodyObject(options)
}
