<template>
  <div class="root">

    <div class="top">
      <home-top-bar></home-top-bar>
    </div>

    <div class="list">
      <video-info-list :items="pageData"></video-info-list>
    </div>

    <div class="page" >
      <page-max
          @page_data="handlePageData"
          :url="pageParams.url"
          :type="pageParams.type"
          :config="pageParams.config"
          :page_size="pageParams.page_size" />
    </div>

  </div>


</template>

<script setup>
import HomeTopBar from "@/components/home-top-bar.vue";
import PageMax from "@/components/page-max.vue";
import VideoInfoList from "@/components/video-info-list.vue";
import {ref} from "vue";
const pageData=ref()


const handlePageData = (data) => {
  pageData.value=data.data
};


const pageParams=ref({
  type:"get",
  url:"http://localhost:8080/content/list",
  config:null,
  page_size:10
})

</script>

<style scoped>
.root {
  min-width: 1000px;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.top{
  height: 50px;
}
.list {
  width: 100%;
  flex: 1;
}

.page {
  position: absolute; /* 将.page元素设置为绝对定位 */
  bottom: 10px; /* 将.page元素相对于父元素底部定位 */
  width: 100%;
  height: 50px;
}
</style>