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
    <div class="history-body" v-for="(item, idx) in HISTORY_DATA" :key="idx" >
      <span>{{ ++idx }}</span>
      <span>{{ item.type }}</span>
      <span>{{ item.id }}</span>
      <span>{{ item.title }}</span>
      <span>{{ item.date }}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'History',
  computed: {
    ...mapGetters([
      'COUNT',
      'HISTORY_DATA'
    ])
  }
}
</script>
