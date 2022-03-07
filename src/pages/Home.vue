<template>
  <div class="home">
    <div class="home-header">
      <div class="home-header-btn-panel">
        <router-link to="history"><button class="btn btn-link">История</button></router-link>
        <router-link :to="{path: 'history', query: { filter: OperationTypeEnum.ADD }}"><button class="btn btn-link">История добалений</button></router-link>
        <router-link :to="{path: 'history', query: { filter: OperationTypeEnum.REMOVE }}"><button class="btn btn-link">История удалений</button></router-link>
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
        <ul v-if="errorData.length > 0" class="errors-list">
          <li v-for="(error, idx) in errorData" :key="idx">
            <strong>{{ error }}</strong>
          </li>
        </ul>
        <box v-else-if="filterData.length > 0" :data="filterData" :isBasket="false" @removeItem="addItemToBasket"/>
      </div>
      <div class="home-body-item">
        <box :data="basketData" :isBasket="true" @removeItem="removeItemFromBasket"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Box from '@/components/Box.vue'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { IPost } from '@/interfaces/interfaces'
import moment from 'moment'
import { OperationTypeEnum } from '@/enums'
import Vue from 'vue'

const DATE_FORMAT = 'DD.MM.YYYY hh:mm'

export default Vue.extend({
  name: 'Home',
  components: { Box },
  data () {
    return {
      OperationTypeEnum
    }
  },
  created ():void {
    const hasData = this.desktopData.length > 0 || this.basketData.length > 0
    if (hasData) return
    this.getPostsDesktop()
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
      'resetBasket'
    ]),
    ...mapActions(['getPostsDesktop']),
    updateData ():void {
      this.getPostsDesktop().then(this.resetBasket)
    },
    addItemToBasket (idx: number):void {
      this.desktopData.forEach((item: IPost):void => {
        if (idx === item.id) {
          this.removeDesktop(idx)
          this.addBasket(item)
          const { id, title } = item
          const date = moment().format(DATE_FORMAT)
          this.writeToHistory(id, title, OperationTypeEnum.ADD, date)
        }
      })
    },
    removeItemFromBasket (idx: number):void {
      this.basketData.forEach((item: IPost):void => {
        if (idx === item.id) {
          this.removeBasket(idx)
          this.addDesktop(item)
          const { id, title } = item
          const date = moment().format(DATE_FORMAT)
          this.writeToHistory(id, title, OperationTypeEnum.REMOVE, date)
        }
      })
    },
    writeToHistory (id: number, title: string, type: string, date: string):void {
      this.recordingHistory({ id, title, type, date })
    }
  },
  computed: {
    ...mapGetters([
      'historyData',
      'desktopData',
      'basketData',
      'filterData',
      'errorData'
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
})
</script>
