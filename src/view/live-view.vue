<template>
  <div class="root">
    <div class="top">
      <home-top-bar></home-top-bar>
    </div>
    <div class="main">
      <div class="left">
        <live-box></live-box>
      </div>
      <div class="right">
        <live-barrage :id="123456"></live-barrage>
      </div>
    </div>

  </div>
</template>
<script setup>
import LiveBox from "@/components/live-box.vue";
import LiveBarrage from "@/components/live-barrage.vue";
import HomeTopBar from "@/components/home-top-bar.vue";
</script>

<style scoped>
.top {
  width: 100%;
}
.main{
  margin-top: 50px;
  display: flex;
  padding: 0 100px;
  flex-wrap: nowrap;
  justify-content: center;
}

.left{
  width: 916px;
  height: auto;
}
.right {
  margin-left: 50px;
  width: 360px;
  height: 648px;
  /*	border: 1px solid blue;*/
  flex-wrap: nowrap;
  min-width: 360px;
}
</style>