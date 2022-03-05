import { IPost, IState, IIdx } from '@/interfaces/intefaces'

export default {
  state: {
    basket: []
  },
  getters: {
    basketData: (state:IState):IPost[] => state.basket
  },
  mutations: {
    addBasket (state:IState, payload:IPost):void {
      state.basket.push(payload)
    },
    removeBasket (state:IState, payload:IIdx):void {
      state.basket.splice(payload.idx, 1)
    },
    resetBasket (state:IState):void {
      state.basket = []
    }
  }
}
