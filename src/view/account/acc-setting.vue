<template>
  <div class="root">
    <el-form ref="userinfoRef" :model="userInfo" :rules="rules" size="medium" label-width="100px"
             label-position="left">
      <el-form-item label="昵称：" prop="name">
        <el-input v-model="userInfo.name" :maxlength="11" show-word-limit clearable :style="{width: '100%'}">
        </el-input>
      </el-form-item>
      <el-form-item label="简介：" prop="desc">
        <el-input v-model="userInfo.desc" type="textarea" placeholder="设置您的签名- ( ゜- ゜)つロ简介：" :maxlength="200"
                  show-word-limit :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
      </el-form-item>
      <el-form-item size="large">
        <el-button type="primary" @click="submitForm">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import {updateUserInfo} from "@/api/user";


const userinfoRef=ref(null)
const userInfo = ref({
  name: undefined,
  desc: undefined,
});

const rules ={
  name: [
    {
      required: true,
      message: '请输入昵称：',
      trigger: 'blur',
    },
  ]
};

const submitForm = () => {
  userinfoRef.value.validate((valid) => {
    if (valid) {
      updateUserInfo(userInfo.value)
          .then(res=>{
            console.log(res)
          })
          .catch(e=>{
            console.log(e)
          })
    }
  });
};

</script>

<style scoped>
.root{
  margin-top: 20px;
}
</style>
