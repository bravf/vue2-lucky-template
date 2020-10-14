import permisson from './permisson'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const importAll = context => {
  const routes = []
  for (const key of context.keys()) {
    const keyArr = key.split('/')
    keyArr.shift()
    const path = keyArr.join('.').replace(/\.index\.vue$/g, '')
    const component = context(key).default
    const allowPermissons = component.allowPermissons || ['*']

    routes.push({
      path,
      component,
      name: component.name || path,
      meta: {
        allowPermissons,
      },
    })
  }
  return routes
}

const layoutViews = importAll(require.context('../layout-views', true, /.+\/index\.vue$/))
const views = importAll(require.context('../views', true, /.+\/index\.vue$/)).map(config => {
  config.path = '/' + config.path
  if (config.path === '/layout') {
    config.path = '/app'
    config.children = layoutViews
  }
  return config
})

const router = new VueRouter({
  routes: views,
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (permisson.check(...to.meta.allowPermissons)) {
    next()
  } else {
    next({ path: '/401', replace: true })
  }
  NProgress.done()
})

// console.log(views)

export default router
