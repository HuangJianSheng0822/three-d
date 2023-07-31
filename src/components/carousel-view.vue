<template>
  <div class="block">
    <el-carousel height="200px">
      <el-carousel-item v-for="item in lists" :key="item">
        <img :src=item style="width: 100%;height: 100%">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script setup>
import {ref} from "vue";

const lists=ref(["https://bilibilicloud.oss-cn-beijing.aliyuncs.com/20230527145250Aicy.jpg"
  ,"https://bilibilicloud.oss-cn-beijing.aliyuncs.com/20230527145250Aicy.jpg"
  ,"https://bilibilicloud.oss-cn-beijing.aliyuncs.com/20230527145250Aicy.jpg"])
</script>
<style scoped>

</style>