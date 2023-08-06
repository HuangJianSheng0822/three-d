<!--黑名单管理-->
<template>
	<div class="black-list">
		<div class="normal-title">
			<div class="block"></div>
			<div>黑名单管理</div>
		</div>
		<div class="content">
			<el-table
				:data="tableDate"
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
				<el-table-column
					width="80"
					label="操作">
					<template #default>
						<span style="color: #00AEEC;cursor: pointer">解封</span>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination class="pagination" background layout="prev, pager, next" :total="1000" @size-change="sizeChange"/>
		</div>
	</div>
</template>

<script setup>


import {ref} from "vue";

let tableDate = ref([
	{ date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄' }, { date: '2016-05-04', name: '王小虎', address: '上海市普陀区金沙江路 1517 弄' },
	{ date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄' }, { date: '2016-05-04', name: '王小虎', address: '上海市普陀区金沙江路 1517 弄' }
])
const sizeChange = () => {
	console.log('分页大小变化');
};
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

.content {
	margin-top: 20px;
}

.pagination {
	margin-top: 10px;
	display: flex;
	justify-content: flex-end;
}
</style>
