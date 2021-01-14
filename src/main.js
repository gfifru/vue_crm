import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
import router from './router'
import store from './store'
import dateFilter from '@/filters/date.filter'
import messagePlugin from '@/utils/message.plugin'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'

Vue.config.productionTip = false

// импорт messagePlugin
Vue.use(messagePlugin)

// импорт Vuelidate
Vue.use(Vuelidate)

// импорт фильтров во vue
Vue.filter('date', dateFilter)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
