import M from 'materialize-css'
/* eslint-disable no-unused-vars */
export default {
  install(Vue) {
    Vue.prototype.$message = function (html) {
      M.toast({html})
    }
    Vue.prototype.$error = function (html) {
      M.toast({html: `[Ошибка]: ${html}`})
    }
  }
}
/* eslint-disable no-unused-vars */