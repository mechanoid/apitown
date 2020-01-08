import { isDevelopment } from '../helpers/app.js'

export default ({ query, params }, res) => {
  const spec = query.spec
  const pretty = isDevelopment() // TODO: move to utils

  res.render('api-spec', { spec, pretty })
}
