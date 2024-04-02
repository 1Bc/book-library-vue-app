<script setup>
import BookService from "@/services/BookService";
import { computed, ref } from "vue";
import ReaderService from "@/services/ReaderService";

const book = ref(null);
const reader = ref(null);

const bookChoiceActive = ref(false);
const readerChoiceActive = ref(false);

const bookPage = ref(0);
const readerPage = ref(0);

const bookMaxPages = ref(await BookService.getBookPages(5));
const readerMaxPages = ref(await ReaderService.getReaderPages(5));

const bookList = ref([]);
const readerList = ref([]);

async function loadBooks() {
  bookList.value = await BookService.getAll(bookPage.value, 5);
}

async function loadReaders() {
  readerList.value = await ReaderService.getAll(readerPage.value, 5);
}

loadBooks();
loadReaders();

const isBookGoBackwardsDisabled = computed(() => bookPage.value === 0);
const isBookGoForwardDisabled = computed(() => bookPage.value === bookMaxPages.value - 1);

const isReaderGoBackwardsDisabled = computed(() => readerPage.value === 0);
const isReaderGoForwardDisabled = computed(() => readerPage.value === readerMaxPages.value - 1);

function deactivateBookChoice() {
  bookChoiceActive.value = false;
}

function activateBookChoice() {
  bookChoiceActive.value = true;
}

function deactivateReaderChoice() {
  readerChoiceActive.value = false;
}

function activateReaderChoice() {
  readerChoiceActive.value = true;
}

function selectBook(new_book) {
  book.value = new_book;
  bookChoiceActive.value = false;
}

function selectReader(new_reader) {
  reader.value = new_reader;
  readerChoiceActive.value = false;
}

function goToBookFirst() {
  bookPage.value = 0;
  loadBooks();
}

function goToReaderFirst() {
  readerPage.value = 0;
  loadReaders();
}

function goToBookNext() {
  if (bookPage.value < bookMaxPages.value - 1) {
    bookPage.value = bookPage.value + 1;
    loadBooks();
  }
}

function goToReaderNext() {
  if (readerPage.value < readerMaxPages.value - 1) {
    readerPage.value = readerPage.value + 1;
    loadReaders();
  }
}

function goToBookPrevious() {
  if (bookPage.value > 0) {
    bookPage.value = bookPage.value - 1;
    loadBooks();
  }
}

function goToReaderPrevious() {
  if (readerPage.value > 0) {
    readerPage.value = readerPage.value - 1;
    loadReaders();
  }
}

function goToBookLast() {
  bookPage.value = bookMaxPages.value - 1;
  loadBooks();
}

function goToReaderLast() {
  readerPage.value = readerMaxPages.value - 1;
  loadReaders();
}
</script>

<template>
<h4 class="text-center">Add Loan</h4>
<form class="container mb-3" action="">
  <div class="row justify-content-center">
    <h6 class="fw-bold text-center">Book</h6>
    <div class="row justify-content-center">
      <p class="text-center" v-if="book">{{ book.title }}</p>
      <p class="text-center" v-else>Not chosen</p>
    </div>
    <div class="row justify-content-center">
      <div class="col-md-3 justify-content-center d-flex">
        <button
            class="btn btn-sm btn-danger"
            v-if="bookChoiceActive"
            @click.prevent="deactivateBookChoice"
        >Close
        </button>
        <button
            v-else
            class="btn btn-sm btn-primary"
            @click.prevent="activateBookChoice"
        >Select Book
        </button>
      </div>
    </div>
    <div class="row justify-content-center" v-if="bookChoiceActive">
      <div class="col-lg-6">
        <nav aria-label="Page navigation example">
          <ul class="pagination justify-content-center">
            <li class="page-item disabled">
              <span class="page-link">Page {{ bookPage + 1 }} of {{ bookMaxPages }}</span>
            </li>
            <li class="page-item" :class={disabled:isBookGoBackwardsDisabled}>
              <button class="page-link"
                      @click.prevent="goToBookFirst"
                      aria-label="First">
                <span aria-hidden="true">««</span>
              </button>
            </li>
            <li class="page-item" :class={disabled:isBookGoBackwardsDisabled}>
              <button class="page-link"
                      @click.prevent="goToBookPrevious" aria-label="Previous"
              >
                <span aria-hidden="true">«</span>
              </button>
            </li>
            <li class="page-item" :class={disabled:isBookGoForwardDisabled}>
              <button class="page-link"
                      @click.prevent="goToBookNext" aria-label="Next"

              >
                <span aria-hidden="true">»</span>
              </button>
            </li>
            <li class="page-item" :class={disabled:isBookGoForwardDisabled}>
              <button class="page-link"
                      @click.prevent="goToBookLast" aria-label="Last"
              >
                <span aria-hidden="true">»»</span>
              </button>
            </li>
          </ul>
        </nav>
        <table class="table table-hover ">
          <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Author</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="book in bookList"
              :key="book.id"
              @click.prevent="selectBook(book)"
          >
            <td>{{ book.id }}</td>
            <td> {{ book.title }}</td>
            <td> {{ book.author.firstName + ' ' + book.author.lastName }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</form>
<form class="container mb-3" action="">
  <div class="row justify-content-center">
    <h6 class="fw-bold text-center">Reader</h6>
    <div class="row justify-content-center">
      <p class="text-center" v-if="reader">{{ reader.name + ' ' + reader.lastName }}</p>
      <p class="text-center" v-else>Not chosen</p>
    </div>
    <div class="row justify-content-center">
      <div class="col-md-3 justify-content-center d-flex">
        <button
            class="btn btn-sm btn-danger"
            v-if="readerChoiceActive"
            @click.prevent="deactivateReaderChoice"
        >Close
        </button>
        <button
            v-else
            class="btn btn-sm btn-primary"
            @click.prevent="activateReaderChoice"
        >Select Reader
        </button>
      </div>
    </div>
    <div class="row justify-content-center" v-if="readerChoiceActive">
      <div class="col-lg-6">
        <nav aria-label="Page navigation example">
          <ul class="pagination justify-content-center">
            <li class="page-item disabled">
              <span class="page-link">Page {{ readerPage + 1 }} of {{ readerMaxPages }}</span>
            </li>
            <li class="page-item" :class={disabled:isReaderGoBackwardsDisabled}>
              <button class="page-link"
                      @click.prevent="goToReaderFirst"
                      aria-label="First">
                <span aria-hidden="true">««</span>
              </button>
            </li>
            <li class="page-item" :class={disabled:isReaderGoBackwardsDisabled}>
              <button class="page-link"
                      @click.prevent="goToReaderPrevious" aria-label="Previous"
              >
                <span aria-hidden="true">«</span>
              </button>
            </li>
            <li class="page-item" :class={disabled:isReaderGoForwardDisabled}>
              <button class="page-link"
                      @click.prevent="goToReaderNext" aria-label="Next"

              >
                <span aria-hidden="true">»</span>
              </button>
            </li>
            <li class="page-item" :class={disabled:isReaderGoForwardDisabled}>
              <button class="page-link"
                      @click.prevent="goToReaderLast" aria-label="Last"
              >
                <span aria-hidden="true">»»</span>
              </button>
            </li>
          </ul>
        </nav>
        <table class="table table-hover ">
          <thead>
          <tr>
            <th>Id</th>
            <th>Reader</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="reader in readerList"
              :key="reader.id"
              @click.prevent="selectReader(reader)"
          >
            <td>{{ reader.id }}</td>
            <td> {{ reader.name + ' ' + reader.lastName }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</form>
</template>

<style scoped>

</style>
