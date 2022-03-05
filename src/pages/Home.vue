<template>
  <div class="home">
    <div class="home-header">
      <div class="home-header-btn-panel">
        <router-link to="history"><button class="btn btn-link">История</button></router-link>
        <router-link :to="{path: 'history', query: { filter: 'added' }}"><button class="btn btn-link">История добалений</button></router-link>
        <router-link :to="{path: 'history', query: { filter: 'deletion' }}"><button class="btn btn-link">История удалений</button></router-link>
        <button class="btn btn--primary" @click="updateData">Обновить данные</button>
      </div>
      <div class="home-header-item">
        <h2>Рабочий стол</h2>
        <label>
          Поиск по наименованию
          <input class="field-input" type="text" v-model="searchValue" />
        </label>
      </div>
      <div class="home-header-item">
        <h2>Корзина</h2>
        <div></div>
      </div>
    </div>
    <div class="home-body">
      <div class="home-body-item">
        <box v-if="UPLOADED" :data="FILTER_DATA" :isBasket="false" @removeItem="addItemToBasket"/>
        <ui v-else-if="!UPLOADED && ERROR_DATA.length !== 0" class="errors-list">
          <li v-for="(error, idx) in ERROR_DATA" :key="idx">
            <strong>{{ error }}</strong>
          </li>
        </ui>
      </div>
      <div class="home-body-item">
        <box :data="BASKET_DATA" :isBasket="true" @removeItem="removeItemFromBasket"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Box from '@/components/Box.vue'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { IPost } from '@/interfaces/intefaces'
import moment from 'moment'

export default {
  name: 'Home',
  components: { Box },
  created ():void {
    if (!this.UPLOADED) {
      this.getPostsDesktop()
    }
  },
  methods: {
    ...mapMutations([
      'recordingHistory',
      'addBasket',
      'addDesktop',
      'removeBasket',
      'removeDesktop',
      'setData',
      'setFilterValue',
      'setUploaded'
    ]),
    ...mapActions(['getPostsDesktop']),
    updateData ():void {
      this.setUploaded(true)
      this.getPostsDesktop()
    },
    addItemToBasket (idx: number):void {
      this.DESKTOP_DATA.forEach((item: IPost, index: number):void => {
        if (idx === item.id) {
          this.removeDesktop({ idx: index, del: 1 })
          this.addBasket(item)
          const { id, title } = item
          const date = moment(new Date(), 'DD.MM.YYYY hh:mm').format('DD.MM.YYYY hh:mm')
          this.writeToHistory(id, title, 'Добавление', date)
        }
      })
    },
    removeItemFromBasket (idx: number):void {
      this.BASKET_DATA.forEach((item: IPost, index: number):void => {
        if (idx === item.id) {
          this.removeBasket({ idx: index, del: 1 })
          this.addDesktop(item)
          const { id, title } = item
          const date = moment(new Date(), 'DD.MM.YYYY hh:mm').format('DD.MM.YYYY hh:mm')
          this.writeToHistory(id, title, 'Удаление', date)
        }
      })
    },
    writeToHistory (id: number, title: string, type: string, date: string):void {
      this.recordingHistory({ id, title, type, date })
    }
  },
  computed: {
    ...mapGetters([
      'HISTORY_DATA',
      'DESKTOP_DATA',
      'BASKET_DATA',
      'FILTER_DATA',
      'ERROR_DATA',
      'UPLOADED'
    ]),
    searchValue: {
      get: function (): IPost[] {
        return this.$store.state.desktop.filterValue
      },
      set: function (value:string):void {
        this.setFilterValue(value)
      }
    }
  }
}
</script>
