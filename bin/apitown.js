#!/usr/bin/env node
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path'

import arg from 'arg'
import chalk from 'chalk'
import app from '../server/index.js'

const __dirname = dirname(fileURLToPath(import.meta.url));

const args = arg({
  '--serve': [String],
  '--port': Number,

  // aliases
  '-p': '--port'
})

const server = app({
  serveStatic: args['--serve'] || [],
  apiTownModuleRoot: resolve(__dirname, '..')
}).listen(args['--port'] || process.env.PORT, () => {
  console.info(`
server started, and listens to: ${chalk.yellow(server.address().port)}`)
})
