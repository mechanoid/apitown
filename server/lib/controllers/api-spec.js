export default ({ query, params }, res) => {
  const spec = query.spec
  res.render('api-spec', { spec })
}
