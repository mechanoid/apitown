/* global customElements, HTMLElement */
import { html, render } from '../../vendor/lit-html/lit-html.js'
import { richText } from './helpers/rendering.js'

const code = (snippet, classes) => html`
  <pre class="pre-scrollable ${classes}"><code class="json">${JSON.stringify(snippet, null, 2)}</code></pre>
`

export const exampleObject = (headline, example, renderHeadline = true, classes = '') => html`
${renderHeadline ? html`<h6>${headline}</h6>` : ''}
${example.summary ? html`<p class="summary">${example.summary}</p>` : ''}
${example.description ? html`<div class="description">${richText(example.description)}</div>` : ''}
${example.value ? code(example.value, classes) : ''}
${example.externalValue ? html`<a href="${example.externalValue}">External Example</a>` : ''}
`

// TODO: improve example rendering (other formats? external values? etc.)
// TODO: render encoding information http://spec.openapis.org/oas/v3.0.2#encoding-object
const template = ({ mediaType, mediaTypeObject, hasExamples } = {}) => html`
  <h5>${mediaType}</h5>
  <div class="container-fluid no-gutters">
    <div class="row">
      <div class="col-md-${hasExamples ? 6 : 11} schema">${mediaTypeObject.schema ? code(mediaTypeObject.schema) : ''}</div>
      <div class="col-md-${hasExamples ? 6 : 1} example ${hasExamples ? '' : 'empty'}">${mediaTypeObject.examples
        ? html`<pre class="pre-scrollable">${Object.entries(mediaTypeObject.examples).map(([exampleName, example]) => exampleObject(exampleName, example))}</pre>`
        : code(mediaTypeObject.example)
        }</div>
    </div>
  </div>
`

class ApiMediaTypeObject extends HTMLElement {
  constructor ({ mediaType, mediaTypeObject } = {}) {
    super()

    this.mediaType = mediaType
    this.mediaTypeObject = mediaTypeObject
  }

  connectedCallback () {
    this.render()
  }

  render () {
    render(template({ mediaType: this.mediaType, mediaTypeObject: this.mediaTypeObject, hasExamples: this.mediaTypeObject.example || this.mediaTypeObject.examples }), this)
  }
}

customElements.define('at-api-media-type-object', ApiMediaTypeObject)

export const apiMediaTypeObject = (options = {}) => {
  return new ApiMediaTypeObject(options)
}
