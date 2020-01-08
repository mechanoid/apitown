/* global customElements, HTMLElement */
import { html, render } from '../../vendor/lit-html/lit-html.js'
import { parameterGroupTemplate } from './at-api-spec-parameters.js'

const componentRendererByCategory = {
  schemas: () => {},
  responses: () => {},
  parameters: (componentName, component) => html`
    <h3>${componentName}</h3>
    ${parameterGroupTemplate(componentName, [component], false)}
  `,
  examples: () => {},
  requestBodies: () => {},
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
