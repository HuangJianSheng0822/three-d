<template>
  <div class="root">
    <div class="top">
      <home-top-bar></home-top-bar>
    </div>

    <div class="main">
      <div class="right">
        <div class="bg">
          <img src="@/assets/img/zoo.png">
        </div>
      </div>
      <div class="left">
        <live-box></live-box>
      </div>
      <div class="right">
        <live-barrage :id="123456"></live-barrage>
      </div>
    </div>
    <div class="live-active-list">
      <live-active-list></live-active-list>
    </div>

  </div>
</template>
<script setup>
import LiveBox from "@/components/live-box.vue";
import LiveBarrage from "@/components/live-barrage.vue";
import HomeTopBar from "@/components/home-top-bar.vue";
import LiveActiveList from "@/components/live-active-list.vue";
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
  height: 500px;
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
.live-active-list{
  width: 100%;
  height: auto;
}
.bg{
  width: 90%;
}
.bg>img{
  width: 100%;
}
</style>