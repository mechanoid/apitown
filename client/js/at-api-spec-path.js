/* global customElements, HTMLElement */
import { html, render } from '../../vendor/lit-html/lit-html.js'
import { richText } from './helpers/rendering.js'
import { slug, pathID } from './helpers/path-item-helper.js'
import { apiSpecOperation } from './at-api-spec-operation.js'

const operations = ['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'OPTIONS', 'PATCH', 'TRACE'].map(operation => operation.toLowerCase())

const template = ({ path, pathItem }) => html`
  <header>
    <a name="${slug(path, pathItem)}"></a>
    <h2>${pathID(path, pathItem)}</h2>
    <dl class="path-info">
      <dt>Path:</dt> <dd><code>${path}</code></dd>
      ${pathItem['x-link-rel'] ? html`<dt>Link-Rel:</dt> <dd><code>${pathItem['x-link-rel']}</code></dd>` : ''}
      ${pathItem.operationId ? html`<dt>Operation-Id:</dt> <dd>${pathItem.operationId}</dd>` : ''}
    </dl>
    ${pathItem.summary ? html`<p class="summary">${pathItem.summary}</p>` : ''}
    ${pathItem.description ? html`<div class="description">${richText(pathItem.description)}</div>` : ''}
  </header>
  ${Object.keys(pathItem)
    .filter(key => operations.indexOf(key) >= 0)
    .map(operationName =>
      apiSpecOperation({ operationName, operation: pathItem[operationName] }))}
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
