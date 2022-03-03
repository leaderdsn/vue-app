<template>
  <div class="box">
    <block v-for="(item, idx) in data" :key="idx" :data="item">
      <template v-slot:b-header="{ item }">
        <strong>{{ item.id }}</strong>
        <p>{{ item.name }}</p>
        <button @click="addItem(idx)">+</button>
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
    }
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  data () {
    return {}
  },
  methods: {
    addItem (idx: number):void {
      this.$emit('addItem', idx)
    }
  }
}
</script>
