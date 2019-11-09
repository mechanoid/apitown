#!/usr/bin/env node --experimental-modules

import app from '../index.js'

const server = app.listen(process.env.PORT, () => {
  console.log('server started, and listens to:', server.address().port)
})
