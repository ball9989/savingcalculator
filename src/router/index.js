import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/calculator/:username',
      name: 'SavingCalculator',
      component: () => import('@/components/savingcalculator')
    },
    {
      path: '/calculator',
      name: 'SavingCalculatorLogin',
      component: () => import('@/components/calculatorLogin')
    }
  ]
})
