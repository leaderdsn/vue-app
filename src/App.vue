<template>
  <div id="app">
    <navbar />
    <div class="wrapper">
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
