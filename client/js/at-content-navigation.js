/* global customElements, HTMLElement */

import { html, render } from '../../vendor/lit-html/lit-html.js'
// import { slugify } from '../../vendor/transliteration/dist/browser/bundle.esm.min.js'
// import { richText, link } from './helpers/rendering.js'
import { pathItemLink } from './helpers/path-item-helper.js'

const pathLinkTemplate = ([path, pathItem]) => html`<li>
  <a href="${pathItemLink(path, pathItem)}">
    ${pathItem['x-resource-name'] ? pathItem['x-resource-name'] : path}
    ${pathItem['x-link-rel'] ? html`<span class="link-rel">${pathItem['x-link-rel']}</span>` : ''}
  </a>
</li>`

const componentLinkTemplate = (componentName, category) => html`<li>
  <a href="#${`components-${category}-${componentName}`}">${componentName}</a>
</li>`

const componentLinkListTemplate = ([componentCategory, components = []]) => html`
  <h4>${componentCategory}</h4>
  <ul>${Object.keys(components).map(componentName => html`${componentLinkTemplate(componentName, componentCategory)}`)}</ul>
`

const template = ({ paths, components, spec }) => html`
  <nav>
    <h3 class="nav-headline">Resources</h3>
    <ul>
      ${paths.map(pathLinkTemplate)}
    </ul>

    <h3 class="nav-headline">Components</h3>
    ${components.map(componentLinkListTemplate)}

    <ul>
      ${spec.info.contact ? html`<li><a href="#spec-contact">Contact</a></li>` : ''}
    </ul>
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

    this._paths = Object.entries(this.spec.paths)
    return this._paths
  }

  get components () {
    if (this._components) {
      return this._components
    }

    this._components = Object.entries(this.spec.components) || []
    return this._components
  }

  render () {
    render(template({ paths: this.paths, components: this.components, spec: this.spec }), this)
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
