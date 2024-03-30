<script>
import Navbar from "@/components/Navbar.vue";



export default {
  components: {
    Navbar,
  },
  methods: {
    pageCreated(pageObj) {
      this.pages.push(pageObj)
    }
  }
}
</script>

<template>
  <navbar>
  </navbar>

  <router-view>

  </router-view>

</template>

<style scoped>

</style>
