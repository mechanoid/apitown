exports.config = {
  tests: 'tests/e2e/*-test.js',
  output: './output',
  helpers: {
    Puppeteer: {
      url: 'http://localhost',
      show: false
    }
  },
  include: {
    I: 'tests/e2e/steps.js'
  },
  bootstrap: null,
  mocha: {},
  name: 'apitown'
}
