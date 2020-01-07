/* global customElements, HTMLElement */
import { html, render } from '../../vendor/lit-html/lit-html.js'
import { richText } from './helpers/rendering.js'
import { apiSpecParameters } from './at-api-spec-parameters.js'
import { apiRequestBodyObject } from './at-api-request-body-object.js'
import { apiResponseObject } from './at-api-response-object.js'

const externalDocsTemplate = externalDocs => html`<div class="external-docs">
  <a href="${externalDocs.url}" rel="noopener noreferrer" target="_blank">
    ${externalDocs.description || externalDocs.url}
  </a>
</div>`

const parametersTemplate = ({ parameters }) => html`
  <h4>Request Parameters</h4>
  ${apiSpecParameters({ parameters })}
`

const responsesTemplate = ({ responses }) => html`
  <h4>Responses</h4>
  ${Object.keys(responses)
    .sort()
    .map(responseCode => apiResponseObject({ responseCode, response: responses[responseCode] }))}
`

const template = ({ operationName, operation }) => html`
  <header>
    <h3 class="operation-headline">${operationName}</h3>
    ${operation.operationId ? `(${operation.operationId})` : ''}

    ${operation.summary ? html`<p class="summary">${operation.summary}</p>` : ''}
    ${operation.description ? html`<div class="description">${richText(operation.description)}</div>` : ''}
    ${operation.externalDocs ? externalDocsTemplate(operation.externalDocs) : ''}
  </header>

  ${operation.parameters ? parametersTemplate({ parameters: operation.parameters }) : ''}
  ${operation.requestBody ? apiRequestBodyObject({ requestBody: operation.requestBody }) : ''}
  ${operation.responses ? responsesTemplate({ responses: operation.responses }) : ''}
`

class ApiSpecOperation extends HTMLElement {
  constructor ({ operationName, operation } = {}) {
    super()
    this.operation = operation
    this.operationName = operationName
    this.setAttribute('operation-name', operationName)
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
