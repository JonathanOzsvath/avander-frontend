import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from "@/router";
import store from "@/store";
import axios from "axios";

Vue.config.productionTip = false

axios.defaults.baseURL = 'https://localhost:5001/api/';

new Vue({
  render: h => h(App),
  store,
  router,
  vuetify,
}).$mount('#app')
