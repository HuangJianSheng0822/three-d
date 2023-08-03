<template>
  <div class="my-component">
    <div class="content">
      <div class="nav">
        <div class="navbar">
          <router-link to="/home">首页</router-link>
          <router-link to="/home">About</router-link>
          <router-link to="/home">Services</router-link>
          <router-link to="/home">Contact</router-link>
        </div>
      </div>
      <div class="search">
        <div class="search-box">
          <input type="text" class="input-field" placeholder="Search">
          <button class="search-button">
            <i class="fas fa-search"></i>
          </button>
        </div>
      </div>

      <div class="per">
        <user-head-card></user-head-card>
        <div class="nav">

          <div class="navbar">
            <router-link to="/upload"></router-link>
            <router-link to="/favlist">收藏</router-link>
            <router-link to="/content" class="add-con-btn">投稿</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import UserHeadCard from "@/components/user-head-card.vue";
</script>

<style scoped>

/*去除a标签下划线*/
a {
  text-decoration: none;
}
/*去除未被访问的a标签的下划线*/
a:link {
  text-decoration: none;
}
/*去除已经被访问过的a标签的下划线*/
a:visited {
  text-decoration: none;
}
/*去除鼠标悬停时的a标签的下划线*/
a:hover {
  text-decoration: none;
}
/*去除正在点击的a标签的下划线（鼠标按下，尚未松开）*/
a:active {
  text-decoration: none;
}
/*去除获得焦点的a标签的下划线（被鼠标点击过）*/
a:focus {
  text-decoration: none;
}

.my-component{
  min-width: 800px;
}

.content {
  background-size: 100% 100%;
  background-repeat: no-repeat;
  width: 100%;
  height: auto;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  padding: 5px 0px 0px;
  position: fixed;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  min-width: 100px;
  flex-wrap: nowrap;
}


.navbar {
  display: flex;
  justify-content: center; /* 居中对齐 */
  padding: 10px;
}

.navbar a {
  margin: 0 10px;
  text-decoration: none;
}


.search-box {
  width: 370px;
  height: 40px;
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 20px;
  overflow: hidden;
}

.input-field {
  flex: 1;
  height: 100%;
  padding: 10px;
  border: none;
  background-color: #fff;
}

.search-button {
  width: 40px;
  height: 100%;
  border: none;
  background-color: #ccc;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}
a{
  color: #18191C;
}
.per{
  display: flex;
}
.add-con-btn{
  width: 98px;
  height: 34px;
  background-color: #FB7299;
  font-size: 14px;
  color: white;
  font-weight: bold;
  text-align: center;
  line-height: 34px;
  border-radius: 2px;
}
</style>