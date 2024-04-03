<script>
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import ReaderService from "@/services/ReaderService";

export default defineComponent({
  name: "readers-list",
  inject:['$bus'],
  setup() {
    const router = useRouter();

    const editReader = (id) => {
      router.push({ name: 'ReaderEdit', params: { id } })
    }

    return {
      editReader
    }
  },
  data() {
    return {
      readers: [],
      currentPage: 0,
      totalPages: 0, // Initialize with a default value
    };
  },
  methods: {
    async retrieveReaders(page = 0) {
      this.currentPage = page;
      try {
        this.readers = await ReaderService.getAll(page);
      } catch (error) {
        console.error("Failed to retrieve readers", error);
        alert("Failed to load data");
      }
    },
    async fetchTotalPages() {
      try {
        this.totalPages = await ReaderService.getReaderPages();
      } catch (error) {
        console.error("Failed to fetch total pages", error);
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages - 1) {
        this.retrieveReaders(this.currentPage + 1);
      }
    },
    prevPage() {
      if (this.currentPage > 0) {
        this.retrieveReaders(this.currentPage - 1);
      }
    },
    firstPage() {
      if (this.currentPage > 0) {
        this.retrieveReaders(0);
      }
    },
    lastPage() {
      if (this.currentPage < this.totalPages - 1) {
        this.retrieveReaders(this.totalPages - 1);
      }
    }
  },
  created() {
    this.$bus.$on('readers-changed',()=>{
      this.retrieveReaders();
      this.fetchTotalPages(); // Fetch total pages when the component mounts
    })
  },
  mounted() {
    this.retrieveReaders();
    this.fetchTotalPages(); // Fetch total pages when the component mounts
  }
});
</script>

<template>
  <h4 class="text-center">Readers</h4>
  <div class="text-end mb-2">
    <router-link class="btn btn-primary btn-sm" to="/readers/create">Add Reader</router-link>
  </div>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <li class="page-item disabled">
        <span class="page-link">Page {{ currentPage + 1 }} of {{ totalPages }}</span>
      </li>
      <li class="page-item" :class="{ disabled: currentPage <= 0 }">
        <button class="page-link" @click="firstPage" aria-label="First">
          <span aria-hidden="true">««</span>
        </button>
      </li>
      <li class="page-item" :class="{ disabled: currentPage <= 0 }">
        <button class="page-link" @click="prevPage" aria-label="Previous">
          <span aria-hidden="true">«</span>
        </button>
      </li>
      <li class="page-item" :class="{ disabled: currentPage >= totalPages - 1 }">
        <button class="page-link" @click="nextPage" aria-label="Next">
          <span aria-hidden="true">»</span>
        </button>
      </li>
      <li class="page-item" :class="{ disabled: currentPage >= totalPages - 1 }">
        <button class="page-link" @click="lastPage" aria-label="Last">
          <span aria-hidden="true">»»</span>
        </button>
      </li>
    </ul>
  </nav>
  <table class="table table-hover">
    <thead>
    <tr>
      <th>Id</th>
      <th>Name</th>
      <th>Last Name</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="reader in readers" :key="reader.id" @click="editReader(reader.id)" style="cursor: pointer">
      <td>{{ reader.id }}</td>
      <td>{{ reader.name }}</td>
      <td>{{ reader.lastName }}</td>
    </tr>
    </tbody>
  </table>
</template>

<style scoped>

</style>
