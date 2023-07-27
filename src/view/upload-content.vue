<template>
  <div class="page">
    <div class="top">
      <!-- 顶部组件 -->
      <email-ico></email-ico>
    </div>
    <div class="content">
      <div class="left">
        <!-- 左侧导航栏组件 -->
        <user-upload-bar></user-upload-bar>
      </div>
      <div class="right">
        <!-- 右侧内容区域 -->
        <router-view></router-view>

      </div>
    </div>
  </div>
</template>

<script setup>
import EmailIco from "@/components/email-ico.vue";
import UserUploadBar from "@/components/user-upload-bar.vue";
</script>
<style scoped>



.page {
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.top {
  height: 60px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  color: #999999;
  display: flex;
  align-items: center;
  justify-content: end;
  padding: 0 20px;
}


.content {
  flex: 1;
  display: flex;
  flex-direction: row;
}

.left {
  width: 200px;
  min-width: 200px;
  padding: 0 50px;
  background-color: #f5f5f5;
}

.right {
  flex: 1;
  padding: 20px;
  width: 100%;
}

</style>