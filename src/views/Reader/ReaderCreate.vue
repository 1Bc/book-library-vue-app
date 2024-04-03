<script setup>
import { ref , inject} from 'vue';
import { useRouter } from 'vue-router';
import ReaderService from "@/services/ReaderService";

const bus = inject('$bus');

const name = ref('');
const lastName = ref('');

const router = useRouter();
const createReader = async () => {
  try {
    const reader = {
      name: name.value,
      lastName: lastName.value,
    };

    const success = await ReaderService.postReader(reader);
    if (success) {
      alert('Reader created successfully');
      bus.$emit('readers-changed',{reader})
      await router.push('/readers');
    } else {
      alert('Failed to create reader');
    }
  } catch (error) {
    console.error('Error creating reader:', error);
    alert('Error creating reader');
  }
};

const cancelCreation = () => {
  router.push('/readers');
};
</script>

<template>
  <h4 class="text-center">Add Reader</h4>
  <form class="container mb-3">
    <div class="row justify-content-center">
      <div class="col-lg-6">
        <label for="name" class="form-label">Name</label>
        <input id="name" name="name" type="text" class="form-control" v-model="name">
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-lg-6">
        <label for="lastname" class="form-label">Last Name</label>
        <input id="lastname" name="lastname" type="text" class="form-control" v-model="lastName">
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-lg-3 mt-4 justify-content-center d-flex">
        <button class="btn btn-primary btn-lg me-3" @click.prevent="createReader">Create</button>
        <button class="btn btn-secondary btn-lg" @click.prevent="cancelCreation">Cancel</button>
      </div>
    </div>
  </form>
</template>

<style scoped>

</style>
