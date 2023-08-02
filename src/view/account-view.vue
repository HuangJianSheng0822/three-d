<template>

  <div class="root">
    <div class="top">
      <home-top-bar></home-top-bar>
    </div>

    <div class="img-box">

    </div>

    <div class="main-box">
      <div class="main">

        <div class="left">
          <user-center-bar></user-center-bar>
        </div>

        <div class="right">
          <router-view></router-view>
        </div>
      </div>
    </div>

  </div>
</template>
<script setup>
import HomeTopBar from "@/components/home-top-bar.vue";
import UserCenterBar from "@/components/user-center-bar.vue";
</script>


<style scoped>
.top{
  height: 50px;
  width: 100%;
  min-width: 1500px;
}

.img-box{
  height: 106px;
  width: 100%;
  background-color: #409EFF;
}
.main-box{
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  margin-top: 30px;
}
.main{
  width: 981px;
  height: 993px;
  display: flex;
  border: 1px solid #9499a0;
  border-radius: 4px;

}
.left{
  width: 170px;
  height: auto;
}
.right{
  flex: 1;
  padding: 0 20px;
}
</style>