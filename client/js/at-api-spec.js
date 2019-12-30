/* global customElements, HTMLElement, CustomEvent */
import { html, render } from '../../vendor/lit-html/lit-html.js'
import './at-error-event-handler.js'

import skema from '../../vendor/skeme/index.js'
import { apiSpecHeader } from './at-api-spec-header.js'
import { apiSpecFooter } from './at-api-spec-footer.js'
import { apiSpecPath } from './at-api-spec-path.js'
import { apiContentNavigation } from './at-content-navigation.js'

export const apiSpec = spec => html`
  <at-content-wrapper>
    <at-content-row>
      ${apiContentNavigation({ spec })}

      <at-content-container>
        ${apiSpecHeader({ info: spec.info })}
        ${Object.entries(spec.paths).map(([pathName, path]) => apiSpecPath({ spec, pathName, path }))}
        ${apiSpecFooter({ info: spec.info })}
      </at-content-container>
    </at-content-row>
  </at-content-wrapper>
`

class ATApiSpec extends HTMLElement {
  async connectedCallback () {
    try {
      this.spec = await skema(this.apiSpec)
      this.render()
    } catch (e) {
      const errorEvent = new CustomEvent('at-error', { bubbles: true, detail: e })
      this.dispatchEvent(errorEvent)
    }
  }

  render () {
    render(apiSpec(this.spec), this)
  }

  get apiSpec () {
    return this.getAttribute('spec')
  }
}

customElements.define('at-api-spec', ATApiSpec)
