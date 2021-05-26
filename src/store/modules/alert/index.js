import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
    state() {
        return {
            message: '',
            type: null,
            show: false
        };
    },
    mutations,
    actions,
    getters
};