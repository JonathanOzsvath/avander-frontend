import Vue from 'vue'
import Vuex from 'vuex'

import alertModule from './modules/alert/index.js';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        alert: alertModule
    }
})
