import path from 'path'
import express from 'express'
import chalk from 'chalk'

/**
 * serves static files from node_modules on a public prefix path.
 * `/node_modules will be replaced by the prefix. By default it will be replaced
 * with `/vendor`.
 */
export const provideAsset = (assetPath, { app, prefix = '/vendor', root = 'node_modules' }) => {
  const publicPath = assetPath.replace(new RegExp(`^/?${root}(/.*)$`), `${prefix}$1`)

  try {
    const fullAssetPath = path.resolve(process.cwd(), assetPath)
    console.info(`providing "${chalk.yellow(assetPath)}" as "${chalk.yellow(publicPath)}"`)

    app.use(publicPath, express.static(fullAssetPath))
    return { publicPath }
  } catch (e) {
    console.error('cannot resolve asset file', e.message)
  }
}
