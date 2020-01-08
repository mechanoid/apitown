
import { join, resolve } from 'path'
import express from 'express'
import chalk from 'chalk'
import morgan from 'morgan'
import 'pug'
import { provideAsset } from './helpers/assets.js'

export default ({ serveStatic, apiTownModuleRoot } = {}) => {
  console.info('')

  const app = express()
  app.use(morgan('combined'))
  app.set('view engine', 'pug')
  app.set('views', resolve(apiTownModuleRoot, './server/views'))

  const appAssetPath = '/assets/app'
  console.info(`serve ${chalk.yellow(appAssetPath)}`)
  app.use(appAssetPath, express.static(resolve(apiTownModuleRoot, './client')))

  const mainCSS = provideAsset('dist/css/main.css', { app, root: 'dist', prefix: '/assets', resolveRoot: apiTownModuleRoot })
  const jsYaml = provideAsset('node_modules/js-yaml/dist/js-yaml.min.js', { app, root: 'node_modules', prefix: '/assets/vendor', resolveRoot: apiTownModuleRoot })

  // serve dependencassets, so they can be included in JS imports
  const vendorLibs = [
    'node_modules/skeme/index.js',
    'node_modules/lit-html/lit-html.js',
    'node_modules/lit-html/directives',
    'node_modules/lit-html/lib',
    'node_modules/marked/lib/marked.esm.js',
    'node_modules/transliteration/dist/browser/bundle.esm.min.js'
  ]

  vendorLibs.forEach(lib => provideAsset(lib, { app, root: 'node_modules', prefix: '/assets/vendor', resolveRoot: apiTownModuleRoot }))

  app.locals.assets = {}
  app.locals.assets.app = (libPath) => join(appAssetPath, libPath)
  app.locals.assets.vendor = { mainCSS, jsYaml } // make assetPaths availabel in views

  if (serveStatic) {
    serveStatic.forEach(staticFileMount => {
      const [fileOrFolder, mountPath] = staticFileMount.split(':')
      if (!(fileOrFolder && mountPath)) {
        throw new Error(`${staticFileMount} is not provided in the format of "fileOrFolder:mountPath"`)
      }
      app.use(mountPath, express.static(resolve(process.cwd(), fileOrFolder)))
      console.info(`serve ${chalk.yellow(fileOrFolder)} at ${chalk.yellow(mountPath)}`)
    })
  }

  return app
}
