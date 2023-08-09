<template>
<div class="root">
  <video id="videoElement" controls poster="@/assets/img/p1.jpg" @click="play"></video>
</div>
</template>
<script setup>
import flvjs from 'flv.js'
import {defineProps, ref} from "vue";
import {getLiveSocketUrl} from "@/api/websocket";
// eslint-disable-next-line no-unused-vars
const fatherData=defineProps({
  id:{
    type:String,
    required:true
  }
})
const playing=ref(false);

const socket=getLiveSocketUrl(fatherData.id)
const webSocket = new WebSocket(socket);
// 监听WebSocket消息接收事件
webSocket.onmessage = (event) => {
  // 在控制台打印响应结果
  let parse = JSON.parse(event.data);
  console.log(parse)
};
webSocket.onopen = function() {
  console.log("ws调用连接成功回调方法")
}
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