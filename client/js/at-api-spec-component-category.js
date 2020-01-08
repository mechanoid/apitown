/* global customElements, HTMLElement */
import { html, render } from '../../vendor/lit-html/lit-html.js'
import { apiSpecComponent } from './at-api-spec-component.js'

const template = ({ componentCategory, components }) => html`
  <h2>${componentCategory}</h2>
  ${Object.entries(components).map(([componentName, component]) => apiSpecComponent({ componentCategory, componentName, component }))}
`

class ApiSpecComponentCategory extends HTMLElement {
  constructor ({ componentCategory, components } = {}) {
    super()
    this.componentCategory = componentCategory
    this.components = components
  }

  connectedCallback () {
    this.render()
  }

  render () {
    render(template({ componentCategory: this.componentCategory, components: this.components }), this)
  }
}

customElements.define('at-api-spec-component-category', ApiSpecComponentCategory)

export const apiSpecComponentCategory = (options = {}) => {
  return new ApiSpecComponentCategory(options)
}
