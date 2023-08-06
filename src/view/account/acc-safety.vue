<!--账号安全问题-->
<template>
	<div class="acc-safety">
		<div class="normal-title">
			<div class="block"></div>
			<div>账号安全</div>
		</div>
		<!--主要内容-->
		<div class="content">
			<!--账号分数-->
			<div class="account-score">
				<div>账号分数：<span class="score-value">100</span></div>
				<div class="score-tips">您的账号安全状况棒棒哒，请继续保持良好的安全习惯哦</div>
			</div>
			<!--设置-->
			<div class="setting">
				<div class="setting-block">
					<div class="setting-block__title">密保问题</div>
					<div class="setting-block__tips">您未设置密保</div>
					<div class="setting-block__operation">设置密保</div>
				</div>
				<div class="setting-block">
					<div class="setting-block__title">绑定新浪微博</div>
					<div class="setting-block__tips">您未绑定</div>
					<div class="setting-block__operation">绑定</div>
				</div>
				<div class="setting-block">
					<div class="setting-block__title">密保问题</div>
					<div class="setting-block__tips">您未设置密保</div>
					<div class="setting-block__operation">设置密保</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>

</script>

<style scoped>
.normal-title {
	display: flex;
	align-items: center;
	padding: 10px 0;
	border-bottom: 1px solid #ececec;
}

.block {
	width: 5px;
	height: 20px;
	background: #00AEEC;
	border-radius: 4px;
	margin-right: 10px;
}

.account-score {
	font-size: 16px;
	font-weight: 600;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	background: rgba(0, 174, 236, 0.1);
	border-radius: 4px;
	padding: 50px 0;
	margin-top: 20px;
}

.score-value {
	font-size: 24px;
	color: #00AEEC;
}

.score-tips {
	font-size: 14px;
	color: #999999;
	font-weight: 400;
	margin-top: 10px;
}

.setting {
	margin-top: 20px;
}

.setting-block {
	padding: 20px 0;
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-bottom: 1px solid #ececec;
}

.setting-block__title{
	flex: 1;
}
.setting-block__tips {
	font-size: 14px;
	color: #999999;
	flex: 1;
}

.setting-block__operation {
	color: #00AEEC;
	cursor: pointer;
	font-size: 14px;
}
</style>
