<template>
  <div class="root">
    <el-form ref="userinfoRef" v-model="userInfo" :rules="rules" size="medium" label-width="100px"
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
        <el-button type="primary" @click="submitForm('userInfo')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const userinfoRef=ref(null)
const userInfo = ref({
  name: undefined,
  desc: undefined,
});

const rules = ref({
  name: [
    {
      required: true,
      message: '请输入昵称：',
      trigger: 'blur',
    },
  ],
});

const submitForm = () => {
  userinfoRef.value.validate((valid) => {
    if (!valid) return;
    // TODO 提交表单
  });
};

</script>

<style scoped>
.root{
  margin-top: 20px;
}
</style>
