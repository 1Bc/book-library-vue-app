<script>
import AppNavbar from "@/components/AppNavbar.vue";



export default {
  components: {
    AppNavbar
  }
}
</script>
<template>
  <app-navbar>
  </app-navbar>

  <router-view>

  </router-view>
</template>


<style>
button {
  background: #009435;
  border: 1px solid #009435;
}
.small-container {
  max-width: 680px;
}
</style>
