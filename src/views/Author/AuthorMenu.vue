<script setup>

</script>

<template>
  <div class="container">
    <h2 class="text-center"> Author Management</h2>
    <Suspense>
      <!-- component with nested async dependencies -->
      <router-view>

      </router-view>

      <!-- loading state via #fallback slot -->
      <template #fallback>
        Loading...
      </template>
    </Suspense>

  </div>
</template>


<style scoped>

</style>