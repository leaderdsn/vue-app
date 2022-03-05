import apiService from '@/services/apiService'
import { IPost, IState, IDel } from '@/interfaces/intefaces'
import { ActionContext } from 'vuex'

export default {
  state: {
    desktop: [],
    filterValue: '',
    errors: [],
    uploaded: false
  },
  getters: {
    UPLOADED: (state:IState):boolean => state.uploaded,
    DESKTOP_DATA: (state:IState):IPost[] => state.desktop,
    ERROR_DATA: (state:IState):string[] => state.errors,
    FILTER_DATA: (state:IState):IPost[] => {
      if (state.filterValue.length === 0) return state.desktop

      const filteredItems = state.desktop.filter((item) => {
        return item.title.indexOf(state.filterValue) !== -1
      })

      function calcImportant (item:IPost) {
        let important = 0
        return (important += item.title.split(state.filterValue).length - 1)
      }
      return filteredItems.sort((itemA, itemb) => calcImportant(itemA) - calcImportant(itemb))
    }
  },
  mutations: {
    addDesktop (state:IState, payload:IPost):void {
      state.desktop.unshift(payload)
    },
    setUploaded (state:IState, payload:boolean):void {
      state.uploaded = payload
    },
    removeDesktop (state:IState, payload:IDel):void {
      state.desktop.splice(payload.idx, payload.del)
    },
    setData (state:IState, payload:IPost[]):void {
      state.desktop = payload
    },
    errData (state:IState, payload:string):void {
      state.errors.push(payload)
    },
    clearErrData (state:IState):void {
      state.errors = []
    },
    setFilterValue (state:IState, payload:string):void {
      state.filterValue = payload
    }
  },
  actions: {
    getPostsDesktop ({ commit }:ActionContext<IState, IPost>):void {
      apiService.getPosts()
        .then(response => {
          commit('setData', response.data)
          commit('setUploaded', true)
          commit('clearErrData')
          console.log(response)
        })
        .catch(error => {
          commit('errData', error)
          commit('setUploaded', false)
          console.log(error)
        })
    }
  }
}
