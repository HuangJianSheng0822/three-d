<script setup>
import {ref} from "vue";
import axios from "axios";

const videoList=ref([]);
axios.post("http://localhost:8080/video/self/1/10",null,{
  headers: {
    'Authorization': localStorage.getItem("jwt")
  }
})
    .then((res)=>{
      videoList.value=res.data.data.list
    })
</script>

<template>
<div class="root">
  <div class="bar">
    <div class="active">视频管理</div>
    <div>专栏管理</div>
  </div>
  <div class="main">
    <div class="list">
      <div class="box" v-for="(item,index) in videoList" :key="index">
        <div class="left">
          <img :src=item.coverUrl>
        </div>
        <div class="right">
          <div class="video-title">{{item.title}}</div>
          <div class="video-info">
            {{item.created}}
          </div>
        </div>
        <div class="info">
          <button>B!</button>
          <button>B@</button>
        </div>
        <hr>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>
.root{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.bar{
  height: 70px;
  width: 70%;
  display: flex;
  border-bottom: 2px solid #92de53;
  margin-bottom: 20px;
  background-color: white;
  border-radius: 3px;
  padding: 3px;
  box-shadow:
      -4px -3.7px 3.6px rgba(0, 0, 0, 0.024),
      -5.8px -5.3px 10px rgba(0, 0, 0, 0.035),
      -2.3px -2.1px 24.1px rgba(0, 0, 0, 0.046),
      23px 21px 80px rgba(0, 0, 0, 0.07)
}
.bar>div{
  margin-right: 20px;
  height: 90%;
  display: flex;
  align-items: flex-end;
  padding-bottom: 5px;

}
.active{
  color: #00A1D6;
  font-weight: bold;
}

.main{
  height: 700px;
  width: 70%;
}

.box{
  display: flex;
  margin-bottom: 10px;
  height: 80px;
  width: 100%;
}
.left{
  width: 40%;
  margin-right: 5px;
  max-width: 200px;
  max-height: 100px;
  min-width: 147px;
  min-height: 80px;
}
.left>img{
  width: 100%;
  height: 100%;
  border-radius: 2px;
}
.right{
  flex: 1;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}
.video-title{
  color:#18191C;
  font-size: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
.author,.video-info{
  color: #9499a0;
  font-size: 13px;
}
.info{
  width: 20%;
}
</style>