/* global customElements, HTMLElement */
import { html, render } from '../../vendor/lit-html/lit-html.js'

const template = ({ label, info, buttonClasses }) => html`
  <button type="button" class="${buttonClasses}" aria-label="more info">${label}</button>
  <span role="status"></span>
`

class ToggleTip extends HTMLElement {
  constructor ({ label, info, buttonClasses } = {}) {
    super()
    if (label) { this.label = label }
    if (info) { this.info = info }
    if (buttonClasses) { this.buttonClasses = buttonClasses }
  }

  connectedCallback () {
    this.render()
    this.button = this.querySelector('button')
    this.status = this.querySelector('[role=status]')
    this.toggleHandler = this.toggle.bind(this)
    this.hideHandler = this.hide.bind(this)
    this.escHideHandler = (e) => {
      if ((e.keyCode || e.which) === 27) {
        this.hideHandler()
      }
    }

    this.button.addEventListener('click', this.toggleHandler)
    document.addEventListener('click', this.hideHandler)
    document.addEventListener('keydown', this.escHideHandler)
  }

  disconnectedCallback () {
    this.button.removeEventListener('click', this.toggleHandler)
    document.removeEventListener('click', this.hideHandler)
  }

  toggle () {
    if (this.status.innerHTML === '') {
      this.show()
    } else {
      this.hide()
    }
  }

  show () {
    this.status.innerHTML = this.info
    this.classList.add('active')
  }

  hide (e) {
    if (!e || (this.button !== e.target)) {
      this.status.innerHTML = ''
      this.classList.remove('active')
      this.button.blur()
    }
  }

  render () {
    render(template({ label: this.label, info: this.info, buttonClasses: this.buttonClasses }), this)
  }

  set label (label) {
    this._label = label
  }

  get label () {
    if (this._label) {
      return this._label
    }

    this._label = this.innerHTML
    return this._label
  }

  set info (info) {
    this._info = info
  }

  get info () {
    if (this._info) {
      return this._info
    }

    this._info = this.getAttribute('info')
    return this._info
  }

  set buttonClasses (classes) {
    this._classes = classes
  }

  get buttonClasses () {
    if (this._classes) {
      return this._classes
    }

    this._classes = this.getAttribute('button-classes')
    return this._classes
  }
}

customElements.define('at-toggle-tip', ToggleTip)

export const toggleTip = (options = {}) => {
  return new ToggleTip(options)
}
