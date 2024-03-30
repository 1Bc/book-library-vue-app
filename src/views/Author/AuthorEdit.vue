<script setup>
import {inject} from 'vue';
import {useRouter} from "vue-router";

const router = useRouter();
const data = inject('$authorData');
const bus = inject('$bus');
// eslint-disable-next-line no-undef
const props = defineProps(['index']);

let author = await data.getAuthor(props.index);


function updateAuthor(){
  const body = {
    firstName: author.firstName,
    lastName: author.lastName
  };

  data.updateAuthor(body,props.index);
  bus.$emit('author-added');


  goToAuthors();
}

function deleteAuthor(){


  data.deleteAuthor(props.index);
  bus.$emit('author-added');


  goToAuthors();
}
function goToAuthors() {
  router.push('/authors');
}
</script>

<template>
  <h4 class="text-center">Add Author</h4>
  <form class="container mb-3">

    <div class="row justify-content-center">
      <div class="col-lg-6">
        <label for="name" class="form-label">
          Name
        </label>
        <input id="name" name="name"
               type="text"
               class="form-control"
               v-model="author.firstName">
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-lg-6">
        <label for="lastname" class="form-label">
          Last Name
        </label>
        <input id="lastname"
               name="lastname"
               type="text"
               class="form-control"
               v-model="author.lastName">
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-lg-3 mt-4 justify-content-center d-flex">
        <button
            class="btn btn-primary btn-lg me-3"
            @click.prevent='updateAuthor'>
          Create
        </button>
        <button
            class="btn btn-secondary btn-lg me-3"
            @click.prevent='goToAuthors'>
          Cancel
        </button>
        <button
            class="btn btn-danger btn-lg "
            @click.prevent='deleteAuthor'>
          Delete
        </button>
      </div>

    </div>


  </form>
</template>

<style scoped>

</style>