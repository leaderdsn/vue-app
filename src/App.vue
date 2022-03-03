<template>
  <div id="app">
    <div class="wrapper">
      <navbar />
      <router-view />
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
  components: { Navbar }
}
</script>
