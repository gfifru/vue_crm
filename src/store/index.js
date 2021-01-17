import Vue from 'vue'
import Vuex from 'vuex'
import auth from '@/store/auth'
import info from '@/store/info'
import categories from '@/store/categories'
import record from '@/store/record'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null
  },

  mutations: {
    setError(state, error) {
      state.error = error
    },
    clearError(state) {
      state.error = null
    }
  },

  actions: {
    async fetchCurrency() {
      const key = process.env.VUE_APP_FIXER // получаем ключ из файла .env
      const response = await fetch(`http://data.fixer.io/api/latest?access_key=${key}&symbols=USD,EUR,RUB`)
      return await response.json()
    }
  },

  getters: {
    error: s => s.error
  },

  modules: {
    auth,
    info,
    categories,
    record
  }
})
