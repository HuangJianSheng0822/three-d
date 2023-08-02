<template>
  <div class="main">
    <div class="box">
      <div class="left">
        <img src="../assets/img/head.jpg">
      </div>
      <div class="info">
        <p><span class="name">喊你的</span></p>
        <div class="level-box"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  height: 100%; /* 设置高度，撑满整个视口 */
  width: 100%;
}

.box {
  width: 100%;
  height: 100px;
  background-color: #008ac5;
  display: flex;
  align-items: center;
  padding-left: 20px;
}
.left{
  height: 60px;
  width: 60px;
  border-radius: 50%;
}
.left>img{
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.name{
  color: #FB7299;
  font-size: 18px;
}
.level-box{
  height: 20px;
  width: 50px;
  background-color: rgba(232, 147, 14, 0.89);
}
</style>