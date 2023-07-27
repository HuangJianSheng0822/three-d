<template>
  <div class="my-component">
    <div class="content">
      <div class="nav">
        <div class="navbar">
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Services</a>
          <a href="#">Contact</a>
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
            <a href="">Home</a>
            <a href="#">About</a>
            <a href="#">Services</a>
            <a href="#">Contact</a>
            <router-link to="content">投稿</router-link>
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

.my-component{
  min-width: 800px;
}

.content {

  background-size: 100% 100%;
  background-repeat: no-repeat;
  width: 100%;
  height: 50px;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  padding: 5px 0px 0px;
  position: fixed;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  min-width: 100px;

}



.navbar {
  display: flex;
  justify-content: center; /* 居中对齐 */
  padding: 10px;
}

.navbar a {
  margin: 0 10px;
  color: #1f72ba;
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

.per{
  display: flex;
}
</style>