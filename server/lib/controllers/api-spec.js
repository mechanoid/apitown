export default ({ query, params }, res) => {
  const spec = query.spec
  const pretty = process.env.NODE_ENV !== 'production' // TODO: move to utils

  res.render('api-spec', { spec, pretty })
}
