/* global customElements, HTMLElement */
import { html, render } from '../../vendor/lit-html/lit-html.js'
// import { apiSpecComponent } from './at-api-spec-component.js'

const template = ({ componentCategory, components }) => html``

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
