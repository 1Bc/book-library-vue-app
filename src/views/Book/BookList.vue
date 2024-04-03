<script setup>
import {computed, inject, ref} from "vue";
import {useRouter} from "vue-router";
import BookService from "@/services/BookService";
const bus = inject('$bus');
const router = useRouter();

let dataList = ref([]);
let page = ref(0);
let maxPages = ref(0);

async function loadContent(){
  dataList.value = await BookService.getAll(page.value);
  maxPages.value = await BookService.getBookPages();
}
await loadContent();
bus.$on('book-added',async ()=>{
  page=0;
  await loadContent();

})

function goToBook(id){
  router.push({path:`/books/${id}/edit`});
}


function goToFirst(){
  page.value=0;
  loadContent();
}

const isGoBackwardsDisabled = computed(()=>page.value===0);

function goToPrevious(){
  if(page.value >0){
    page.value= page.value-1;
    loadContent();
  }
}

const isGoForwardDisabled = computed(()=>page.value===maxPages.value-1);
function goToNext(){
  console.log(page.value)
  console.log(maxPages.value-1)
  if(page.value < maxPages.value-1){
    page.value= page.value+1;
    loadContent();
  }
}




function goToLast(){
  page.value = maxPages.value-1;
  loadContent();
}
</script>

<template>
  <h4 class="text-center">Books</h4>
  <div class="text-end mb-2">
    <router-link class="btn btn-primary btn-sm" to="/books/create">Add Book</router-link>
  </div>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <li class="page-item disabled">
        <span class="page-link">Page {{ page + 1 }} of {{ maxPages }}</span>
      </li>
      <li class="page-item" :class={disabled:isGoBackwardsDisabled}>
        <button class="page-link"
                @click="goToFirst"
                aria-label="First">
          <span aria-hidden="true">««</span>
        </button>
      </li>
      <li class="page-item" :class={disabled:isGoBackwardsDisabled}>
        <button class="page-link"
                @click="goToPrevious" aria-label="Previous"
        >
          <span aria-hidden="true">«</span>
        </button>
      </li>
      <li class="page-item" :class={disabled:isGoForwardDisabled}>
        <button class="page-link"
                @click="goToNext" aria-label="Next"

        >
          <span aria-hidden="true">»</span>
        </button>
      </li>
      <li class="page-item" :class={disabled:isGoForwardDisabled}>
        <button class="page-link"
                @click="goToLast" aria-label="Last"
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
    <tr v-for="book in dataList"
        :key="book.id"
        @click.prevent = "goToBook(book.id)"
    >
      <td>{{book.id}}</td>
      <td> {{book.title}}</td>
      <td>{{book.author.firstName+' '+book.author.lastName}}</td>
    </tr>
    </tbody>
  </table>
</template>

<style scoped>

</style>