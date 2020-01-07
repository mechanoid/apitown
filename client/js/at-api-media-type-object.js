/* global customElements, HTMLElement, hljs */
import { html, render } from '../../vendor/lit-html/lit-html.js'
// import { link } from './helpers/rendering.js'

const code = snippet => html`<pre class="pre-scrollable"><code class="json">${JSON.stringify(snippet, null, 2)}</code></pre>`

const codeWithHeadline = (headline, snippet) => html`<h6>${headline}</h6><code class="json">${JSON.stringify(snippet, null, 2)}</code>`

const template = ({ mediaType, mediaTypeObject }) => html`
  <h5>${mediaType}</h5>
  <div class="container-fluid no-gutters">
    <div class="row">
      <div class="col-md-6 schema">${mediaTypeObject.schema ? code(mediaTypeObject.schema) : ''}</div>
      <div class="col-md-6 example">${mediaTypeObject.examples
        ? html`<pre class="pre-scrollable">${Object.keys(mediaTypeObject.examples).map(exampleName => codeWithHeadline(exampleName, mediaTypeObject.examples[exampleName]))}</pre>`
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
    const codeBlocks = this.querySelectorAll('code')
    codeBlocks.forEach(block => hljs.highlightBlock(block))
  }

  render () {
    render(template({ mediaType: this.mediaType, mediaTypeObject: this.mediaTypeObject }), this)
  }
}

customElements.define('at-api-media-type-object', ApiMediaTypeObject)

export const apiMediaTypeObject = (options = {}) => {
  return new ApiMediaTypeObject(options)
}
