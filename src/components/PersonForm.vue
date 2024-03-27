<script>
export default {
  name: 'person-form',
  data() {
    return {
      person: {
        name: '',
        email: '',
        phone: ''
      }
    }
  }
}
</script>

<template>
  <div id="person-form">
    <form>
      <label for="name">Imię i nazwisko</label>
      <input type="text" id="name" name="name" required>
      <label for="email">Email</label>
      <input type="email" id="email" name="email" required>
      <label for="phone">Telefon</label>
      <input type="tel" id="phone" name="phone" required>
      <button type="submit">Dodaj kontakt</button>
    </form>
  </div>
</template>

<style scoped>
  form {
    margin-bottom: 2rem;
  }
</style>
