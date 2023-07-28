<template>
  <div class="avatar-container">
    <div
        class="avatar"
        :class="{ 'avatar-active': isHovered }"
        @mouseover="handleMouseOver"
        @mouseleave="handleMouseLeave"
    >
      <img :src="avatarUrl" />
      <div v-if="isHovered" class="card">
        <span class="user-id">{{ userId }}</span>
        <div class="card-content">
          <ul>
            <li>
              <a>
                <div class="li-box">
                  <div class="li-content">
                    <img src="../assets/ico/home.png" style="width: 20px">
                    <span class="text"><router-link to="/account">个人中心</router-link></span>
                  </div>
                  <img src="../assets/ico/to-right.png" style="width: 20px;float: right">
                </div>
              </a>
            </li>
            <li>
              <a>
                <div class="li-box">
                  <div class="li-content">
                    <img src="../assets/ico/home.png" style="width: 20px">
                    <span class="text">投稿管理</span>
                  </div>
                  <img src="../assets/ico/to-right.png" style="width: 20px;float: right">
                </div>
              </a>
            </li>
          </ul>
        </div>
        <div class="logout-box">
          <hr>
          <div class="li-box">
            <div class="li-content">
              <img src="../assets/ico/home.png" style="width: 20px">
              <span class="text">退出登录</span>
            </div>
            <img src="../assets/ico/to-right.png" style="width: 20px;float: right">
          </div>

        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
  import {ref} from "vue";

  const avatarUrl=ref('https://p.qqan.com/up/2021-6/16239805423883054.jpg')
  const userId=ref('User123')
  const isHovered=ref(false)
  const handleMouseOver=()=>{
    isHovered.value=true;
  }
  const handleMouseLeave=()=>{
    isHovered.value=false;
  }
</script>

<style scoped>
.avatar-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.avatar {
  position: relative;
  width: 50px;
  height: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.avatar-active {
  width: 70px;
  height: 70px;
}

.card {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  width: 250px;
  height: 400px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #61666D;
}

.card-content {
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.user-id {
  font-weight: bold;
  margin-bottom: 10px;
}

ul {
  list-style: none;
  padding: 0 10px;
  margin: 0;
  width: 100%;
}

li {

  height: 40px;
}
.li-content {
  display: flex;
  align-items: center;
}
.li-content>img{
  margin-right: 17px;
}

.li-content .icon {
  margin-right: 10px;
}
.logout-box{
  width: 100%;
  margin-bottom: 10px;
}
.li-box{
  display: flex;
  justify-content: space-between;
}
</style>