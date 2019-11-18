import path from 'path'
import express from 'express'
import chalk from 'chalk'
import 'pug'
import { provideAsset } from './helpers/assets.js'

console.info('')

const app = express()

app.set('view engine', 'pug')
app.set('views', 'server/views')

const appAssetPath = '/assets/app'
console.info(`serve ${chalk.yellow(appAssetPath)}`)
app.use(appAssetPath, express.static('./client'))

const mainCSS = provideAsset('dist/css/main.css', { app, root: 'dist', prefix: '/assets' })
const jsYaml = provideAsset('node_modules/js-yaml/dist/js-yaml.min.js', { app, root: 'node_modules', prefix: '/assets/vendor' })

// serve dependencassets, so they can be included in JS imports
const vendorLibs = ['node_modules/skeme/index.js', 'node_modules/lit-html/lit-html.js', 'node_modules/lit-html/lib']
vendorLibs.forEach(lib => provideAsset(lib, { app, root: 'node_modules', prefix: '/assets/vendor' }))

app.locals.assets = {}
app.locals.assets.app = (libPath) => path.join(appAssetPath, libPath)
app.locals.assets.vendor = { mainCSS, jsYaml } // make assetPaths availabel in views

const exampleSpecPath = '/example-specs'
console.info(`serve ${chalk.yellow(exampleSpecPath)}`)
app.use(exampleSpecPath, express.static('./example-specs'))

export default app
