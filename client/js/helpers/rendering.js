import { html } from '../../../vendor/lit-html/lit-html.js'
import { unsafeHTML } from '../../../vendor/lit-html/directives/unsafe-html.js'
import marked from '../../../vendor/marked/lib/marked.esm.js'

export const richText = text => unsafeHTML(marked(text))

export const link = (labelOrLink, href) => href ? html`<a href="${href}">${labelOrLink}</a>` : html`<a href="${labelOrLink}">${labelOrLink}</a>`
