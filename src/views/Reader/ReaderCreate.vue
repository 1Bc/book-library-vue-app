<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'; // Import useRouter
import ReaderService from "@/services/ReaderService";

// Reactive state for form fields
const name = ref('');
const lastName = ref('');

// Use useRouter to get the router instance
const router = useRouter();

// Method to handle form submission
const createReader = async () => {
  try {
    const reader = {
      name: name.value,
      lastName: lastName.value,
    };

    // Use the ReaderService to send the POST request
    const success = await ReaderService.postReader(reader);
    if (success) {
      alert('Reader created successfully');
      // Optionally, redirect to the readers list after creation
      await router.push('/readers');
    } else {
      alert('Failed to create reader');
    }
  } catch (error) {
    console.error('Error creating reader:', error);
    alert('Error creating reader');
  }
};

// Method to handle form cancellation and redirect to /readers
const cancelCreation = () => {
  router.push('/readers'); // Redirect to the readers list
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
