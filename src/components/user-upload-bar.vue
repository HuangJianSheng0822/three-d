<template>
  <div class="left-nav-component">
    <div class="button">投稿</div>
    <ul class="nav-list">
      <li class="nav-item">
        <router-link to="to"><img src="../assets/ico/home.png"> 首页</router-link>
      </li>
      <li class="nav-item">
        <img src="../assets/ico/history.png"> 内容管理
      </li>
      <li class="nav-item">
        <img src="../assets/ico/setting.png"> 创作设置
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  // 组件逻辑
};
</script>

<style>
.left-nav-component {
  width: 200px;
  min-width: 200px;
  padding: 0px 0px;
  background-color: #f5f5f5;
}

.button {
  background-color: #00A1D6;
  color: #ffffff;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 20px;
  width: 136px;
  height: 30px;
  border-radius: 2px;
  text-align: center;
  line-height: 30px;
  margin-top: 24px;
}

.nav-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
  padding-top: 10px;
  font-size: 14px;
}

.nav-item {
  display: flex;
  align-items: center;
  margin-bottom: 30px;

}
.nav-item>img{
  margin-right: 15px;
}

</style>