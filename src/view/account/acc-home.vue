<template>
  <div class="root">
    <div class="user-info-box">
      <user-info-row></user-info-row>
    </div>
    <hr>
    <div class="daily-rewards-box">
      <task-view></task-view>
    </div>
    <hr>
    <div class="achieve-box">

    </div>
    <hr>
    <div class="secure-box">

    </div>
  </div>
</template>

<script setup>
import UserInfoRow from "@/components/user-info-row.vue";
import TaskView from "@/components/task-view.vue";
</script>
<style scoped>
.root{

}
.user-info-box{
  height: 170px;
  width: 100%;
}
.daily-rewards-box{
  width: 100%;
  height: auto;
}
</style>
