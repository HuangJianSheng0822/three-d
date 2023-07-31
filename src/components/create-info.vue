<script setup>
import CarouselView from "@/components/carousel-view.vue";
import ActivityList from "@/components/activity-list.vue";
import LikesData from "@/components/likes-data.vue";
</script>

<template>
<div class="root">
  <div class="activity-box">
    <div class="carousel-box">
      <CarouselView/>
    </div>
    <div class="activity-list-box">
      <activity-list></activity-list>
    </div>
  </div>
  <div class="video-info-box">
    <likes-data></likes-data>
  </div>
  <div class="comment-info-box"></div>

</div>
</template>


<style scoped>
.root{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.activity-box,.video-info-box,.comment-info-box{
  width: 70%;
  margin-bottom: 20px;
}
.activity-box{
  height: 200px;
  display: flex;
  margin-bottom: 20px;
}
.carousel-box{
  width: 60%;
  height: 100%;
  margin-right: 20px;

}
.activity-list-box{
  flex: 1;
  height: 100%;
}
.video-info-box{
  height: auto;
}
.comment-info-box{
  height: 200px;
  background-color: #92de53;
}
</style>