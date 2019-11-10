import express from 'express'
import 'pug'

const app = express()

app.set('view engine', 'pug')
app.set('views', 'server/views')

app.use('/example-specs', express.static('./example-specs'))

export default app
