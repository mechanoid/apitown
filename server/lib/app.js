import express from 'express'
import 'pug'

import { provideNodeModuleAsset } from './helpers/vendor-node-module-assets.js'

const app = express()

app.set('view engine', 'pug')
app.set('views', 'server/views')

const bootstrap = provideNodeModuleAsset('node_modules/bootstrap/dist/css/bootstrap.css', { app })
app.locals.assets = { bootstrap } // make assetPaths availabel in views

app.use('/example-specs', express.static('./example-specs'))

export default app
