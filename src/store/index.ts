import Vue from 'vue'
import Vuex from 'vuex'
import history from '@/store/modules/history'
import desktop from '@/store/modules/desktop'
import basket from '@/store/modules/basket'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    history,
    desktop,
    basket
  }
})
