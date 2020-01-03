/* global customElements, HTMLElement */
import { html, render } from '../../vendor/lit-html/lit-html.js'
import { richText } from './helpers/rendering.js'
import { apiSpecParameters } from './at-api-spec-parameters.js'

const externalDocsTemplate = externalDocs => html`<div class="external-docs">
  <a href="${externalDocs.url}" rel="noopener noreferrer" target="_blank">
    ${externalDocs.description || externalDocs.url}
  </a>
</div>`

const parametersTemplate = ({ parameters }) => html`
  <h4>Request Parameters</h4>
  ${apiSpecParameters({ parameters, headlineLevel: 5 })}
`

const template = ({ operationName, operation }) => html`
  <header>
    <h3>${operationName}</h3>
    ${operation.summary ? html`<p class="summary">${operation.summary}</p>` : ''}
    ${operation.description ? html`<div class="description">${richText(operation.description)}</div>` : ''}
    ${operation.externalDocs ? externalDocsTemplate(operation.externalDocs) : ''}
  </header>

  ${operation.parameters ? parametersTemplate({ parameters: operation.parameters }) : ''}
`

class ApiSpecOperation extends HTMLElement {
  constructor ({ operationName, operation } = {}) {
    super()
    this.operation = operation
    this.operationName = operationName
  }

  connectedCallback () {
    this.render()
  }

  render () {
    render(template({ operationName: this.operationName, operation: this.operation }), this)
  }
}

customElements.define('at-api-spec-operation', ApiSpecOperation)

export const apiSpecOperation = (options = {}) => {
  return new ApiSpecOperation(options)
}
