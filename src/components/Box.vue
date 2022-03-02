<template>
  <div class="box">
    <h1>{{ str }}</h1>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Box',
  props: {
    str: String,
    default: ():string => ''
  }
}
</script>
