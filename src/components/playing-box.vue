<template>
  <div>
    <div class="play">
      <video :src="fatherData.videoInfo.playUrl" controls></video>
    </div>
    <div class="video-bar"></div>
    <div class="video-desc">{{ fatherData.videoInfo.description }}</div>
    <div class="video-tags">
      <span v-for="tag in fatherData.videoInfo.tags" :key="tag">{{ tag }}</span>
    </div>
  </div>
</template>

<script setup>
import {defineProps} from "vue";

const fatherData=defineProps({
  videoInfo:{
    type:Object,
    required:false
  }
})
</script>

<style scoped>

.play {
  width: 100%;
  height: 80%;;
}

.play>video {
  width: 100%;
  height: 100%;
}
.video-bar {
  height: 57px;
  background-color: antiquewhite;
}

.video-desc {
  height: 100px;
  background-color: #ccc;
}

.video-tags {
  height: 57px;
  background-color: antiquewhite;
}
</style>