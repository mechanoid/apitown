/* global customElements, HTMLElement */
import { html, render } from '../../vendor/lit-html/lit-html.js'
import skema from '../../vendor/skeme/index.js'

const apiSpecTemplate = spec => html`
  <p>hello ${spec}!!!!</p>
`

class ATApiSpec extends HTMLElement {
  async connectedCallback () {
    const spec = await skema(this.specReference)
    console.log(spec)
    this.render()
  }

  async render () {
    render(apiSpecTemplate('world'), this)
  }

  get specReference () {
    return this.getAttribute('spec')
  }
}

customElements.define('at-api-spec', ATApiSpec)
