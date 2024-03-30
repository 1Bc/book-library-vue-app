<script>
import NavbarLink from "./NavbarLink.vue";

export default {
  components: {
    NavbarLink
  },
  inject: ['$pages', '$bus'],
  created() {
    this.getThemeSettings();
    this.pages = this.$pages.getAllPages();

    this.$bus.$on('page-updated', () => {
      this.pages = [...this.$pages.getAllPages()];
    });

    this.$bus.$on('page-created', () => {
      this.pages = [...this.$pages.getAllPages()];
    });

    this.$bus.$on('page-deleted', () => {
      this.pages = [...this.$pages.getAllPages()];
    });

  },

  data() {
    return {
      theme: 'light',
      pages: []
    };
  },

  computed: {
    getPublishedPages() {
      return this.pages.filter(p => p.published);
    }
  },

  methods: {
    changeTheme() {
      let theme = 'light';

      if (this.theme === 'light') {
        theme = 'dark';
      }

      this.theme = theme;
      this.storeThemeSettings();
    },
    storeThemeSettings() {
      localStorage.setItem('theme', this.theme);
    },
    getThemeSettings() {
      let theme = localStorage.getItem('theme');

      if (theme) {
        this.theme = theme;
      }
    }
  }
}
</script>

<template>
  <nav
      :class="[`navbar-${theme}`, `bg-${theme}`, 'navbar', 'navbar-expand-lg']"
  >
    <div class="container-fluid">
      <a class="navbar-brand" href="#">My Vue</a>
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <navbar-link
            v-for="(page, index) in getPublishedPages" class="nav-item" :key="index"
            :page="page"
            :index="index"
        ></navbar-link>
        <li>
          <router-link
              :to="`/pages/`"
              class="nav-link"
              active-class="active"
          >
            Pages
          </router-link>
        </li>
      </ul>
      <form>
        <button
            class="btn btn-primary"
            @click.prevent="changeTheme()"
        >Toggle
        </button>
      </form>
    </div>
  </nav>
</template>

<style scoped>

</style>
