import express from 'express'

const app = express()

app.use('/example-specs', express.static('./example-specs'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

export default app
