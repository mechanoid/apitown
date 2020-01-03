/* global customElements, HTMLElement */
import { html, render } from '../../vendor/lit-html/lit-html.js'

const parameterTemplate = parameter => html`<tr>
  <td class="param-name">${parameter.name}</td>
  <td>${parameter.description}</td>
  <td>
    ${parameter.required ? html`<span class="badge badge-info">required</span>` : ''}
    ${parameter.deprecated ? html`<span class="badge badge-warning">deprecated</span>` : ''}
  </td>
</tr>`

const parameterGroupTemplate = (parameterType, parameters) => html`
  <h5>${parameterType}</h5>
  <table class="table">
    ${parameters.map(parameterTemplate)}
  </table>
`

const template = ({ parameters }) => html`
  ${Object.keys(parameters).map(parameterType => parameterGroupTemplate(parameterType, parameters[parameterType]))}
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
