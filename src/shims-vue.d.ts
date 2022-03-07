import { Store } from 'vuex'
import { IState } from '@/interfaces/intefaces'
import { Route } from 'vue-router'
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<IState>
    $route: Route
  }
}
