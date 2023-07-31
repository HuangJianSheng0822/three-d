<script setup>
import {defineProps, onMounted, ref} from "vue";
const videoPlayerRef = ref(null);

const fatherData=defineProps({
  videoInfo:{
    type:Object,
    required:false
  },
  id:{
    type:String,
    required:true
  }
})
const canvas = ref(null);
const ctx = ref(null);
const texts = ref([]);
const nowColor = ref('#FF0000');

const barrageData=ref({
  "userId":"",
  "videoId":"",
  "content":"",
  "schedule":""
})

const update = () => {
  ctx.value.clearRect(0, 0, 500, 100);
  for (let i = 0; i < texts.value.length; i++) {
    texts.value[i].x -= 1;
    if (texts.value[i].x < -500) texts.value.splice(i, 1);
  }

  texts.value.forEach((item) => {
    ctx.value.font = '16px Arial';
    ctx.value.fillStyle = item.color;
    ctx.value.fillText(item.txt, item.x, item.y);
  });

  window.requestAnimationFrame(update);
};

const addText = (nowTxt) => {
  if (nowTxt !== '') {
    texts.value.push({
      txt: nowTxt,
      x: canvas.value.width,
      y: Math.random() * (canvas.value.height - 16) + 16,
      color: nowColor.value
    });
  }
  console.log(texts.value)
};
onMounted(() => {
  canvas.value.width = 500;
  canvas.value.height = 100;
  ctx.value = canvas.value.getContext('2d');
  update();
});

// 创建响应式的WebSocket URL
const webSocketUrl = ref(`ws://localhost:8080/barrage?videoId=${fatherData.id}`);
const webSocket = new WebSocket(webSocketUrl.value);
// 监听WebSocket消息接收事件
webSocket.onmessage = (event) => {
  // 在控制台打印响应结果
  console.log("Response:", event.data);
  console.log("有新消息")
  addText(event.data)
};
webSocket.onopen = function() {
  console.log("ws调用连接成功回调方法")

}

const sendBarrage=()=>{
  const videoPlayer = videoPlayerRef.value;
  const currentTime = videoPlayer.currentTime;
  const minutes = Math.floor(currentTime / 60);
  const seconds = Math.floor(currentTime % 60);
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  // 将barrageData数据转换为JSON字符串
  barrageData.value.videoId=fatherData.id;
  barrageData.value.userId=localStorage.getItem("jwt");
  barrageData.value.schedule=formattedTime
  const dataToSend = JSON.stringify(barrageData.value);
  webSocket.send(dataToSend);
}
onMounted(() => {
  videoPlayerRef.value = document.querySelector('video');
});
// eslint-disable-next-line no-unused-vars
const handleMouseOver = (tag) => {
  // Handle mouseover event, change the tag's style here if needed
};

// eslint-disable-next-line no-unused-vars
const handleMouseLeave = (tag) => {
  // Handle mouseleave event, reset the tag's style here if needed
};

</script>
<template>
  <div>
    <div class="play">
      <div class="video-wrapper">
        <canvas ref="canvas"></canvas>
        <video ref="videoPlayer" src="../assets/name1.mp4" controls></video>
      </div>
    </div>
    <div class="video-bar">
      <div class="barrage-box">
        <input type="text" v-model="barrageData.content" @keydown.enter="sendBarrage" class="barrage-input">
        <button type="button" @click="sendBarrage()" class="barrage-sub-btn">发送</button>
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


<style scoped>

.play,canvas {
  width: 100%;
  height: 80%;
}
.video-wrapper {
  position: relative;
  height:100%;
  min-height: 500px;
  z-index: 999;
}
.video-wrapper video
{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
canvas{
  height: 37%;
  z-index: 1;
}
video{
  object-fit: fill;
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
video{
  z-index: -1;
  //pointer-events: none; /* 让元素A不响应事件 */
}
.barrage-input{
  height: 28px;
}
.barrage-sub-btn{
  width: 62px;
  height: 32px;
  background-color: #00A1D6;
  color: white;
  font-size: 13px;
  padding: 13px;
  border-width: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.barrage-box{
  display: flex;

}
.video-bar{
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 20px;
}
</style>