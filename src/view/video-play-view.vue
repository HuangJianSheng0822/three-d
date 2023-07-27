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
import {useRoute} from "vue-router";
import axios from "axios";
import {ref} from "vue";
const route=useRoute()
const id=route.params.id
const userId=route.params.userId
getUserInfo(userId)
getVideoInfo(id);
//根据id获取视频标题信息
const userInfo=ref(null)
//根据id获取视频信息
function getUserInfo(userId){
  axios.get("http://localhost:8080/users/"+userId)
      .then((res)=>{
        userInfo.value=res.data.data
      })
      .catch(error => {
        console.error(error);
      });
}
function getVideoInfo(id){
  axios.post("http://localhost:8080/video/"+id)
      .then((res)=>{
        userInfo.value=res.data.data
      })
      .catch(error => {
        console.error(error);
      });
}
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