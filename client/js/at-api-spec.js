/* global customElements, HTMLElement */
import { html, render } from '../../vendor/lit-html/lit-html.js'
import skema from '../../vendor/skeme/index.js'

export const apiSpecTemplate = spec => html`
  <at-api-spec-header spec=${spec}/>
`

class ATApiSpec extends HTMLElement {
  async connectedCallback () {
    this.spec = await skema(this.apiSpec)

    this.render()
  }

  render () {
    render(apiSpecTemplate(this.spec), this)
  }

  get apiSpec () {
    return this.getAttribute('spec')
  }
}

customElements.define('at-api-spec', ATApiSpec)
