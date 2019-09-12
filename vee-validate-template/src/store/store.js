import Vue from 'vue'
import Vuex from 'vuex'

import validation from './general/store-validation.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    validation
  }
})
