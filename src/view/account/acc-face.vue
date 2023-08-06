<template>

	<div class="root">
		<div class="normal-title">
			<div class="block"></div>
			<div>上传头像</div>
		</div>

    <el-form>
      <el-form-item>
        <div class="content">
          <upload-images @img-upload="uploadHandler"></upload-images>
        </div>
      </el-form-item>
      <el-form-item size="large">
        <el-button type="primary" @click="submitForm">提交</el-button>
      </el-form-item>
    </el-form>
	</div>


</template>
<script setup>
import UploadImages from "@/components/upload-images.vue";
import {ref} from "vue";
import {updateUserInfo} from "@/api/user";

const headImg=ref(null)
const uploadHandler=(value)=>{
  headImg.value=value
  console.log(headImg.value)
}
const submitForm=()=>{
  const params={
    headImg:headImg.value
  }
  updateUserInfo(params)
      .then(res=>{
        console.log(res.data.msg)
      })
      .catch(e=>{
        console.log(e)
      })
}
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
.content{
	margin-top: 20px;
}
</style>
