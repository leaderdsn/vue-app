import { IPost, IState, IDel } from '@/interfaces/intefaces'

export default {
  state: {
    basket: []
  },
  getters: {
    BASKET_DATA: (state:IState):IPost[] => state.basket
  },
  mutations: {
    addBasket (state:IState, payload:IPost):void {
      state.basket.push(payload)
    },
    removeBasket (state:IState, payload:IDel):void {
      state.basket.splice(payload.idx, payload.del)
    }
  }
}
