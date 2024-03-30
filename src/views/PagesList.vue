<script setup>

import {inject} from "vue";
import {useRouter} from "vue-router";

const $pages = inject('$pages');
const router = useRouter();
function goToPage(index){
  router.push(`/pages/${index}/edit`)
}
</script>

<template>
  <h4>Pages</h4>
  <div class="text-end">
    <router-link class="btn btn-primary btn-sm" to="/pages/create">Create Page</router-link>
  </div>
  <table class="table table-hover ">
    <thead>
        <tr>
          <th>Title</th>
          <th>Link text</th>
          <th>Is Published</th>
        </tr>
    </thead>
    <tbody>
      <tr v-for="(page,index) in $pages.getAllPages()"
      :key="index"
      @click.prevent = "goToPage(index)"
      >
        <td>{{ page.pageTitle }}</td>
        <td>{{page.link.text}}</td>
        <td>{{page.published ? 'Yes': 'No'}}</td>
      </tr>
    </tbody>
  </table>
</template>



<style scoped>
  .table.table-hover tbody tr:hover{
    cursor: pointer;
  }
</style>