/* global customElements, HTMLElement */
import { html, render } from '../../vendor/lit-html/lit-html.js'
import { parameterGroupTemplate } from './at-api-spec-parameters.js'
import { apiResponseObject } from './at-api-response-object.js'
import { exampleObject } from './at-api-media-type-object.js'
import { apiRequestBodyObject } from './at-api-request-body-object.js'

const componentRendererByCategory = {
  schemas: () => {},
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
  headers: () => {},
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
