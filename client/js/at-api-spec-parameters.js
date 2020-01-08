/* global customElements, HTMLElement */
import { html, render } from '../../vendor/lit-html/lit-html.js'
import './at-toggle-tip.js'

// in the parameter list we render only format and type.
const simpleSchema = schema => html`${schema.type ? `${schema.type} ` : ''}${schema.format ? `(${schema.format})` : ''}`

// TODO: render style (http://spec.openapis.org/oas/v3.0.2#style-values)
// TODO: render explode
export const parameterTemplate = parameter => html`<tr class="${parameter.required ? 'required' : ''}">
  <td class="param-name">${parameter.name}</td>
  <td>${parameter.schema ? simpleSchema(parameter.schema) : ''}</td>
  <td>${parameter.description}</td>
  <td><code>
    ${parameter.example ? parameter.example : ''}
    ${parameter.examples && !parameter.example ? parameter.examples.join(', ') : ''}
  </code></td>
  <td>
    ${parameter.required ? html`<at-toggle-tip info="Determines whether this parameter is mandatory" button-classes="badge badge-primary">required</at-toggle-tip>` : ''}
    ${parameter.deprecated ? html`<at-toggle-tip info="Specifies that a parameter is deprecated and SHOULD be transitioned out of usage" button-classes="badge badge-warning">deprecated</at-toggle-tip>` : ''}
    ${parameter.allowReserved ? html`<at-toggle-tip info="Determines whether the parameter value SHOULD allow reserved characters, as defined by [RFC3986] :/?#[]@!$&'()*+,;= to be included without percent-encoding" button-classes="badge badge-info">allowReserved</at-toggle-tip>` : ''}
  </td>
</tr>`

const parameterGroupTemplate = (parameterType, parameters) => html`
  <h5>${parameterType}</h5>
  <table class="table">
    ${parameters.map(parameterTemplate)}
  </table>
`

const template = ({ parameters }) => html`
  ${Object.entries(parameters).map(([parameterType, parameter]) => parameterGroupTemplate(parameterType, parameter))}
`

class ApiSpecParameters extends HTMLElement {
  constructor ({ parameters } = {}) {
    super()
    this.parameters = parameters

    this.groupedParameters = ['header', 'path', 'query', 'cookie']
      .reduce((result, location) => {
        const paramsForLocation = parameters.filter(p => p.in === location)

        if (paramsForLocation.length > 0) {
          result[location] = paramsForLocation
        }

        return result
      }, {})
  }

  connectedCallback () {
    this.render()
  }

  render () {
    render(template({ parameters: this.groupedParameters }), this)
  }
}

customElements.define('at-api-spec-parameters', ApiSpecParameters)

export const apiSpecParameters = (options = {}) => {
  return new ApiSpecParameters(options)
}
