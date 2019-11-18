export default ({ query, params }, res) => {
  const spec = query.spec
  res.render('schema', { spec })
}
