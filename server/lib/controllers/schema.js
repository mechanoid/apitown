export default ({ query, params }, res) => {
  console.log(params)
  console.log(query)
  res.render('schema')
}
