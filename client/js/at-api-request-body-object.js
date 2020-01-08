/* global customElements, HTMLElement */
import { html, render } from '../../vendor/lit-html/lit-html.js'
import { richText } from './helpers/rendering.js'
import { apiMediaTypeObject } from './at-api-media-type-object.js'

const template = ({ description, content, required } = {}) => html`
  <h4>
    Request Body
    <span class="required-hint">
      ${required ? html`<strong>(required)</strong>` : ''}
    </span>
  </h4>

  ${description ? html`<div class="description">${richText(description)}</div>` : ''}
  ${content ? Object.keys(content).map(mediaType => apiMediaTypeObject({ mediaType, mediaTypeObject: content[mediaType] })) : ''}
`

class ApiRequestBodyObject extends HTMLElement {
  constructor ({ requestBody } = {}) {
    super()
    this.requestBody = requestBody
  }

  connectedCallback () {
    this.render()
  }

  render () {
    render(template({ ...this.requestBody }), this)
  }
}

customElements.define('at-api-request-body-object', ApiRequestBodyObject)

export const apiRequestBodyObject = (options = {}) => {
  return new ApiRequestBodyObject(options)
}
