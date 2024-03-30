<script setup>
  import {inject,ref} from "vue";
  import {useRouter} from "vue-router";
  const data = inject('$authorData');
  const bus = inject('$bus');
  const router = useRouter();

  let dataList = ref([]);
  dataList = await data.getAllAuthors();
  bus.$on('author-added',async ()=>{
    dataList = await data.getAllAuthors();
  })



  function goToAuthor(id){
    router.push(`/authors/${id}/edit`);
  }

</script>

<template>
  <h4 class="text-center">Authors</h4>
  <div class="text-end">
    <router-link class="btn btn-primary btn-sm" to="/authors/create">Add Author</router-link>
  </div>
  <table class="table table-hover ">
    <thead>
    <tr>
      <th>Name</th>
      <th>Last Name</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="author in dataList"
        :key="author.id"
        @click.prevent = "goToAuthor(author.id)"
    >
      <td> {{author.firstName}}</td>
      <td>{{author.lastName}}</td>
    </tr>
    </tbody>
  </table>
</template>

<style scoped>

</style>