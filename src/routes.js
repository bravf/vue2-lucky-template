const importAll = context => {
  const routes = []
  for (const key of context.keys()) {
    const keyArr = key.split('/')
    keyArr.shift()
    routes.push({
      path: keyArr.join('.').replace(/\.index\.vue$/g, ''),
      component: context(key).default,
    })
  }
  return routes
}

const layoutViews = importAll(require.context('./layout-views', true, /.+\/index\.vue$/))
const views = importAll(require.context('./views', true, /.+\/index\.vue$/)).map(config => {
  config.path = '/' + config.path
  if (config.path === '/layout') {
    config.path = '/app'
    config.children = layoutViews
  }
  return config
})

export default views
