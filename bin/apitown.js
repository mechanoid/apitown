#!/usr/bin/env node --experimental-modules

import arg from 'arg'
import chalk from 'chalk'
import app from '../server/index.js'

const args = arg({
  '--serve': [String]
})

const server = app({
  serveStatic: args['--serve'] || []
}).listen(process.env.PORT, () => {
  console.info(`
server started, and listens to: ${chalk.yellow(server.address().port)}`)
})
