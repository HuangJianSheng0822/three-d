<template>
  <div class="lc-root">
    <div class="item" v-for="item in activeLiveList" :key="item">
      <live-card :live-info="item"></live-card>
    </div>
  </div>

</template>

<script setup>
import LiveCard from "@/components/live-card.vue";
import {ref} from "vue";
// eslint-disable-next-line no-unused-vars
const activeLiveList=ref([
  {
    "id":"1234abc",
    "live_id":"1234",
    "title":"title",
    "cover":"https://bilibilicloud.oss-cn-beijing.aliyuncs.com/v2-0f298674e2d33723d8022df7ac26e17f_r.jpg",
    "usersCount":123,
    "barrageCount":123
  },
  {
    "id":"1234abc",
    "live_id":"1234",
    "title":"title",
    "cover":"https://bilibilicloud.oss-cn-beijing.aliyuncs.com/v2-0f298674e2d33723d8022df7ac26e17f_r.jpg",
    "usersCount":123,
    "barrageCount":123
  },
  {
    "id":"1234abc",
    "live_id":"1234",
    "title":"title",
    "cover":"https://bilibilicloud.oss-cn-beijing.aliyuncs.com/v2-0f298674e2d33723d8022df7ac26e17f_r.jpg",
    "usersCount":123,
    "barrageCount":123
  },
  {
    "id":"1234abc",
    "live_id":"1234",
    "title":"title",
    "cover":"https://bilibilicloud.oss-cn-beijing.aliyuncs.com/v2-0f298674e2d33723d8022df7ac26e17f_r.jpg",
    "usersCount":123,
    "barrageCount":123
  },
  {
    "id":"1234abc",
    "live_id":"1234",
    "title":"title",
    "cover":"https://bilibilicloud.oss-cn-beijing.aliyuncs.com/v2-0f298674e2d33723d8022df7ac26e17f_r.jpg",
    "usersCount":123,
    "barrageCount":123
  },
  {
    "id":"1234abc",
    "live_id":"1234",
    "title":"title",
    "cover":"https://bilibilicloud.oss-cn-beijing.aliyuncs.com/v2-0f298674e2d33723d8022df7ac26e17f_r.jpg",
    "usersCount":123,
    "barrageCount":123
  }
])
</script>

<style scoped>
.lc-root{
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.item{
  margin: 10px;
}
</style>