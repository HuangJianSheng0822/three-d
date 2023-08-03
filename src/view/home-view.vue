<template>
  <div class="root">

    <div class="top">
      <home-top-bar></home-top-bar>
    </div>
    <div class="hot-activity-box">
      <div class="hot-main">
        <div class="host-left">
          <carousel-view></carousel-view>
        </div>
        <div class="hot-right">

        </div>
      </div>


    </div>
    <div class="list">
      <video-info-list :items="pageData"></video-info-list>
    </div>

  </div>


</template>

<script setup>
import HomeTopBar from "@/components/home-top-bar.vue";
// import PageMax from "@/components/page-max.vue";
import VideoInfoList from "@/components/video-info-list.vue";
import {onMounted, onUnmounted, ref} from "vue";
import {getVideoCoverList} from "@/api/video";
import CarouselView from "@/components/carousel-view.vue";
const pageData=ref([
  {
    "id": "1684931570969931777",
    "title": "“我来见你了，你住的地方好远啊”",
    "userId": "1684546112993689601",
    "userName": "user1",
    "headImg": "https://p.qqan.com/up/2021-6/16239805423883054.jpg",
    "userDesc": null,
    "coverUrl": "https://bilibilicloud.oss-cn-beijing.aliyuncs.com/20230527145250Aicy.jpg",
    "created": "23-07-28"
  }
])


// eslint-disable-next-line no-unused-vars
const handlePageData = (data) => {
  pageData.value=data.data
};


// eslint-disable-next-line no-unused-vars
const pageParams=ref({
  type:"get",
  url:"http://localhost:8080/content/list",
  config:null,
  page_size:10
})


const page=ref(-1)
//修改后
let readyForLoad = true; //默认允许加载一次
function loadMore() {
  if (readyForLoad&&page.value<10) {
    readyForLoad = false; //进来了就"锁上"
    page.value++
    console.log("请求:"+page.value)
    getVideoCoverList(page.value,12)
        .then(res=>{
          console.log("list:"+res.data.data.length)
          pageData.value.push(...res.data.data)
          console.log("pageData:"+pageData.value.length)
        })
        .catch(err=>{
          console.log(err)
        })



    readyForLoad=true;
  }
}

loadMore(); //初始加载一次

//滚动事件处理函数
function scrollHandle() {
  const scrollHeight=document.body.scrollHeight;
  const scrollTop=document.body.scrollTop||document.documentElement.scrollTop;
  const clientHeight=document.documentElement.clientHeight;
  const distance=scrollHeight-scrollTop-clientHeight;
  if (distance<=20){
    loadMore()
  }

}

onMounted(() => {
  //组件挂载时，添加scroll监听
  window.addEventListener("scroll", scrollHandle, false);
});
onUnmounted(() => {
  //组件卸载时，停止监听
  window.removeEventListener("scroll", scrollHandle, false);
});



</script>

<style scoped>
.root {
  min-width: 1000px;
  height: 100%;
  width: 100%;
}
.top{
  height: 50px;
  width: 100%;
}
.list {
  width: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
}
.hot-activity-box{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}
.hot-main{
  display: flex;
  width: 84%;
}
.host-left{
  width: 40%;
}

</style>