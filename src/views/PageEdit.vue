<script setup>
// import {useRoute} from "vue-router";
// const route = useRoute();
// const index = route.params.index
import {useRouter} from "vue-router";
import {inject} from "vue";
const pages = inject('$pages');
const bus = inject('$bus');
const router = useRouter();
// eslint-disable-next-line no-undef
const {index} = defineProps(['index']);

let page = pages.getSinglePage(index);

function submit(){
  pages.editPage(page,index);

  bus.$emit('page-updated',{
    index,
    page
  })
  goToPagesList()
}
function deletePage(){
  pages.removePage(index)

  bus.$emit('page-deleted',{index})
  goToPagesList()
}

function goToPagesList(){
  router.push('/pages')
}
</script>

<template>
  <h4>
    Edit {{page.pageTitle}}
<!--    edit {{index}}-->
  </h4>

  <form class="container mb-3">
    <div class="row">
      <div class="col-md-8">
        <div class="mb-3">
          <label for="" class="form-label">
            Page Title
          </label>
          <input
              type="text"
              class="form-control"
              v-model="page.pageTitle"
          />
        </div>
        <div class="mb-3">
          <label for="" class="form-label">
            Content
          </label>
          <textarea
              type="text"
              class="form-control"
              rows="5"
              v-model="page.content"
          ></textarea>
        </div>
      </div>
      <div class="col">
        <div class="mb-3">
          <label for="" class="form-label">
            Link Text
          </label>
          <input
              type="text"
              class="form-control"
              v-model="page.link.text"
          />
        </div>
        <div class="row mb-3">
          <div class="form-check">
            <input class="form-check-inline" type="checkbox" v-model="page.published">
            <label class="form-check-label" for="gridCheck1">
              Published
            </label>
          </div>
        </div>
      </div>
    </div>
    <div class="mb-3">
      <button
          class="btn btn-primary me-3"
          @click.prevent="submit"
      >Edit</button>
      <button
          class="btn btn-secondary me-3"
          @click.prevent="goToPagesList"
      >Cancel</button>
      <button
          class="btn btn-danger"
          @click.prevent="deletePage"
      >Delete</button>
    </div>
  </form>
</template>

<style scoped>

</style>