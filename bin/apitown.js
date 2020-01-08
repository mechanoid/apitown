#!/usr/bin/env node

import arg from 'arg'
import chalk from 'chalk'
import app from '../server/index.js'

const args = arg({
  '--serve': [String],
  '--port': Number,

  // aliases
  '-p': '--port'
})

const server = app({
  serveStatic: args['--serve'] || []
}).listen(args['--port'] || process.env.PORT, () => {
  console.info(`
server started, and listens to: ${chalk.yellow(server.address().port)}`)
})
