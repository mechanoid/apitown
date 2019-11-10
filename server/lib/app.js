import express from 'express'
import chalk from 'chalk'
import 'pug'
import { provideAsset } from './helpers/assets.js'

console.info('')

const app = express()

app.set('view engine', 'pug')
app.set('views', 'server/views')

const mainCSS = provideAsset('dist/css/main.css', { app, root: 'dist', prefix: '/assets' })
app.locals.assets = { mainCSS } // make assetPaths availabel in views

const exampleSpecPath = '/example-specs'
console.info(`serve ${chalk.yellow(exampleSpecPath)}`)
app.use(exampleSpecPath, express.static('./example-specs'))

export default app
