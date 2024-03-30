<script>
export default {
  props: ["index"],
  inject: ['$pages'],
  created() {
    this.page = this.$pages.getSinglePage(this.index)

    // this.$watch(()=>this.$route.params, (newParams, oldPArams)=>{
    //   this.page = this.$pages.getSinglePage(newParams.index)
    // })
  },
  data(){
    return{
      page: null
    }
  },
  watch:{
    index(newIndex, oldIndex){
      this.page = this.$pages.getSinglePage(newIndex)
    }
  }

}
</script>

<template>
<div class="container" v-if="page">
  <h1 class="emphasize">{{this.page.pageTitle}}</h1>
  <p>{{this.page.content}}</p>
</div>
</template>

<style scoped>
.emphasize {
  color: blue;
}
</style>
