import app from './lib/app.js'
import apiSpecController from './lib/controllers/api-spec.js'

app.get('/', apiSpecController)

export default app
