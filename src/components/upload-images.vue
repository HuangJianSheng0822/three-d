<template>
  <div class="root">
    <el-form
        :model="form"
        label-width="120px"
        :label-position="'left'"
        :rules="rules"
        ref="formRef">

      <el-form-item :label="fatherData.title" prop="coverUrl">
        <el-upload
            class="avatar-uploader"
            action="http://192.168.31.248:8080/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            style="border: 1px dashed #FF6699;"
            :class="{avatar_rectangle:fatherData.proportion==='avatar_rectangle'}">
          <img v-if="form.url" :src="form.url" class="avatar" alt="">
          <img v-else src="../assets/ico/upload.png" class="upload-icon" alt="">
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>


<script setup>
import {defineEmits,ref,defineProps} from "vue";

const emit = defineEmits(['img-upload'])
const fatherData=defineProps(['title','proportion'])

const form=ref({
  url:''
})
const rules=ref({
  url:[
    { required: true,message: '图片不能为空', trigger: 'blur'},
  ]
})
const formRef=ref(null);

const handleAvatarSuccess=(res)=>{
  form.value.url= res.data;
  emit('img-upload',form.value.url)
}
const beforeAvatarUpload=(file)=> {
  const isJPG = file.type === 'image/jpeg';
  if (!isJPG) {
    alert("只能上传图片")
  }
  return isJPG;
}

</script>

<style scoped>
.avatar-uploader {
  border: 1px dashed #1f72ba;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 150px;
  height: 150px;
  text-align: center;
}
.avatar-uploader :hover {
  border-color: #409EFF;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.upload-icon{
  width: 50px;
  margin-top: 54px;
}
.avatar_rectangle{
  width: 178px;
  height: 100px;
}
</style>
