/* global customElements, HTMLElement */
import { html, render } from '../../vendor/lit-html/lit-html.js'
import { link } from './helpers/rendering.js'

const contactTemplate = ({ name, url, email }) => html`
  <address class="card">
    <h3>Contact</h3>
    ${name}
    ${url ? link(url) : ''}
    ${email ? `E-Mail: ${email}` : ''}
  </address>`

const template = ({ title, description, termsOfService, contact, license, version }) => html`
  <footer>
    ${contact ? contactTemplate(contact) : ''}
  </footer>`

class ApiSpecFooter extends HTMLElement {
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
}

customElements.define('at-api-spec-footer', ApiSpecFooter)

export const apiSpecFooter = (options = {}) => {
  return new ApiSpecFooter(options)
}
