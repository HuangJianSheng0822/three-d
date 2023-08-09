<template>
  <router-link :to="'/live/'+fatherData.liveInfo.id">
    <div class="root">
      <div class="cover-box">
        <img :src="fatherData.liveInfo.cover">
      </div>
      <div class="title">
        <h3>{{fatherData.liveInfo.title}}</h3>
      </div>
      <div class="live-info">
        在线认数：{{fatherData.liveInfo.usersCount}} | 开播累计弹幕：{{fatherData.liveInfo.barrageCount}}
      </div>
    </div>
  </router-link>

</template>
<script setup>
import {defineProps} from 'vue'
// eslint-disable-next-line no-unused-vars
const fatherData = defineProps({
  liveInfo: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.root{
  width: 250px;
  height: 210px;
  border-radius: 5px;
  border-width: 2px;
}
.cover-box{
  width: 100%;
  height: 140px;
}
.cover-box>img{
  width: 100%;
  height: 100%;
  transform: scale(1);
  transition: transform .3s;
}
.title{
  text-align: center;
}
h3 {
  padding: 5px 0;
  font-size: 18px;
  font-weight: normal;
  margin: 0;
}
img:hover {
  transform: scale(1.3);
  transition: transform .3s;
}
.live-info{
  width: 100%;
  color: #9499a0;
  font-size: 12px;
  text-align: center;
}
a {
  text-decoration: none;
  color: inherit;
}



</style>