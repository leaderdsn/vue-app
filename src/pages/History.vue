<template>
  <div class="history">
    <div class="history-title">
      <div class="wrapper">
        <span class="description">№</span>
        <span class="description">тип операции</span>
        <span class="description">id</span>
        <span class="description">наименование</span>
        <span class="description">дата</span>
      </div>
    </div>
    <div v-if="historyData.length !== 0" class="history-body">
      <div class="history-body-item" v-for="(item, idx) in historyFilter" :key="idx" >
        <span>{{ idx+1 }}</span>
        <span>{{ prepareOperationType(item.type) }}</span>
        <span>{{ item.id }}</span>
        <span>{{ item.title }}</span>
        <span>{{ item.date }}</span>
      </div>
    </div>
    <div v-else>
      <h1>Записей в истории нет</h1>
    </div>
  </div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex'
import { IPost } from '@/interfaces/interfaces'
import OperationTypeEnum from '@/enums/OperationTypeEnum'
import Vue from 'vue'

export default Vue.extend({
  name: 'History',
  methods: {
    prepareOperationType (type: string | undefined): string {
      switch (type) {
        case 'added':
          return 'Добавление'
        case 'removed':
          return 'Удаление'
        default:
          return ''
      }
    }
  },
  computed: {
    ...mapGetters(['historyData']),
    historyFilter: function ():IPost[] {
      if (this.$route.query.filter === OperationTypeEnum.ADD) {
        return this.historyData.filter((item: { type: string}) => item.type === OperationTypeEnum.ADD)
      } else
      if (this.$route.query.filter === OperationTypeEnum.REMOVE) {
        return this.historyData.filter((item: { type: string}) => item.type === OperationTypeEnum.REMOVE)
      } else {
        return this.historyData
      }
    }
  }
})
</script>
