/* global customElements, HTMLElement */
import { html, render } from '../../vendor/lit-html/lit-html.js'
import { richText, link } from './helpers/rendering.js'

const licenseTemplate = license => license.url
  ? html`License: ${link(license.name, license.url)}`
  : html`${license.name}`

const externalDocsTemplate = externalDocs => html`<div class="external-docs">
  <a href="${externalDocs.url}" rel="noopener noreferrer" target="_blank">
    ${externalDocs.description || externalDocs.url}
  </a>
</div>`

const template = ({ title, description, termsOfService, contact, license, version, externalDocs }) => html`
  <header>
    <h1>${title}</h1>
    <div class="meta-info">
      ${license ? licenseTemplate(license) : ''}
      ${version ? `Version: ${version}` : ''}
      ${externalDocs ? externalDocsTemplate(externalDocs) : ''}
    </div>

    ${description ? html`<div class="description">${richText(description)}</div>` : ''}
    ${termsOfService ? link('Terms of Service', termsOfService) : ''}
  </header>`

class ApiSpecHeader extends HTMLElement {
  constructor ({ info, externalDocs } = {}) {
    super()
    this.info = info
    this.externalDocs = externalDocs
  }

  connectedCallback () {
    this.render()
  }

  render () {
    render(template({ externalDocs: this.externalDocs, ...this.info }), this)
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
