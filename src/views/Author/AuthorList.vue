<script setup>
import {computed, inject, ref} from "vue";
  import {useRouter} from "vue-router";
  const data = inject('$authorData');
  const bus = inject('$bus');
  const router = useRouter();

  let dataList = ref([]);
  let page = ref(0);
  let maxPages = ref(0);
  async function loadContent(){
    dataList.value = await data.getAllAuthors(page.value);
    maxPages.value = await data.getPageCount();
  }
  await loadContent();


  bus.$on('author-added',async ()=>{
    await loadContent();
    page=0;
  })

  function goToAuthor(id){
    router.push(`/authors/${id}/edit`);
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
  <h4 class="text-center">Authors</h4>
  <div class="text-end mb-2">
    <router-link class="btn btn-primary btn-sm" to="/authors/create">Add Author</router-link>
  </div>
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
    <tr v-for="author in dataList"
        :key="author.id"
        @click.prevent = "goToAuthor(author.id)"
    >
      <td>{{author.id}}</td>
      <td> {{author.firstName}}</td>
      <td>{{author.lastName}}</td>
    </tr>
    </tbody>
  </table>
</template>

<style scoped>

</style>