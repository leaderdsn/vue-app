<template>
  <div class="box">
    <block
      :class="isBasket ? 'block--basket' : ''"
      v-for="(item, idx) in data"
      :key="idx" :data="item"
    >
      <template v-slot:b-header="{ item }">
        <strong>{{ item.id }}</strong>
        <p>{{ item.title }}</p>
        <button class="btn" @click="removeItem(idx)">{{isBasket ? '-' : '+'}}</button>
      </template>
    </block>
  </div>
</template>

<script lang="ts">
import { ArrayPropsDefinition } from 'vue/types/options'
import Block from '@/components/Block.vue'
export default {
  components: { Block },
  name: 'Box',
  props: {
    data: {
      type: Array,
      default: ():ArrayPropsDefinition<ObjectConstructor> => []
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
}
</script>
