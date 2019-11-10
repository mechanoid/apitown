const templateEngine = async (viewName, data, callback) => {
  try {
    const view = await import(viewName)
    const rendered = view.default(data)

    callback(null, rendered)
  } catch (e) {
    callback(e)
  }
}

export default app => {
  app.engine('js', templateEngine)
  app.set('view engine', 'js')
}
