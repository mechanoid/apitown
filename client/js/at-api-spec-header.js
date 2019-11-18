/* global customElements, HTMLElement */
import { html, render, directive } from '../../vendor/lit-html/lit-html.js'

const specHeaderTemplate = spec => html`<h1>${JSON.stringify(spec)}</h1>`

export class ApiSpecHeader extends HTMLElement {
  connectedCallback () {
    this.render()
  }

  render () {
    render(specHeaderTemplate(this.spec), this)
  }

  get spec () {
    this.spec = this.getAttribute('spec')
  }
}

customElements.define('at-api-spec-header', ApiSpecHeader)
