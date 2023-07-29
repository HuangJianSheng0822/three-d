<template>
  <div>
    <div class="play">
      <video :src="fatherData.videoInfo.playUrl" controls></video>
    </div>
    <div class="video-bar">
      <div>
        <input type="text">
        <button type="button" @sendBarrage="sendBarrage(fatherData.videoInfo.id)">发送</button>
      </div>
    </div>
    <div class="video-desc">{{ fatherData.videoInfo.description }}</div>
    <div class="video-tags">
      <div v-for="tag in fatherData.videoInfo.tags" :key="tag" class="tag" @mouseover="handleMouseOver(tag)" @mouseleave="handleMouseLeave(tag)">
        {{ tag }}
      </div>
    </div>
  </div>
</template>

<script setup>
import {defineProps} from "vue";
console.log("init:"+fatherData.videoInfo.tags)
const fatherData=defineProps({
  videoInfo:{
    type:Object,
    required:false
  }
})

const sendBarrage=(id)=>{
  console.log(id)
}
// eslint-disable-next-line no-unused-vars
const handleMouseOver = (tag) => {
  // Handle mouseover event, change the tag's style here if needed
};

// eslint-disable-next-line no-unused-vars
const handleMouseLeave = (tag) => {
  // Handle mouseleave event, reset the tag's style here if needed
};

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
  margin: 10px 0;
}

.video-tags {
  height: 57px;
  background-color: antiquewhite;
}

.tag {
  display: inline-block;
  padding: 5px 10px;
  margin: 5px;
  border: 1px solid #ccc;
  border-radius: 18px;
  cursor: pointer;
}

.tag:hover {
  color: blue;
}
</style>