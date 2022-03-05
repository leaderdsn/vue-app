import apiService from '@/services/apiService'
import { IPost, IState, IIdx } from '@/interfaces/intefaces'
import { ActionContext } from 'vuex'
import { AxiosResponse } from 'axios'

export default {
  state: {
    desktop: [],
    filterValue: '',
    errors: []
  },
  getters: {
    desktopData: (state:IState):IPost[] => state.desktop,
    errorData: (state:IState):string[] => state.errors,
    filterData: (state:IState):IPost[] => {
      if (state.filterValue.length === 0) return state.desktop
      const filteredItems = state.desktop.filter(item => item.title.indexOf(state.filterValue) !== -1)
      const calcImportant = (item:IPost) => item.title.split(state.filterValue).length - 1

      return filteredItems.sort((itemA, itemB) => calcImportant(itemA) - calcImportant(itemB))
    }
  },
  mutations: {
    addDesktop (state:IState, payload:IPost):void {
      state.desktop.unshift(payload)
    },
    removeDesktop (state:IState, payload:IIdx):void {
      state.desktop.splice(payload.idx, 1)
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
    getPostsDesktop ({ commit }:ActionContext<IPost[], string>):Promise<AxiosResponse<IPost[], string>> {
      return apiService.getPosts()
        .then(response => {
          commit('setData', response.data)
          commit('clearErrData')
          return response
        })
        .catch(error => {
          commit('errData', error)
          throw error
        })
    }
  }
}
