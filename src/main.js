import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from "@/router";
import store from "@/store";
import axios from "axios";

Vue.config.productionTip = false

axios.defaults.baseURL = 'http://127.0.0.1:8000/api/';

new Vue({
  render: h => h(App),
  store,
  router,
  vuetify,
}).$mount('#app')
