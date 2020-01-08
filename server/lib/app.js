import { fileURLToPath } from 'url'
import path from 'path'
import express from 'express'
import chalk from 'chalk'
import morgan from 'morgan'
import 'pug'
import { provideAsset } from './helpers/assets.js'
import { isDevelopment } from './helpers/app.js'

// because of esm modules we need to go for import.meta, which is not yet valid to eslint :/
const __dirname = fileURLToPath(import.meta.url)

console.info('')

const app = express()
app.use(morgan('combined'))
app.set('view engine', 'pug')
app.set('views', 'server/views')

const appAssetPath = '/assets/app'
console.info(`serve ${chalk.yellow(appAssetPath)}`)
app.use(appAssetPath, express.static('./client'))

const mainCSS = provideAsset('dist/css/main.css', { app, root: 'dist', prefix: '/assets' })
const jsYaml = provideAsset('node_modules/js-yaml/dist/js-yaml.min.js', { app, root: 'node_modules', prefix: '/assets/vendor' })

// serve dependencassets, so they can be included in JS imports
const vendorLibs = [
  'node_modules/skeme/index.js',
  'node_modules/lit-html/lit-html.js',
  'node_modules/lit-html/directives',
  'node_modules/lit-html/lib',
  'node_modules/marked/lib/marked.esm.js',
  'node_modules/transliteration/dist/browser/bundle.esm.min.js'
]

vendorLibs.forEach(lib => provideAsset(lib, { app, root: 'node_modules', prefix: '/assets/vendor' }))

app.locals.assets = {}
app.locals.assets.app = (libPath) => path.join(appAssetPath, libPath)
app.locals.assets.vendor = { mainCSS, jsYaml } // make assetPaths availabel in views

const exampleSpecPath = '/example-specs'
console.info(`serve ${chalk.yellow(exampleSpecPath)}`)

if (isDevelopment()) {
  const examplesFolder = path.resolve(__dirname, '../../../example-specs')
  app.use(exampleSpecPath, express.static(examplesFolder))
}

export default app
