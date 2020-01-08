/* global window */
import { slugify } from '../../../vendor/transliteration/dist/browser/bundle.esm.min.js'

export const pathID = (path, pathItem) => {
  const id = pathItem && (pathItem['x-link-rel'] || pathItem['x-resource-name']) // Link-Rel over Link-Name over path
  return id || path
}

export const slug = (path, pathItem) => {
  return slugify(pathID(path, pathItem))
}

export const pathItemLink = (path, pathItem) => {
  const location = new URL(window.location)

  location.hash = slug(path, pathItem)

  return location.toString()
}
