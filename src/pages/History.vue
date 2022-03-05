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
    <div v-if="HISTORY_DATA.length !== 0">
      <div class="history-body" v-for="(item, idx) in historyFilter" :key="idx" >
        <span>{{ ++idx }}</span>
        <span>{{ item.type }}</span>
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
import { IPost } from '@/interfaces/intefaces'
export default {
  name: 'History',
  computed: {
    ...mapGetters(['HISTORY_DATA']),
    historyFilter: function ():IPost[] {
      if (this.$route.query.filter === 'added') {
        return this.HISTORY_DATA.filter((item: { type: string }) => item.type === 'Добавление')
      } else
      if (this.$route.query.filter === 'deletion') {
        return this.HISTORY_DATA.filter((item: { type: string }) => item.type === 'Удаление')
      } else {
        return this.HISTORY_DATA
      }
    }
  }
}
</script>
