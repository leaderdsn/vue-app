<template>
  <div class="block">
    <div class="block-header">
      <slot name="b-header" :item="data"/>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType } from 'vue/types/options'
interface ComplexItems {
  id: string,
  name: string,
}
export default {
  name: 'Block',
  props: {
    data: {
      type: Object as PropType<ComplexItems>,
      default: ():PropType<ComplexItems> => []
    }
  },
  methods: {}
}
</script>
