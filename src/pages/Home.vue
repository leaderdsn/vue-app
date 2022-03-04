<template>
  <div class="home">
    <div class="home-header">
      <div class="home-header-btn-panel">
        <button class="btn btn-link"><router-link to="/history">История</router-link></button>
        <button class="btn btn-link"><router-link to="/history/add">История добалений</router-link></button>
        <button class="btn btn-link"><router-link to="/history/remove">История удалений</router-link></button>
      </div>
      <div class="home-header-item">
        <h2>Рабочий стол</h2>
        <label>
          Поиск по наименованию
          <input class="field-input" type="text" v-model="searchName" />
        </label>
      </div>
      <div class="home-header-item">
        <h2>Корзина</h2>
        <div></div>
      </div>
    </div>
    <div class="home-body">
      <div class="home-body-item">
        <box :data="searchItem" :isBasket="false" @removeItem="addItemToBasket"/>
      </div>
      <div class="home-body-item">
        <box :data="BASKET_DATA" :isBasket="true" @removeItem="removeItemFromBasket"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Box from '@/components/Box.vue'
import { mapGetters } from 'vuex'
import { IPost } from '@/interfaces/intefaces'
import moment from 'moment'

declare interface iBaseData {
  searchName: string,
}

export default {
  name: 'Home',
  components: { Box },
  data (): iBaseData {
    return {
      searchName: ''
    }
  },
  created ():void {
    this.$store.dispatch('getPostsDesktop')
  },
  methods: {
    addItemToBasket (idx: number):void {
      const { commit } = this.$store
      this.DESKTOP_DATA.forEach((item: IPost, index: number):void => {
        if (idx === index) {
          commit('removeDesktop', {
            idx: idx,
            del: 1
          })
          commit('addBasket', item)
          const { id, title } = item
          const date = moment(new Date(), 'DD.MM.YYYY hh:mm').format('DD.MM.YYYY hh:mm')
          this.writedHistory(id, title, 'Добавление', date)
        }
      })
    },
    removeItemFromBasket (idx: number):void {
      const { commit } = this.$store
      this.BASKET_DATA.forEach((item: IPost, index: number):void => {
        if (idx === index) {
          commit('removeBasket', {
            idx: idx,
            del: 1
          })
          commit('addDesktop', item)
          const { id, title } = item
          const date = moment(new Date(), 'DD.MM.YYYY hh:mm').format('DD.MM.YYYY hh:mm')
          this.writedHistory(id, title, 'Удаление', date)
        }
      })
    },
    writedHistory (id: number, title: string, type: string, date: string):void {
      this.$store.commit('writeHistory', {
        id,
        title,
        type,
        date
      })
    }
  },
  computed: {
    // sortDesktop ():iPost[] {
    //   // eslint-disable-next-line vue/no-side-effects-in-computed-properties
    //   return this.searchItem.reverse()
    // },
    // sortBasket ():iPost[] {
    //   // eslint-disable-next-line vue/no-side-effects-in-computed-properties
    //   //return this.basket.reverse()
    // },
    ...mapGetters([
      'HISTORY_DATA',
      'DESKTOP_DATA',
      'BASKET_DATA'
    ]),
    searchItem: function ():IPost[] {
      return this.DESKTOP_DATA.filter((item: IPost):boolean | IPost => {
        return item.title.toLowerCase().indexOf(this.searchName) !== -1
      })
    }
  }

}
</script>

  function commit(arg0: string, arg1: { id: number; title: string; type: string; date: string }) {
    throw new Error('Function not implemented.')
  }

  function commit(arg0: string, arg1: { id: number; title: string; type: string; date: string }) {
    throw new Error('Function not implemented.')
  }

  function commit(arg0: string, arg1: { id: number; title: string; type: string; date: string }) {
    throw new Error('Function not implemented.')
  }

  function commit(arg0: string, arg1: { id: number; title: string; type: string; date: string }) {
    throw new Error('Function not implemented.')
  }
