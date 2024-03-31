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
    console.log('clicked')
    console.log(page.value)
    console.log(maxPages.value-1)
    if(page.value < maxPages.value-1){
      console.log("updated")
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
  <div class="d-flex justify-content-end me-1 align-items-end">
    <h6 class="me-1">Page {{page+1}} of {{maxPages}}</h6>
    <button
        class="btn-sm btn-secondary me-2"
        @click.prevent="goToFirst"
        :disabled="isGoBackwardsDisabled"
    >&lt;&lt;</button>
    <button
        class="btn-sm btn-secondary me-2"
        @click.prevent="goToPrevious"
        :disabled="isGoBackwardsDisabled"
    >&lt;</button>
    <button
        class="btn-sm btn-secondary me-2"
        @click.prevent="goToNext"
        :disabled="isGoForwardDisabled"
    >&gt;</button>
    <button
        class="btn-sm btn-secondary me-2"
        @click.prevent="goToLast"
        :disabled="isGoForwardDisabled"
    >&gt;&gt;</button>
  </div>
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
  .btn-sm.btn-secondary{
    background: none;
    border: none;

    color: black;
    font-weight: bold;
  }

  .btn-sm.btn-secondary:disabled{
    color: darkgrey;
    font-weight: normal;
  }
</style>