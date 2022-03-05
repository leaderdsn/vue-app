import { IPost, IState } from '@/interfaces/intefaces'
export const SOME_MUTATION = 'SOME_MUTATION'
export default {
  state: {
    history: []
  },
  getters: {
    historyData: (state:IState):IPost[] => state.history
  },
  mutations: {
    recordingHistory (state:IState, payload:IPost):void {
      state.history.unshift(payload)
    }
  }
}
