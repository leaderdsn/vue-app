<template>
  <div id="app">
    <navbar />
    <div class="wrapper">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import Navbar from '@/components/Navbar.vue'

export default {
  components: { Navbar }
}
</script>
