import app from './lib/app.js'
import schemaController from './lib/controllers/schema.js'

app.get('/', schemaController)

export default app
