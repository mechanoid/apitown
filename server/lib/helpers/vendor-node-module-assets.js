import express from 'express'

/**
 * serves static files from node_modules on a public prefix path.
 * `/node_modules will be replaced by the prefix. By default it will be replaced
 * with `/vendor`.
 */
export const provideNodeModuleAsset = (assetPath, { app, prefixPath = '/vendor' }) => {
  const publicPath = assetPath.replace(/^\/?node_modules(\/.*)$/, `${prefixPath}$1`)
  app.use(publicPath, express.static(assetPath))
  return { publicPath }
}
