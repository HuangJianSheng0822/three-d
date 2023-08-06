<!--会员积分-->
<template>
	<div class="user-integration">
		<div class="title">
			<div class="block"></div>
			<div>会员积分</div>
		</div>
		<!--主要内容区域-->
		<div class="content">
			<!--Tab切换-->
			<el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
				<el-tab-pane label="首页" name="first">
					<div class="banner">会员积分余额：<span class="integration-value">0</span></div>
					<!--兑换大会员-->
					<div class="redeem">
						<div class="normal-title">
							<div class="block"></div>
							<div>兑换大会员</div>
						</div>
						<div class="redeem-content">
							<div class="redeem-content__block">
								<div class="redeem-content__block-title">大会员</div>
								<div class="redeem-content__block-info">
									<span class="redeem-value">1250</span>
									积分/月
								</div>
							</div>
							<div class="redeem-content__block">
								<div class="redeem-content__block-title">年度大会员</div>
								<div class="redeem-content__block-info">
									<span class="redeem-value">1250</span>
									积分/月
								</div>
							</div>
							<div class="redeem-content__block">
								<div class="redeem-content__block-title">年度小会员</div>
								<div class="redeem-content__block-info">
									<span class="redeem-value">1250</span>
									积分/月
								</div>
							</div>
						</div>
					</div>
					<!--头像挂件兑换-->
					<div class="avatar">
						<div class="normal-title">
							<div class="block"></div>
							<div>头像挂件兑换</div>
						</div>
						<div class="content">
							这里面你随便写点就好
						</div>
					</div>
					<!--其余提示内容-->
					<div class="tips">
						<div class="content">
							<task-view></task-view>
						</div>
					</div>
				</el-tab-pane>
				<el-tab-pane label="积分记录" name="second">
					<div class="integration-title">
						<div class="block"></div>
						<div class="user-integration-table-title">会员积分记录</div>
					</div>
					<el-table
						:data="tableData"
						v-if="activeName === 'second'"
						style="width: 100%">
						<el-table-column
							prop="date"
							label="日期"
							width="180">
						</el-table-column>
						<el-table-column
							prop="name"
							label="姓名"
							width="180">
						</el-table-column>
						<el-table-column
							prop="address"
							label="地址">
						</el-table-column>
					</el-table>
					<div class="integration-table"></div>
				</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>

<script setup>
import {ref} from "vue";
import TaskView from "@/components/task-view.vue";

// Tab切换
const activeName = ref("first");
// 表格内容
let tableData = ref([
	{date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄'}, {
		date: '2016-05-04',
		name: '王小虎',
		address: '上海市普陀区金沙江路 1517 弄'
	}, {date: '2016-05-04', name: '王小虎', address: '上海市普陀区金沙江路 1517 弄'}
]);

const handleClick = (tab, event) => {
	console.log(tab, event);
};
</script>

<style scoped>
.user-integration .title {
	padding: 10px 0;
	display: flex;
	align-items: center;
	position: relative;
	border-bottom: 1px solid #ececec;
}

.normal-title {
	display: flex;
	align-items: center;
}

.title .block, .integration-title .block, .normal-title .block {
	width: 5px;
	height: 20px;
	background: #00AEEC;
	border-radius: 4px;
	margin-right: 10px;
}

.content {
	padding: 20px 0;
}

.integration-title {
	padding: 10px 0;
	display: flex;
	align-items: center;
}

.user-integration-table-title {
	font-size: 20px;
	font-weight: 600;
}

.banner {
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 50px;
	background: rgba(0, 174, 236, 0.1);
	border-radius: 4px;
}

.integration-value, .redeem-value {
	color: #00AEEC;
}

.redeem {
	margin-top: 40px;
}

.redeem-content {
	display: flex;
	align-items: center;
	margin-top: 10px;
}

.redeem-content__block {
	padding: 30px 70px;
	border-radius: 4px;
	border: 1px solid #ececec;
	cursor: pointer;
	transition: all 0.2s ease-in-out;
	margin-right: 10px;
}

.redeem-content__block:hover {
	box-shadow: 0 6px 30px 0 rgba(0, 0, 0, 0.06);
	border: 1px solid #00AEEC;
}

.redeem-content__block-title {
	font-weight: 600;
	font-size: 20px;
}

.redeem-content__block-info {
	color: #999999;
	font-size: 12px;
}

.avatar {
	margin-top: 40px;
}
</style>
