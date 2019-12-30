/* global customElements, HTMLElement */
import { html, render } from '../../vendor/lit-html/lit-html.js'
import { richText, link } from './helpers/rendering.js'

const descriptionTemplate = description => html`${richText(description)}`

const licenseTemplate = license => license.url
  ? html`License: ${link(license.name, license.url)}`
  : html`${license.name}`

const template = ({ title, description, termsOfService, contact, license, version }) => html`
  <header>
    <h1>${title}</h1>
    <div class="meta-info">
      ${license ? licenseTemplate(license) : ''}
      ${version ? `Version: ${version}` : ''}
    </div>

    ${description ? descriptionTemplate(description) : ''}
    ${termsOfService ? link('Terms of Service', termsOfService) : ''}
  </header>`

class ApiSpecHeader extends HTMLElement {
  constructor ({ info } = {}) {
    super()
    this.info = info
  }

  connectedCallback () {
    this.render()
  }

  render () {
    render(template({ ...this.info }), this)
  }

  get title () {
    this._title = this.info.title || this.getAttribute('title')
    return this._title
  }
}

customElements.define('at-api-spec-header', ApiSpecHeader)

export const apiSpecHeader = (options = {}) => {
  return new ApiSpecHeader(options)
}
