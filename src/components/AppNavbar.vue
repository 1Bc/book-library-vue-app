<script>

export default {
  inject: ['$pages', '$bus'],
  created() {

  },

  data() {
    return {
      theme: 'dark',
      pages: []
    };
  }
}
</script>

<template>
  <nav
      :class="[`navbar-${theme}`, `bg-${theme}`, 'navbar', 'navbar-expand-lg']"
  >
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Book Library</a>
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li>
          <router-link
              :to="`/authors/`"
              class="nav-link"
              active-class="active"
          >
            Authors
          </router-link>
        </li>
        <li>
          <router-link
              :to="`/books/`"
              class="nav-link"
              active-class="active"
          >
            Books
          </router-link>
        </li>
        <li>
          <router-link
              :to="`/readers/`"
              class="nav-link"
              active-class="active"
          >
            Readers
          </router-link>
        </li>
        <li>
          <router-link
              :to="`/rentals/`"
              class="nav-link"
              active-class="active"
          >
            Rentals
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
li{
  cursor:pointer;
}
</style>
