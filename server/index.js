import app from './lib/app.js'
import apiSpecController from './lib/controllers/api-spec.js'

export default config => {
  const router = app(config)
  router.get('/', apiSpecController)
  return router
}
