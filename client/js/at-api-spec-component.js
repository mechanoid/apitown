/* global customElements, HTMLElement */
import { html, render } from '../../vendor/lit-html/lit-html.js'

const template = ({ componentCategory, components }) => html``

class ApiSpecComponent extends HTMLElement {
  constructor ({ componentCategory, component } = {}) {
    super()
    this.componentCategory = componentCategory
    this.component = component
  }

  connectedCallback () {
    this.render()
  }

  render () {
    render(template({ componentCategory: this.componentCategory, component: this.component }), this)
  }
}

customElements.define('at-api-spec-component', ApiSpecComponent)

export const apiSpecComponent = (options = {}) => {
  return new ApiSpecComponent(options)
}
