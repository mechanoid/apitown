/* global customElements, HTMLElement */
import { html, render } from '../../vendor/lit-html/lit-html.js'
import { slugify } from '../../vendor/transliteration/dist/browser/bundle.esm.min.js'
// import { richText, link } from './helpers/rendering.js'

const template = ({ path, pathItem }) => html`fubar`

class ApiSpecPath extends HTMLElement {
  constructor ({ spec, pathName, path } = {}) {
    super()
    this.spec = spec
    this.path = path
    this.pathName = pathName
    this.pathSlug = slugify(this.pathName)
  }

  connectedCallback () {
    // console.log(this.pathName, this.pathSlug)
  }

  render () {
    render(template({ ...this.path }), this)
  }
}

customElements.define('at-api-spec-path', ApiSpecPath)

export const apiSpecPath = (options = {}) => {
  return new ApiSpecPath(options)
}
