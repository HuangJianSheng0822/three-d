<template>
  <div class="nav">
    <div class="fuv-list" v-for="(item, index) in pathList" :key="index">
      <router-link :to="item.path">
        <div class="list-item" :class="{ active: activeIndex === index }" @click="changeActive(index)">
          <span>{{ item.title }}</span>
        </div>
      </router-link>
    </div>
  </div>
</template>


<script setup>
import {ref} from "vue";

const activeIndex = ref(0); // 默认选中第一个
const changeActive = (index) => {
  activeIndex.value = index;
};
const pathList=ref([
      {
        path:"/acc-home",
        title:"首页",
        ico:"ico"
      },
      {
        path:"",
        title:"大会员",
        ico:"ico"
      },
      {
        path:"",
        title:"会员积分",
        ico:"ico"
      },
      {
        path:"/acc-setting",
        title:"我的信息",
        ico:"ico"
      },
      {
        path:"/acc-face",
        title:"我的头像",
        ico:"ico"
      },
      {
        path:"",
        title:"账号安全",
        ico:"ico"
      },
      {
        path:"",
        title:"黑名单管理",
        ico:"ico"
      },
      {
        path:"",
        title:"我的记录",
        ico:"ico"
      },
      {
        path:"",
        title:"实名认证",
        ico:"ico"
      }
]

)
</script>
<style scoped>
.nav{
  background-color: #e5d9d9;
  text-align: center;
  height: 100%;
  width: 100%;
}
.list-item {
  height: 60px;
  font-size: 14px;
  text-align: center;
}

.active {
  background-color: #00a1d6;
  color: white;
}
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
a{
  color: #18191C;
  text-align: center;
}
</style>