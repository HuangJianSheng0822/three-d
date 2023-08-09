<template>
<div class="root">
  <video id="videoElement" controls poster="@/assets/img/p1.jpg" @click="play"></video>
</div>
</template>
<script setup>
import flvjs from 'flv.js'
import {ref} from "vue";
const playing=ref(false);
const play=()=>{
  if (!playing.value){
    if (flvjs.isSupported()) {
      const videoElement = document.getElementById('videoElement');
      const flvPlayer = flvjs.createPlayer({
        type: 'flv',
        isLive: true, // 是否是直播流
        url: 'http://111.229.248.143:8848/live?port=1935&app=liveb&stream=123456'
      });
      flvPlayer.attachMediaElement(videoElement);
      flvPlayer.load();
      flvPlayer.play();
    }
    playing.value=true
  }
}
</script>
<style scoped>
#videoElement{
  object-fit: cover;
  position: relative;
  width: 916px;
  height: 458px;
}
</style>