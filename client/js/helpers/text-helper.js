import { html } from '../../../vendor/lit-html/lit-html.js'

export const dynamicHeadline = (headline, level = 4) => {
  if (level === 1) {
    return html`<h1>${headline}</h1>`
  } else if (level === 2) {
    return html`<h2>${headline}</h2>`
  } else if (level === 3) {
    return html`<h3>${headline}</h3>`
  } else if (level === 4) {
    return html`<h4>${headline}</h4>`
  } else if (level === 5) {
    return html`<h5>${headline}</h5>`
  } else if (level === 6) {
    return html`<h6>${headline}</h6>`
  }
}
