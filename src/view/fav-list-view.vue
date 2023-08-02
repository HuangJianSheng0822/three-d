<template>
  <div class="favlist-root">

    <div class="top">
      <home-top-bar></home-top-bar>
    </div>
    <div>

    </div>

    <div class="img-box">

    </div>

    <div class="fav-list">
      <fav-list></fav-list>
    </div>


  </div>
</template>

<script setup>
import HomeTopBar from "@/components/home-top-bar.vue";
import FavList from "@/components/fav-list.vue";
</script>


<style scoped>
.top{
  height: 50px;
}
.img-box{
  height: 100px;
  width: 100%;
  background-color: #92de53;
}
.fav-list{
  margin-top: 20px;
}
</style>