<script setup>
import {inject, ref} from 'vue';
import {useRouter} from "vue-router";

const router = useRouter();
const data = inject('$authorData');
const bus = inject('$bus');

let name = ref('');
let lastName = ref('');


async function createAuthor() {
  if (!name.value || !lastName.value) {
    alert("Invalid data");
    return;
  }

  const body = {
    firstName: name.value,
    lastName: lastName.value
  };

  data.postAuthor(body);
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
               v-model="name">
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
               v-model="lastName">
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-lg-3 mt-4 justify-content-center d-flex">
        <button
            class="btn btn-primary btn-lg me-3"
            @click.prevent='createAuthor'>
          Create
        </button>
        <button
            class="btn btn-secondary btn-lg "
            @click.prevent='goToAuthors'>
          Cancel
        </button>
      </div>

    </div>


  </form>
</template>

<style scoped>

</style>