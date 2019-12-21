/* global customElements, HTMLElement */
import { html, render } from '../../vendor/lit-html/lit-html.js'
import { richText, link } from './helpers/rendering.js'

const descriptionTemplate = description => html`<p>${richText(description)}</p>`

const contactTemplate = ({ name, url, email }) => html`
  <address class="card">
    <h3>Contact</h3>
    ${name}
    ${url ? link(url) : ''}
    ${email ? `E-Mail: ${email}` : ''}
  </address>`

const template = ({ title, description, termsOfService, contact }) => html`
  <header>
    <h1>${title}</h1>

    ${description ? descriptionTemplate(description) : ''}
    ${termsOfService ? link('Terms of Service', termsOfService) : ''}
    ${contact ? contactTemplate(contact) : ''}
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

  set info (info) {
    this._info = info // apply validations
  }

  get info () {
    return this._info
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
