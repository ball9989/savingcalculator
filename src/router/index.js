import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/calculator',
      name: 'Saving Calculator',
      component: () => import('@/components/savingcalculator')
    }
  ]
})
