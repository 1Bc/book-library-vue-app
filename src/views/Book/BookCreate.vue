<script setup>
import AuthorService from "@/services/AuthorService";
import BookService from "@/services/BookService";
import {computed, inject, ref} from "vue";
import {useRouter} from "vue-router";

const bus = inject('$bus');
const router = useRouter();

const title = ref('');
const pages = ref(0);
const author = ref(null);
const authorChoiceActive = ref(false);

const page = ref(0);
const maxPages = ref(await AuthorService.getPageCount(5));
const authorList = ref([]);

async function loadAuthors() {
  authorList.value = await AuthorService.getAllAuthors(page.value, 5);
}

loadAuthors();


function submitBook() {
  if (!title.value || !pages.value || !author.value) {
    return
  }

  const request = {
    title: title.value,
    pages: pages.value,
    author_id: author.value.id
  };

  BookService.createBook(request);
  bus.$emit('book-created', request);
  goToBooks();
}

const isSubmitDisabled = computed(() => !title.value || !pages.value || !author.value);

function goToFirst() {
  page.value = 0;
  loadAuthors();
}

const isGoBackwardsDisabled = computed(() => page.value === 0);

function goToPrevious() {
  if (page.value > 0) {
    page.value = page.value - 1;
    loadAuthors();
  }
}

const isGoForwardDisabled = computed(() => page.value === maxPages.value - 1);

function goToNext() {
  if (page.value < maxPages.value - 1) {
    page.value = page.value + 1;
    loadAuthors();
  }
}


function goToLast() {
  page.value = maxPages.value - 1;
  loadAuthors();
}

function deactivateAuthorChoice() {
  authorChoiceActive.value = false;
}

function activateAuthorChoice() {
  authorChoiceActive.value = true;
}

function selectAuthor(new_author) {
  author.value = new_author;
  authorChoiceActive.value = false;
}

function goToBooks() {
  router.push({path:"/books"})
}

</script>

<template>
  <h4 class="text-center">Add Book</h4>
  <form class="container mb-3" action="">


    <!--   Book data input section-->
    <div class="row justify-content-center">
      <div class="col-lg-6">
        <div class="row justify-content-center">
          <div class="col-lg-8">
            <label for="title" class="form-label">
              Book Title
            </label>
            <input id="title" name="title"
                   type="text"
                   class="form-control"
                   v-model="title">
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-lg-8">
            <label for="pages" class="form-label">
              Number of Pages
            </label>
            <input id="pages"
                   name="pages"
                   type="number"
                   class="form-control"
                   v-model="pages">
          </div>
        </div>
      </div>
    </div>
    <!--      Author choice-->
    <!--      Author display-->
    <div class="row justify-content-center">
      <h6 class="fw-bold text-center">Author</h6>
      <div class="row justify-content-center">
        <p class="text-center" v-if="author">{{ author.firstName + ' ' + author.lastName }}</p>
        <p class="text-center" v-else>Not chosen</p>
      </div>
      <!--        Author choice manipulation-->
      <div class="row justify-content-center">
        <div class="col-md-3 justify-content-center d-flex">
          <button
              class="btn btn-sm btn-danger"
              v-if="authorChoiceActive"
              @click.prevent="deactivateAuthorChoice"
          >Close
          </button>
          <button
              v-else
              class="btn btn-sm btn-primary"
              @click.prevent="activateAuthorChoice"
          >Select Author
          </button>
        </div>
      </div>
      <!--       Author choice display -->
      <div class="row justify-content-center" v-if="authorChoiceActive">
        <div class="col-lg-6">
          <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-center">
              <li class="page-item disabled">
                <span class="page-link">Page {{ page + 1 }} of {{ maxPages }}</span>
              </li>
              <li class="page-item" :class={disabled:isGoBackwardsDisabled}>
                <button class="page-link"
                        @click.prevent="goToFirst"
                        aria-label="First">
                  <span aria-hidden="true">««</span>
                </button>
              </li>
              <li class="page-item" :class={disabled:isGoBackwardsDisabled}>
                <button class="page-link"
                        @click.prevent="goToPrevious" aria-label="Previous"
                >
                  <span aria-hidden="true">«</span>
                </button>
              </li>
              <li class="page-item" :class={disabled:isGoForwardDisabled}>
                <button class="page-link"
                        @click.prevent="goToNext" aria-label="Next"

                >
                  <span aria-hidden="true">»</span>
                </button>
              </li>
              <li class="page-item" :class={disabled:isGoForwardDisabled}>
                <button class="page-link"
                        @click.prevent="goToLast" aria-label="Last"
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
              <th>Name</th>
              <th>Last Name</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="author in authorList"
                :key="author.id"
                @click.prevent="selectAuthor(author)"
            >
              <td>{{ author.id }}</td>
              <td> {{ author.firstName }}</td>
              <td>{{ author.lastName }}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>


    <!-- Submit section-->
    <div class="row justify-content-center">
      <div class="col-lg-3 mt-4 justify-content-center d-flex">
        <button
            class="btn btn-primary btn-lg me-3"
            :class={disabled:isSubmitDisabled}
            @click.prevent='submitBook'>
          Create
        </button>
        <button
            class="btn btn-secondary btn-lg "
            @click.prevent='goToBooks'>
          Cancel
        </button>
      </div>

    </div>


  </form>
</template>

<style scoped>

</style>