import permisson from '../function/permisson'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { parse } from './side-menu.js'
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const defaultTitle = document.title
const importAll = context => {
  const routes = []
  for (const key of context.keys()) {
    const keyArr = key.split('/')
    keyArr.shift()
    const path = keyArr
      .join('.')
      .replace(/\.index\.vue$/g, '')
      .split('--')
      .join('/')
    const component = context(key).default
    const pid = component.pid || '*'

    routes.push({
      path: '/' + path,
      component,
      name: component.name || path,
      meta: {
        pid,
        title: component.title || defaultTitle,
      },
    })
  }
  return routes
}

const layoutViews = importAll(require.context('../layout-views', true, /.+\/index\.vue$/))
const views = importAll(require.context('../views', true, /.+\/index\.vue$/)).map(config => {
  if (config.path === '/layout') {
    config.children = layoutViews
  }
  return config
})

const router = new VueRouter({
  routes: views,
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  const meta = to.meta
  document.title = meta.title
  if (!to.matched.length) {
    next({ path: '/404', replace: true })
  } else {
    if (permisson.check(meta.pid)) {
      next()
    } else {
      next({ path: '/401', replace: true })
    }
  }
  NProgress.done()
})

const routes = [...views, ...layoutViews].reduce((table, view) => {
  table[view.path] = view
  return table
}, {})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const sideMenuConfig = parse(routes)
export { router, routes, sideMenuConfig }
