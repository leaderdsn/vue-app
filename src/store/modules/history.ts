import { IPost, IState } from '@/interfaces/intefaces'

export default {
  state: {
    history: []
  },
  getters: {
    HISTORY_DATA: (state:IState):IPost[] => state.history
  },
  mutations: {
    recordingHistory (state:IState, payload:IPost):void {
      state.history.unshift(payload)
    }
  }
}
