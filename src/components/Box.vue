<template>
  <div class="box">
    <div
      class="block"
      :class="isBasket ? 'block--basket' : ''"
      v-for="(item, idx) in data"
      :key="idx"
    >
      <div class="block-header">
        <strong>{{ item.id }}</strong>
        <p>{{ item.title }}</p>
        <button class="btn btn--primary" @click="removeItem(item.id)">{{isBasket ? '-' : '+'}}</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType } from 'vue/types/options'
import Vue from 'vue'
import { IPost } from '@/interfaces/interfaces'
export default Vue.extend({
  name: 'Box',
  props: {
    data: {
      type: Array as PropType<IPost[]>,
      default: () => []
    },
    isBasket: {
      type: Boolean,
      default: (): boolean => false
    }
  },
  methods: {
    removeItem (idx: number):void {
      this.$emit('removeItem', idx)
    }
  }
})
</script>
