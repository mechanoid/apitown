#!/usr/bin/env node --experimental-modules

import chalk from 'chalk'
import app from '../server/index.js'

const server = app.listen(process.env.PORT, () => {
  console.info(`
server started, and listens to: ${chalk.yellow(server.address().port)}`)
})
