/* global customElements, HTMLElement */
import { html, render } from '../../vendor/lit-html/lit-html.js'
import skema from '../../vendor/skeme/index.js'

const apiSpecTemplate = spec => html`
  <p>hello ${spec}!!!!</p>
`

class ATApiSpec extends HTMLElement {
  async connectedCallback () {
    this.render()
  }

  async render () {
    render(apiSpecTemplate('world'), this)
  }
}

customElements.define('at-api-spec', ATApiSpec)
