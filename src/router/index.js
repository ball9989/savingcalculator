import Vue from 'vue'
import Router from 'vue-router'
import SavingCalculator from '@/components/SavingCalculator'
import calculatorLogin from '@/components/calculatorLogin'
import redirect from '@/components/redirect'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/calculator/:username',
      name: 'SavingCalculator',
      component: SavingCalculator
    },
    {
      path: '/calculator',
      name: 'SavingCalculatorLogin',
      component: calculatorLogin
    },
    {
      path: '*',
      name: '404', 
      component: redirect
    }
  ]
})

