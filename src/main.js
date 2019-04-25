// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'
import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import Axios from 'axios'
import VueAxios from 'vue-axios'
import store from './store'
Axios.defaults.withCredentials=true;//设置允许携带Cookie信息,服务器session身份验证
Vue.use(VueAxios,Axios)
Vue.use(VueAwesomeSwiper)
Vue.config.devtools = true
Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
