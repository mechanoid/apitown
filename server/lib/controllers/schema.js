export default (req, res) => {
  res.render('schema', { exampleData: '<script>alert("hello");</script>' })
}
