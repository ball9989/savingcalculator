// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import * as firebase from 'firebase'

Vue.config.productionTip = false

var firebaseConfig = {
  apiKey: "AIzaSyBuE8lWWdYTPegFBwetoCmqqeOmnojMZDM",
  authDomain: "savingcalculator-3f83a.firebaseapp.com",
  databaseURL: "https://savingcalculator-3f83a.firebaseio.com",
  projectId: "savingcalculator-3f83a",
  storageBucket: "savingcalculator-3f83a.appspot.com",
  messagingSenderId: "7397992000",
  appId: "1:7397992000:web:ba63766a807075a99de1a5",
  measurementId: "G-EZBBZ14D1D"
};

firebase.initializeApp(firebaseConfig);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
