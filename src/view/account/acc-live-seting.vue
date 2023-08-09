<template>
  <div class="root">
    <div class="normal-title">
      <div class="block"></div>
      <div>直播设置</div>
    </div>
    <el-form ref="formRef" :model="formData" :rules="rules" size="medium" label-width="100px"
             label-position="left">
     <el-form-item label="申请缘由：" prop="applyDesc">
      <el-input v-model="formData.applyDesc" type="textarea"
                placeholder="请填写你的申请理由- ( ゜- ゜)つロ"
                :maxlength="200">
      </el-input>
     </el-form-item>

      <el-form-item label="直播类型" prop="typeId">
        <el-select v-model="formData.typeId" placeholder="选择直播类型">
          <el-option label="潮流" value="1"></el-option>
          <el-option label="游戏" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="直播认证密码" prop="auth">
        <el-input v-model="formData.auth" type="password"
                  placeholder="该密码作为直播认证，请牢记- ( ゜- ゜)つロ">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">立即申请</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import {applyLiveApi} from "@/api/lu";


const formRef=ref(null)
const formData = ref({
  applyDesc:undefined,
  typeId:"1",
  auth:undefined
});

const rules ={
  applyDesc: [
    { required: false, message: '', trigger: 'blur' }
  ],
  typeId: [
    { required: true, message: '请选择直播类型', trigger: 'change' }
  ],
  auth: [
    { required: true, message: '请输入直播密码', trigger: 'blur' },
    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
  ]
};

const submitForm = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      applyLiveApi(formData.value)
          .then(res=>{
            formData.value.applyDesc=null;
            formData.value.auth=null;
            alert(res.data.msg)
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
.normal-title {
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #ececec;
  margin-bottom: 10px;
}

.block {
  width: 5px;
  height: 20px;
  background: #00AEEC;
  border-radius: 4px;
  margin-right: 10px;
}
</style>
