<template>
  <div class="msg">
    <div class="sendMsg" id="list">
      <ul v-for="(item,index) in barrageList" :key="index">
        <li><span>观众</span>{{item.content}}</li>
      </ul>
    </div>
    <div class="inputMsg">
      <input type="text" placeholder="发一条弹幕..." @keydown.enter="send" v-model="content">

      <button class="send" @click="send">发送</button>
    </div>
  </div>
</template>
<script setup>
import {getSocketUrl} from "@/api/websocket";
import {defineProps, ref, watch} from "vue";

const fatherData=defineProps({
  id:{
    type:String,
    required:true
  }
})
const barrageList=ref([])
const content=ref(null)
const socket=getSocketUrl(fatherData.id)
const webSocket = new WebSocket(socket);
// 监听WebSocket消息接收事件
webSocket.onmessage = (event) => {
  // 在控制台打印响应结果
  let parse = JSON.parse(event.data);
  barrageList.value.push(parse)

};
webSocket.onopen = function() {
  console.log("ws调用连接成功回调方法")
}
const barrageData=ref({
  "userId":"",
  "videoId":"",
  "content":"",
  "schedule":""
})
const send=()=>{
  if (content.value===null||content.value==="''"||content.value==='""'){
    return
  }
  // 将barrageData数据转换为JSON字符串
  barrageData.value.videoId=fatherData.id;
  barrageData.value.userId=localStorage.getItem("token");
  barrageData.value.schedule="00:00"
  barrageData.value.content=content.value
  const dataToSend = JSON.stringify(barrageData.value);
  webSocket.send(dataToSend)
  content.value=null
}

watch(barrageList.value,()=>{
  const div = document.getElementById('list');
  div.scrollTop = div.scrollHeight;
})

</script>
<style scoped>
/* 消息互动 */
.msg {
  border: 1px solid #d5d5d5;
  height: auto;
  background: #ffffff;
}
/*消息展示*/
.sendMsg {
  height: 348px;
  overflow-y: auto;
}
.sendMsg ul li {
  line-height: 15px;

}
.sendMsg ul li span {
  color: #07c5c5;
  font-weight: bold;
  padding-right: 12px;
}
/*聊天输入框*/
.inputMsg {
  height: auto;
  padding: 40px 0 0 40px;
  margin-bottom: 10px;
}
.inputMsg input {
  line-height: 34px;
  border-radius: 4px ;
  border: 1px solid #d5d5d5;
  text-indent: 18px;
}

.send {
  width: 64px;
  line-height: 36px;
  background: #07c5c5;
  border-style: none;
  border-radius: 4px;
  color: #ffffff;
}
.radio:active,
.send:active {
  border-style: none;
  opacity: 0.5;
}
li{
  list-style: none;
  padding: 0;
}
ul{
  padding-left: 10px;
}
</style>