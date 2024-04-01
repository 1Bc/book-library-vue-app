<script setup>

import LoadingPage from "@/components/LoadingPage.vue";
</script>

<template>
  <div class="container">
    <h2 class="text-center"> Book Management</h2>
    <Suspense>
      <!-- component with nested async dependencies -->
      <router-view>

      </router-view>

      <!-- loading state via #fallback slot -->
      <template #fallback>
        <LoadingPage >

        </LoadingPage>
      </template>
    </Suspense>

  </div>
</template>

<style scoped>

</style>