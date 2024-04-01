<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import ReaderService from "@/services/ReaderService";

const router = useRouter();
const route = useRoute();

const name = ref('');
const lastName = ref('');
const id = ref(route.params.id);

const fetchReaderData = async (id) => {
  try {
    const data = await ReaderService.getReader(id);
    name.value = data.name;
    lastName.value = data.lastName;
  } catch (error) {
    console.error("Failed to fetch reader data", error);
    alert("Failed to load reader data");
  }
};

const updateReader = async () => {
  try {
    const reader = {
      name: name.value,
      lastName: lastName.value,
    };

    const success = await ReaderService.updateReader(id.value, reader);
    if (success) {
      alert('Reader updated successfully');
      await router.push('/readers');
    } else {
      alert('Failed to update reader');
    }
  } catch (error) {
    console.error('Error updating reader:', error);
    alert('Error updating reader');
  }
};

const deleteReader = async () => {
  const confirmation = confirm("Are you sure you want to delete this reader?");
  if (confirmation) {
    try {
      const success = await ReaderService.deleteReader(id.value);
      if (success) {
        alert('Reader deleted successfully');
        await router.push('/readers');
      } else {
        alert('Failed to delete reader');
      }
    } catch (error) {
      console.error('Error deleting reader:', error);
      alert('Error deleting reader');
    }
  }
};

const cancelUpdate = () => {
  router.push('/readers');
};

onMounted(() => {
  if (id.value) {
    fetchReaderData(id.value);
  }
});
</script>

<template>
  <h4 class="text-center">Edit Reader</h4>
  <form class="container mb-3">
    <!-- Input fields for name and last name -->
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
    <!-- Buttons for actions -->
    <div class="row justify-content-center">
      <div class="col-lg-3 mt-4 justify-content-center d-flex">
        <button class="btn btn-primary btn-lg me-3" @click.prevent="updateReader">Edit</button>
        <button class="btn btn-danger btn-lg me-3" @click.prevent="deleteReader">Delete</button>
        <button class="btn btn-secondary btn-lg" @click.prevent="cancelUpdate">Cancel</button>
      </div>
    </div>
  </form>
</template>

<style scoped>

</style>
