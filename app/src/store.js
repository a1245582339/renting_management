import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {

    },
    language: 'zh-HK'
  },
  mutations: {
    setUser(state, info) {
      state.user = info
    },
    setLanguage(state, value) {
      state.language = value
    }
  },
  actions: {

  }
})
