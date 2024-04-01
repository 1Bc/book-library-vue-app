<script>
import {defineComponent} from "vue";
import {useRouter} from "vue-router";
import RentalService from "@/services/RentalService";
import ReaderService from "@/services/ReaderService";
import BookService from "@/services/BookService";

export default defineComponent({
  name: "rental-list",
  setup() {
    const router = useRouter();

    const editRental = (id) => {
      router.push({name: 'RentalEdit', params: {id}})
    }

    return {
      editRental
    }
  },
  data() {
    return {
      rentals: [],
      currentPage: 0,
      totalPages: 0, // Initialize with a default value
    };
  },
  methods: {
    async retrieveRentals(page = 0) {
      this.currentPage = page;
      try {
        let rentals = await RentalService.getAll(page);
        // Enhance each rental with book and reader information
        rentals = await Promise.all(rentals.map(async rental => {
          const bookTitle = await this.getBook(rental.bookId);
          const readerName = await this.getReader(rental.readerId);
          // Return a new object that includes the book title and reader name
          return {...rental, bookTitle, readerName};
        }));
        this.rentals = rentals;
      } catch (error) {
        console.error("Failed to retrieve rentals", error);
        alert("Failed to load data");
      }
    },
    async getReader(readerId) {
      try {
        const reader = await ReaderService.getReader(readerId);
        return `${reader.name} ${reader.lastName}`;
      } catch (error) {
        console.error("Failed to retrieve reader", error);
        return "Unknown";
      }
    },
    async getBook(bookId) {
      try {
        const book = await BookService.getBook(bookId);
        return book.title;
      } catch (error) {
        console.error("Failed to retrieve book", error);
        return "Unknown";
      }
    },
    async fetchTotalPages() {
      try {
        this.totalPages = await RentalService.getRentalPages();
      } catch (error) {
        console.error("Failed to fetch total pages", error);
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages - 1) {
        this.retrieveRentals(this.currentPage + 1);
      }
    },
    prevPage() {
      if (this.currentPage > 0) {
        this.retrieveRentals(this.currentPage - 1);
      }
    },
    firstPage() {
      if (this.currentPage > 0) {
        this.retrieveRentals(0);
      }
    },
    lastPage() {
      if (this.currentPage < this.totalPages - 1) {
        this.retrieveRentals(this.totalPages - 1);
      }
    },
  },
  mounted() {
    this.retrieveRentals();
    this.fetchTotalPages();
  }
})
</script>

<template>
  <h4 class="text-center">Book Loans</h4>
  <div class="text-end mb-2">
    <router-link class="btn btn-primary btn-sm" to="/rentals/create">Add Loan</router-link>
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
      <th>ID</th>
      <th>Book</th>
      <th>Reader</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="rental in rentals" :key="rental.id">
      <td>{{ rental.id }}</td>
      <td>{{ rental.bookTitle }}</td>
      <td>{{ rental.readerName }}</td>
    </tr>
    </tbody>
  </table>
</template>

<style scoped>

</style>
