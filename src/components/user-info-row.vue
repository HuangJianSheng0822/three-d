<template>
	<div class="main">
		<div class="box">
			<!--头像-->
			<div class="left">
				<img :src="userInfo.headImg">
			</div>
			<div class="info">
				<div class="user-info">
					<span class="name">{{userInfo.name}}</span>
					<div class="level-box">正式会员</div>
				</div>
				<div>
					{{userInfo.desc}}
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import {ref} from "vue";
import {getUserSelf} from "@/api/user";

const userInfo=ref({
  name:'',
  headImg:'',
  desc:''
})
getUserSelf()
    .then(res=>{
      userInfo.value=res.data.data
    })
    .catch(e=>{
      console.log(e)
    })

</script>

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
//background-color: #008ac5; display: flex;
	align-items: center;
	padding: 0 20px;
	border-radius: 4px;
}

.left {
	height: 60px;
	width: 60px;
	border-radius: 50%;
}

.left > img {
	width: 100%;
	height: 100%;
	border-radius: 50%;
}

.name {
	color: #FB7299;
	font-size: 20px;
	font-weight: 500;
}

.level-box {
	padding: 2px 10px;
	border: 1px solid #9BA2A9;
	font-size: 12px;
	color: #9BA2A9;
	border-radius: 4px;
	margin-left: 10px;
}

.info {
	margin-left: 10px;
}

.user-info {
	display: flex;
	align-items: center;
}
</style>
