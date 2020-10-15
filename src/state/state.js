import Vue from 'vue'
const state = Vue.observable({
  token: null,
  userInfo: {},
  permissons: [2],
})
Vue.prototype.$state = state
export default state
