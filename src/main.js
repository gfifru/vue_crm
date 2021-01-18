import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
import router from './router'
import store from './store'
import dateFilter from '@/filters/date.filter'
import currencyFilter from '@/filters/currency.filter'
import localizeFilter from '@/filters/localize.filter'
import tooltipDirectives from '@/directives/tooltip.directives'
import messagePlugin from '@/utils/message.plugin'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'
import Paginate from 'vuejs-paginate'

import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/database'

import Loader from '@/components/app/Loader'

Vue.config.productionTip = false

// импорт messagePlugin
Vue.use(messagePlugin)

// импорт Vuelidate
Vue.use(Vuelidate)

// импорт фильтров во vue
Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.filter('localize', localizeFilter)

// импорт директив
Vue.directive('tooltip', tooltipDirectives)

// импорт компонентов во vue глобально
Vue.component('Loader', Loader)

// пагинация
Vue.component('paginate', Paginate)


firebase.initializeApp({
  apiKey: "AIzaSyCVLjUe50vDbuEDcSFUkNf0669LF8gV3W0",
  authDomain: "crmvue-305e8.firebaseapp.com",
  projectId: "crmvue-305e8",
  storageBucket: "crmvue-305e8.appspot.com",
  messagingSenderId: "248481964245",
  appId: "1:248481964245:web:df42e50ae5d621d5b1025c"
})

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
