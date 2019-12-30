/* global customElements, HTMLElement */
import { html, render } from '../../vendor/lit-html/lit-html.js'
import { richText } from './helpers/rendering.js'
import { slug, pathID } from './helpers/path-item-helper.js'

const template = ({ path, pathItem }) => html`
  <header>
    <a name="${slug(path, pathItem)}"></a>
    <h2>${pathID(path, pathItem)}</h2>
    ${pathItem.summary ? html`<p class="summary">${pathItem.summary}</p>` : ''}
    ${pathItem.description ? html`<div class="description">${richText(pathItem.description)}</div>` : ''}
  </header>
`

class ApiSpecPath extends HTMLElement {
  constructor ({ spec, path, pathItem } = {}) {
    super()
    this.spec = spec
    this.path = path
    this.pathItem = pathItem
  }

  connectedCallback () {
    this.render()
  }

  render () {
    render(template({ path: this.path, pathItem: this.pathItem }), this)
  }
}

customElements.define('at-api-spec-path', ApiSpecPath)

export const apiSpecPath = (options = {}) => {
  return new ApiSpecPath(options)
}
