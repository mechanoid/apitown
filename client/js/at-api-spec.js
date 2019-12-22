/* global customElements, HTMLElement */
import { html, render } from '../../vendor/lit-html/lit-html.js'
import skema from '../../vendor/skeme/index.js'
import { apiSpecHeader } from './at-api-spec-header.js'
import { apiSpecFooter } from './at-api-spec-footer.js'
import { apiSpecPath } from './at-api-spec-path.js'

export const apiSpec = spec => html`
  ${apiSpecHeader({ info: spec.info })}
  ${Object.entries(spec.paths).map(([pathName, path]) => apiSpecPath({ spec, pathName, path }))}
  ${apiSpecFooter({ info: spec.info })}
`

class ATApiSpec extends HTMLElement {
  async connectedCallback () {
    this.spec = await skema(this.apiSpec)
    this.render()
  }

  render () {
    render(apiSpec(this.spec), this)
  }

  get apiSpec () {
    return this.getAttribute('spec')
  }
}

customElements.define('at-api-spec', ATApiSpec)
