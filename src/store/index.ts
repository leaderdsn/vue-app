import Vue from 'vue'
import Vuex from 'vuex'
import apiService from '@/services/apiService'
import { IPost, IState, IDel } from '@/interfaces/intefaces'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    history: [],
    desktop: [],
    basket: []
  },
  getters: {
    HISTORY_DATA: (state) => state.history,
    DESKTOP_DATA: (state) => state.desktop,
    BASKET_DATA: (state) => state.basket
  },
  mutations: {
    writeHistory (state:IState, payload:IPost) {
      state.history.push(payload)
    },
    addBasket (state:IState, payload:IPost) {
      state.basket.push(payload)
    },
    addDesktop (state:IState, payload:IPost) {
      state.desktop.push(payload)
    },
    removeBasket (state:IState, payload:IDel) {
      state.basket.splice(payload.idx, payload.del)
    },
    removeDesktop (state:IState, payload:IDel) {
      state.desktop.splice(payload.idx, payload.del)
    },
    setData (state:IState, payload:IPost[]) {
      state.desktop = payload
    }
  },
  actions: {
    getPostsDesktop ({ commit }):void {
      apiService.getPosts()
        .then(response => {
          commit('setData', response.data)
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  modules: {
  }
})
