<template>
  <div class="top">
    <home-top-bar></home-top-bar>
  </div>

  <div class="main">
    <div class="main-left">
      <div class="info">
        <playing-title></playing-title>
      </div>
      <div class="playing">
        <playing-box></playing-box>
      </div>
      <div class="comment-area">
        <comment-box></comment-box>
      </div>

    </div>
    <div class="main-right">

    </div>
  </div>

</template>

<script setup>
import PlayingTitle from "@/components/playing-title.vue";
import PlayingBox from "@/components/playing-box.vue";
import CommentBox from "@/components/comment-box.vue";
import HomeTopBar from "@/components/home-top-bar.vue";

</script>

<style scoped>
.top{
  height: 50px;
}
.main {
  margin-top: 70px;
  display: flex;
  padding: 0 10%;
}

.main-left {
  display: flex;
  flex-direction: column;
  width: 75%;
  min-width: 800px;
  margin-right: 2%;
}

.main-right {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 300px;
}

.comment-area{


}
</style>