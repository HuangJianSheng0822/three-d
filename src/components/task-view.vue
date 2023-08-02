<template>
  <div class="root" style="padding: 36px 0">
    <div class="title">
      每日奖励
    </div>
    <div class="main">
      <div class="box" v-for="(item,index) in taskList" :key="index">
        <div class="ico"><img src="@/assets/ico/sign.png"></div>
        <div class="task-name">{{item.type}}</div>
        <div class="has-sus">{{item.hasSus===1?"未完成":"已完成"}}</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import {ref} from "vue";

const taskList=ref([
  {
    "type":"t1",
    "name":"每日签到",
    "hasSus":1
  },
  {
    "type":"t1",
    "name":"每日签到",
    "hasSus":1
  },
  {
    "type":"t1",
    "name":"每日签到",
    "hasSus":1
  },
  {
    "type":"t1",
    "name":"每日签到",
    "hasSus":1
  }
])
</script>

<style scoped>
.root{
  height: 272px;
  padding: 0 36px;
}
.title{
  font-size: 20px;
}
.box{
  width: 186px;
  height:165px;
  text-align: center;
  padding-top: 22px;
}
.main{
  margin-top: 20px;
  display: flex;
  flex-wrap: nowrap;
}
.ico{
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-left: 53px;
}
.ico>img{
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.task-name{
  margin: 16px 0 0;
  color: #222222;
  font-size: 14px;
}
.has-sus{
  margin: 16px 0 0;
  color: #99a2aa;
  font-size: 12px;
}
</style>