<script setup>
import {defineProps, onMounted, ref} from "vue";
import {hasLogin} from "@/util/hasLogin";
import {getCollectList,addCollectVideo} from "@/api/collect";
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

const collectList=ref([])
const showPopover=ref(true)
// eslint-disable-next-line no-unused-vars
const collectHandler=async ()=>{
  collectList.value=await getCollectList();
  console.log(collectList.value)
}
onMounted(()=>{
  if (hasLogin()){
    showPopover.value=false
  }
})


// 使用ref来存储用户选择的收藏夹ID
const selectedFolder = ref('');

// 提交表单的处理函数
const submitForm = (event) => {
  event.preventDefault();
  if (!selectedFolder.value) {
    alert('请选择一个收藏夹！');
    return;
  }
  // 这里可以进行表单提交的操作，比如发送选中的收藏夹ID到后端
  addCollectVideo(selectedFolder.value,fatherData.id)
  alert('提交成功，选择的收藏夹ID为：' + selectedFolder.value);
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
      <div class="like-box like-box">
        <svg t="1690967343361" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6251" width="48" height="48"><path d="M792.7 950.8H127.3c-35.5 0-64.7-29.2-64.7-64.7v-438c0-10.4 4.2-20.9 12.5-27.1 8.3-6.3 18.8-10.4 27.1-8.3 8.3 0 43.8-2.1 102.2-6.3 152.3-12.5 225.3-89.7 225.3-235.7v-4.2c4.2-33.4 33.4-93.9 112.6-93.9 68.8 0 98 58.4 104.3 91.8 4.2 16.7 31.3 118.9-10.4 216.9h254.5c20.9 0 39.6 8.3 54.2 25 12.5 16.7 18.8 37.5 14.6 56.3l-93.9 431.8c-8.2 33.5-37.4 56.4-72.9 56.4zM125.2 477.3v410.9c0 2.1 0 2.1 2.1 2.1h665.4c4.2 0 10.4-4.2 10.4-8.3l91.8-427.6c0-2.1 0-4.2-2.1-4.2s-2.1-2.1-4.2-2.1h-292c-14.6 0-27.1-8.3-33.4-20.9-6.3-12.5-6.3-27.1 0-39.6 54.2-89.7 20.9-202.3 20.9-202.3v-4.2c-2.1-6.3-8.3-41.7-43.8-41.7-39.6 0-48 27.1-50.1 37.5 0 125.2-50.1 275.3-283.7 296.2-25 0.1-58.3 2.2-81.3 4.2z m0 0" fill="#2D99F4" p-id="6252"></path><path d="M231.6 435.6h62.6v458.9h-62.6z" fill="#2D99F4" p-id="6253"></path></svg>
      </div>

      <div>
        <el-popover placement="left-end" :width="400" trigger="click" @show="collectHandler" :disabled=showPopover>
          <template #reference>
            <div class="collect-box like-box">
              <svg t="1690966486001" class="icon" viewBox="0 0 1025 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2287" width="48" height="48"><path d="M198.584302 933.644588 249.81783 970.867924 305.311479 647.315032C307.276076 635.860567 303.478502 624.172835 295.156348 616.060737L60.081417 386.919307 40.511947 447.14793 365.377518 399.942199C376.878451 398.271015 386.820643 391.047599 391.964019 380.625982L537.248309 86.247837 473.920194 86.247837 619.204484 380.625982C624.34786 391.047599 634.290052 398.271015 645.790985 399.942199L970.656556 447.14793 951.087086 386.919307 716.012156 616.060737C707.690002 624.172835 703.892427 635.860567 705.857024 647.315032L761.350674 970.867924 812.584201 933.644588 522.015603 780.883636C511.728852 775.475569 499.439651 775.475569 489.1529 780.883636L198.584302 933.644588ZM489.1529 843.392226 779.721498 996.15318C805.626138 1009.772053 835.902358 987.77508 830.955026 958.929844L775.461358 635.376954 765.306227 666.631249 1000.381158 437.489821C1021.338447 417.061512 1009.773956 381.469662 980.811688 377.261199L655.946116 330.055468 682.532617 349.371687 537.248309 54.993542C524.295998 28.749279 486.872505 28.749279 473.920194 54.993542L328.635886 349.371687 355.222387 330.055468 30.356815 377.261199C1.394547 381.469662-10.169944 417.061512 10.787346 437.489821L245.862276 666.631249 235.707145 635.376954 180.213478 958.929844C175.266145 987.77508 205.542365 1009.772053 231.447005 996.15318L522.015603 843.392226 489.1529 843.392226Z" fill="#389BFF" p-id="2288"></path></svg>
            </div>
          </template>
          <div>

              <form @submit="submitForm">
                <div v-for="folder in collectList" :key="folder.id" class="col-box">
                  <input type="radio" :value="folder.id" v-model="selectedFolder" />
                  {{ folder.name }}
                </div>
                <button type="submit">提交</button>
              </form>


          </div>
        </el-popover>
      </div>

      <!--
      <div class="collect-box like-box" @click="collectHandler">
        <svg t="1690966486001" class="icon" viewBox="0 0 1025 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2287" width="48" height="48"><path d="M198.584302 933.644588 249.81783 970.867924 305.311479 647.315032C307.276076 635.860567 303.478502 624.172835 295.156348 616.060737L60.081417 386.919307 40.511947 447.14793 365.377518 399.942199C376.878451 398.271015 386.820643 391.047599 391.964019 380.625982L537.248309 86.247837 473.920194 86.247837 619.204484 380.625982C624.34786 391.047599 634.290052 398.271015 645.790985 399.942199L970.656556 447.14793 951.087086 386.919307 716.012156 616.060737C707.690002 624.172835 703.892427 635.860567 705.857024 647.315032L761.350674 970.867924 812.584201 933.644588 522.015603 780.883636C511.728852 775.475569 499.439651 775.475569 489.1529 780.883636L198.584302 933.644588ZM489.1529 843.392226 779.721498 996.15318C805.626138 1009.772053 835.902358 987.77508 830.955026 958.929844L775.461358 635.376954 765.306227 666.631249 1000.381158 437.489821C1021.338447 417.061512 1009.773956 381.469662 980.811688 377.261199L655.946116 330.055468 682.532617 349.371687 537.248309 54.993542C524.295998 28.749279 486.872505 28.749279 473.920194 54.993542L328.635886 349.371687 355.222387 330.055468 30.356815 377.261199C1.394547 381.469662-10.169944 417.061512 10.787346 437.489821L245.862276 666.631249 235.707145 635.376954 180.213478 958.929844C175.266145 987.77508 205.542365 1009.772053 231.447005 996.15318L522.015603 843.392226 489.1529 843.392226Z" fill="#389BFF" p-id="2288"></path></svg>
      </div>
      -->
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
  box-shadow:
      3.6px 3.6px 4px -22px rgba(0, 0, 0, 0.035),
      29px 29px 18px -22px rgba(0, 0, 0, 0.07);
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
  margin-left: auto;
}
.video-bar{
  display: flex;
  align-items: center;
  padding-right: 20px;
}
.like-box{
  background-color: transparent;
  width: 50px;
  height: 50px;
  margin-left: 50px;
}
.like-box:hover{
  cursor: pointer;
  width: 55px;
  height: 55px;
}
.collect-box{

}
.col-box{
  height: 40px;
}
.col-box:hover{
  color: #00A1D6;
}
</style>