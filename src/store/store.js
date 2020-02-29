import Vue from 'vue'
import Vuex from 'vuex'

import PersonnesStore from './modules/personnes/PersonnesStore'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        'personnes': PersonnesStore
    }
})