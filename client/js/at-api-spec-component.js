/* global customElements, HTMLElement */
import { html, render } from '../../vendor/lit-html/lit-html.js'
import { parameterGroupTemplate } from './at-api-spec-parameters.js'
import { apiResponseObject } from './at-api-response-object.js'
import { exampleObject, code } from './at-api-media-type-object.js'
import { apiRequestBodyObject } from './at-api-request-body-object.js'

const componentRendererByCategory = {
  schemas: (componentName, component) => html`
    <h3>${componentName}</h3>
    <div class="container-fluid">
      ${code(component, 'schema')}
    </div>
  `,
  responses: (componentName, component) => html`
    <h3>${componentName}</h3>
    ${apiResponseObject({ responseCode: null, response: component, headline: false })}
  `,
  parameters: (componentName, component) => html`
    <h3>${componentName}</h3>
    ${parameterGroupTemplate('', [component], false)}
  `,
  examples: (componentName, component) => html`
    <h3>${componentName}</h3>
    ${exampleObject(null, component, false, 'example')}
  `,
  requestBodies: (componentName, component) => html`
    <h3>${componentName}</h3>
    ${apiRequestBodyObject({ requestBody: component, headline: false })}
  `,
  headers: (componentName, component) => html`
    <h3>${componentName}</h3>
    ${parameterGroupTemplate('', [Object.assign({}, component, { name: 'EXAMPLE_HEADER_NAME' })], false)}
  `,
  // TODO: those are not yet implemented. Handle them at least with a message
  securitySchemes: () => {},
  links: () => {},
  linkscallbacks: () => {}
}

const template = ({ componentCategory, component, componentName }) => html`
  <a name="components-${componentCategory}-${componentName}"></a>
  ${componentRendererByCategory[componentCategory] ? componentRendererByCategory[componentCategory](componentName, component) : ''}
`

class ApiSpecComponent extends HTMLElement {
  constructor ({ componentCategory, componentName, component } = {}) {
    super()
    this.componentCategory = componentCategory
    this.component = component
    this.componentName = componentName
  }

  connectedCallback () {
    this.render()
  }

  render () {
    render(template({ componentCategory: this.componentCategory, component: this.component, componentName: this.componentName }), this)
  }
}

customElements.define('at-api-spec-component', ApiSpecComponent)

export const apiSpecComponent = (options = {}) => {
  return new ApiSpecComponent(options)
}
