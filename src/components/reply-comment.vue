<template>
<div class="root">
  <div class="head-box">
    <img src="../assets/img/head.jpg" alt="">
  </div>

  <div class="input-box">
    <el-form-item>
        <el-input  autocomplete="off" type="textarea">
        </el-input>
    </el-form-item>
    <el-button type="primary">
      发布
    </el-button>

  </div>
</div>
</template>

<script setup>

</script>
<style scoped>
.root{
  display: flex;
  align-items: center;
  min-height: 96px;
  flex-wrap: wrap;
}
.head-box>img{
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.input-box{
  height: 65px;
}
.input-box{
  display: flex;
}

textarea,button{
  height: 52px;
}

</style>