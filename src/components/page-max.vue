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
import {defineEmits, defineProps, ref} from "vue";
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
  url:{
    type:String,
    required:true
  },
  config:{
    type:Object,
    required:false
  }
})

initData()
function initData(){
  const params={
    "page":0,
    "size":fatherData.page_size
  }
  axios.post(`http://localhost:8080/video/list`,params).then(res => {
    emit('page_data', res.data)
  })
}


//页面改变

const currentChange=(page)=>{
  const params={
    "page":page,
    "size":fatherData.page_size
  }
  axios.post(`http://localhost:8080/video/list`,params).then(res => {
    emit('page_data', res.data)
  })
}


</script>

<style scoped>

</style>