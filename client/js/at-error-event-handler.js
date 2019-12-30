/* global customElements, HTMLElement */
import { html, render } from '../../vendor/lit-html/lit-html.js'

class ATErrorEventHandler extends HTMLElement {
  connectedCallback () {
    const body = document.querySelector('body')
    body.addEventListener('at-error', this.render)
  }

  render (e) {
    console.error(e.detail)
    render(html`${e.detail}`, this)
  }
}

customElements.define('at-error-event-handler', ATErrorEventHandler)
