<template>
  <div>
    <div class="play">
      <video :src="videoUrl" controls></video>
    </div>
    <div class="video-bar"></div>
    <div class="video-desc">{{ videoDescription }}</div>
    <div class="video-tags">
      <span v-for="tag in videoTags" :key="tag">{{ tag }}</span>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import {onMounted, ref} from "vue";
const videoInfo=ref({
  videoUrl: '',
  videoDescription: '',
  videoTags: []
})
const videoId=ref("1679163163502714882")
function getVideoInfo(){
  axios.post(`http://localhost:8080/video/getPlayInfo/`+videoId.value)
      .then(response => {
        videoInfo.value.videoUrl = response.data;
        //this.videoDescription = videoData.description;
        //this.videoTags = videoData.tags;
      })
      .catch(error => {
        console.error(error);
      });
}
onMounted(()=>{
  getVideoInfo()
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