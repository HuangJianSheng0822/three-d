<template>
  <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="page_size"
      :page-count="page_count"
      @current-change="currentChange">
  </el-pagination>
</template>

<script setup>
import {ref,defineEmits,defineProps} from "vue";
import axios from "axios";

const total=ref(100)
const page_size=ref(10)
const page_count=ref(10)
const emit=defineEmits(['page_data']);


//父组件参数
// eslint-disable-next-line no-unused-vars
const fatherData=defineProps({
  page_size:{
    type:Number,
    required:true
  },
  type:{
    type:String,
    required:false
  },
  url:{
    type:String,
    required:true
  },
  config:{
    type:Object,
    required:false
  }
})

function getApi(type, url, config, page,page_size) {
  console.log(type)
  try {
    const response = axios({
      method: type,
      url: url,
      params: {
        page:page,
        page_size:page_size
      },
      ...config
    });
    return response.data;
  } catch (error) {
    console.error('请求发生异常：', error);
    throw error;
  }
}

//页面改变
const currentChange=(page)=>{
  console.log(page)
  // eslint-disable-next-line no-undef
  emit('page_data', getApi(fatherData.type,fatherData.url,fatherData.config,page,fatherData.page_size))
}

</script>

<style scoped>

</style>