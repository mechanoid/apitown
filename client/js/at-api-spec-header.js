/* global customElements, HTMLElement */
import { html, render } from '../../vendor/lit-html/lit-html.js'

const template = ({ title }) => html`
  <h1>${title}</h1>
`

class ApiSpecHeader extends HTMLElement {
  constructor ({ info } = {}) {
    super()
    this.info = info
  }

  connectedCallback () {
    this.render()
  }

  render () {
    render(template({
      title: this.title
    }), this)
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
