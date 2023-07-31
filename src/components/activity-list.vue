<script setup>

</script>

<template>
  <div class="root">
    <el-card class="box-card">
      <div class="clearfix">
        <span>热门活动</span>
        <el-button style="float: right; padding: 3px 0" type="text">更多</el-button>
      </div>
      <div v-for="o in 4" :key="o" class="text item">
        {{'列表内容 ' + o }}
      </div>
    </el-card>
  </div>

</template>

<style scoped>
.root{
  height: 100%;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.box-card {
  width: 480px;
}
</style>