import path from 'path'
import express from 'express'
import jsTemplates from './lib/js-templates.js'

const app = express()

jsTemplates(app)
app.set('views', path.resolve(process.cwd(), 'server/views'))

app.use('/example-specs', express.static('./example-specs'))

app.get('/', (req, res) => {
  res.render('schema', { exampleData: 'hello world' })
})

export default app
