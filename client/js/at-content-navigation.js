/* global customElements, HTMLElement */

import { html, render } from '../../vendor/lit-html/lit-html.js'
// import { slugify } from '../../vendor/transliteration/dist/browser/bundle.esm.min.js'
// import { richText, link } from './helpers/rendering.js'

const pathLinkTemplate = ([path, pathConfig]) => html`<li>
  <a href="">
    ${pathConfig['x-resource-name'] ? pathConfig['x-resource-name'] : path}
    ${pathConfig['x-link-rel'] ? html`<span class="link-rel">${pathConfig['x-link-rel']}</span>` : ''}
  </a>
</li>`

const template = ({ paths }) => html`
  <nav>
    <h3 class="nav-headline">Resources</h3>
    <ul>${paths.map(pathLinkTemplate)}</ul>
  </nav>
`

class ApiContentNavigation extends HTMLElement {
  constructor ({ spec } = {}) {
    super()
    this.spec = spec
  }

  connectedCallback () {
    this.render()
  }

  get paths () {
    if (this._paths) {
      return this._paths
    }

    this._paths = Object.keys(this.spec.paths).map(path => [path, this.spec.paths[path]])
    return this._paths
  }

  render () {
    render(template({ paths: this.paths }), this)
  }
}

customElements.define('at-content-navigation', ApiContentNavigation)

export const apiContentNavigation = (options = {}) => {
  return new ApiContentNavigation(options)
}

// nav
//   h3.nav-headline Resources
//   ul
//
//     li
//       a(href="#")
//         | Dog
//         span.link-rel pet:dog
//
//     li
//       a(href="#")
//         | Dog Food
//         span.link-rel pet:dog-food
//
//     li
//       a(href="#")
//         | Dog School
//         span.link-rel pet:dog-school
