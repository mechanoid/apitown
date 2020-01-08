/* global customElements, HTMLElement, CustomEvent, hljs, window */
import { html, render } from '../../vendor/lit-html/lit-html.js'
import './at-error-event-handler.js'

import skema from '../../vendor/skeme/index.js'
import { apiSpecHeader } from './at-api-spec-header.js'
import { apiSpecFooter } from './at-api-spec-footer.js'
import { apiSpecPath } from './at-api-spec-path.js'
import { apiSpecComponentCategory } from './at-api-spec-component-category.js'
import { apiContentNavigation } from './at-content-navigation.js'

export const apiSpec = spec => html`
  <at-content-wrapper>
    <at-content-row>
      ${apiContentNavigation({ spec })}

      <at-content-container>
        ${apiSpecHeader({ info: spec.info, externalDocs: spec.externalDocs })}
        ${Object.entries(spec.paths).map(([path, pathItem]) => apiSpecPath({ spec, path, pathItem }))}
        ${spec.components ? Object.entries(spec.components).map(([componentCategory, components]) => apiSpecComponentCategory({ componentCategory, components })) : ''}
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
      hljs.initHighlighting()

      // re-fresh anchor (because, SPA, you know ....)
      if (window.location.hash) {
        const desiredHash = window.location.hash.slice(1)
        window.location.hash = ''
        window.location.hash = '#' + desiredHash
      }
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
