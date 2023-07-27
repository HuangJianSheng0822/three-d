<template>
  <div class="container">
    <div v-if="showUpload" class="upload">

      <div class="upload-container">
        <div class="fileinp">
          <div class="upload">选择文件</div>
          <input type="file" @change="fileChange($event)" class="file-up" title="" id="fileUpload">
        </div>
      </div>
    </div>


    <!---------------------------------------视频上传中---------------------------------------------->
    <div v-else class="upload-success">

      <!---------------视频上传进度区域--------------------->
      <div class="upload-progress-area">
        <div>
          <img src="../assets/ico/video.png" alt="">
        </div>
        <div class="progress-bar-area">
          <div class="progress-text">
            上传进度: {{ authProgress }}%
            <div class="uploading-controller-area">

              <button @click="pauseUpload" :disabled="pauseDisabled">暂停</button>
              <button @click="resumeUpload" :disabled="resumeDisabled" >恢复上传</button>
            </div>
          </div>
          <div class="progress-bar">
            <div class="progress-bar-inner" :style="{ width: authProgress + '%' }"></div>
          </div>
        </div>
      </div>

      <!--------------------------视频参数配置-------------------------------->
      <div class="video-setting-area">
        <!---------------封面上传区域--------------------->

        <!---------------表单上传区域--------------------->
        <el-form
            :model="form"
            label-width="120px"
            :label-position="'left'"
            :rules="rules"
            ref="form">

          <el-form-item label="封面" prop="coverUrl">
            <el-upload
                class="avatar-uploader"
                action="http://localhost:8080/video/uploadCover"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                style="border: 2px dashed #1f72ba;">

              <img v-if="form.coverUrl" :src="form.coverUrl" class="avatar" alt="">

              <img v-else src="../assets/ico/upload.png" class="upload-icon" alt="">

            </el-upload>
          </el-form-item>


          <el-form-item label="标题" prop="title">
            <el-input v-model="form.title" placeholder="标题建议提炼靓点内容" ></el-input>
          </el-form-item>

          <el-form-item label="类型" prop="typeId">
            <el-select v-model="form.typeId" placeholder="请选择视频类型">
              <el-option label="动漫" value="1"></el-option>
              <el-option label="mv" value="2"></el-option>
            </el-select>
          </el-form-item>

          <!-------tag---->
          <el-form-item label="Tags">
            <el-tag v-for="(tag, index) in form.tags" :key="index" closable @close="removeTag(index)">
              {{ tag }}
            </el-tag>
            <el-input v-model="newTag" placeholder="Enter a tag" @keyup.enter="addTag"></el-input>
          </el-form-item>

          <el-form-item label="简介" prop="description">
            <el-input type="textarea" v-model="form.description"  placeholder="填写更全面的相关信息，让更多的人能找到你的视频吧(:"></el-input>
          </el-form-item>


          <el-form-item>
            <el-button type="primary" @click="submitForm('form')">立即创建</el-button>
            <el-button>取消</el-button>
          </el-form-item>


        </el-form>

      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import axios from "axios";
import router from "@/router/router";
const showUpload=ref(true)// 是否显示上传界面
const file=ref(null)
const authProgress=ref(0) // 上传进度
const uploadDisabled=ref(true) // 开始，此时不能点击
const resumeDisabled=ref(false) // 恢复上传
const pauseDisabled=ref(true)// 暂停
const uploader=ref(null)
const statusText=ref('')
const newTag=ref('')
const form=ref({
  videoId:'',
  coverUrl:'',
  title: 'title',
  typeId: '',
  description: '',
  tags:[],
})
const rules=ref({
  coverUrl: [
    { required: true,message: '封面不能为空', trigger: 'blur'},
  ],
  title: [
    { required: true, message: '请输入活动名称', trigger: 'blur' },
    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
  ],
  typeId: [
    { required: true, message: '请选择活动区域', trigger: 'change' }
  ],
  description: [
    { required: false, message: '', trigger: 'blur' }
  ]
})

const fileChange=(e)=>{
  file.value = e.target.files[0];
  if (!file.value) {
    alert('请先选择需要上传的文件!');
    return;
  }
  //var Title = file.value.name;
  var userData = '{"Vod":{}}';
  // 修改文件时停止上传
  if (uploader.value) {
    uploader.value.stopUpload();
    authProgress.value = 0;
    statusText.value = '';
  }
  // 上传
  const _this = this;
  uploader.value = createUploader(_this);
  uploader.value.addFile(file.value, null, null, null, userData);
  uploadDisabled.value = false;
  pauseDisabled.value = true;
  resumeDisabled.value = false;
  authUpload();
}
const authUpload = () => {
  if (uploader.value !== null) {
    uploader.value.startUpload();
    uploadDisabled.value = true;
    pauseDisabled.value = false;
  }
}

const pauseUpload = () => {
  if (uploader.value !== null) {
    uploader.value.stopUpload();
    resumeDisabled.value = false;
    pauseDisabled.value = true;
    console.log("stop");
  }
};

const resumeUpload = () => {
  if (uploader.value !== null) {
    uploader.value.startUpload();
    resumeDisabled.value = true;
    pauseDisabled.value = false;
  }
}
function createUploader(_this) {
  _this.resumeDisabled = false;
  // eslint-disable-next-line no-undef
  const uploader = new AliyunUpload.Vod({
    timeout: 60000,
    partSize: 1048576,
    parallel: 5,
    retryCount: 3,
    retryDuration: 2,
    localCheckpoint: true,
    addFileSuccess(uploadInfo) {
      _this.uploadDisabled = false;
      _this.resumeDisabled = false;
      _this.statusText = '添加文件成功, 等待上传...';
      console.log('addFileSuccess: ' + uploadInfo.file.name);
    },
    onUploadstarted(uploadInfo) {
      if (!uploadInfo.videoId) {
        // 首次提交
        // axios 请求
        const createUrl = 'http://localhost:8080/video/getUploadAuth';
        axios.post(createUrl).then(({ data }) => {
          if (data.data == null) {
            alert("上传接口异常");
            return;
          }
          _this.showUpload = false;
          const uploadAuth = data.data.uploadAuth;
          const uploadAddress = data.data.uploadAddress;
          const videoId = data.data.videoId;
          uploader.setUploadAuthAndAddress(uploadInfo, uploadAuth, uploadAddress, videoId);
        });
        _this.statusText = '文件开始上传...';
      } else {
        // 如果videoId有值，根据videoId刷新上传凭证
        const refreshUrl = 'http://localhost:8080/video/refreshUploadAuth/' + uploadInfo.videoId;
        axios.post(refreshUrl).then(({ data }) => {
          if (data.data == null) {
            alert("上传接口异常");
            return;
          }
          const uploadAuth = data.data.uploadAuth;
          const uploadAddress = data.data.uploadAddress;
          const videoId = data.data.videoId;
          uploader.setUploadAuthAndAddress(uploadInfo, uploadAuth, uploadAddress, videoId);
        });
      }
    },
    onUploadSucceed(uploadInfo) {
      _this.statusText = '文件上传成功!';
      _this.showUpload = false; // 上传成功后隐藏上传界面
      console.log("成功" + uploadInfo.videoId);
      console.log(_this.form);
      _this.form.videoId = uploadInfo.videoId;
    },
    // eslint-disable-next-line no-unused-vars
    onUploadFailed(uploadInfo, code, message) {
      _this.statusText = '文件上传失败!';
    },
    // eslint-disable-next-line no-unused-vars
    onUploadCanceled(uploadInfo, code, message) {
      _this.statusText = '文件已暂停上传';
    },
    onUploadProgress(uploadInfo, totalSize, progress) {
      const progressPercent = Math.ceil(progress * 100);
      _this.authProgress = progressPercent;
      _this.statusText = '文件上传中...';
    },
    onUploadTokenExpired(uploadInfo) {
      const refreshUrl = 'https://demo695-mp4&VideoId=' + uploadInfo.videoId;
      axios.get(refreshUrl).then(({ data }) => {
        const uploadAuth = data.UploadAuth;
        uploader.resumeUploadWithAuth(uploadAuth);
      });
      _this.statusText = '文件超时...';
    },
    // 全部文件上传结束
    // eslint-disable-next-line no-unused-vars
    onUploadEnd(uploadInfo) {
      console.log('onUploadEnd: uploaded all the files');
      _this.statusText = '文件上传完毕';
    }
  });

  return uploader;
}

// 图片上传
// eslint-disable-next-line no-unused-vars
const handleAvatarSuccess = (res, file) => {
  console.log(res);
  form.value.coverUrl = res;
};

// 上传前
const beforeAvatarUpload = (file) => {
  const isJPG = file.type === 'image/jpeg';
  if (!isJPG) {
    alert('只能上传图片!');
  }
  return isJPG;
};

// 添加tag
const addTag = () => {
  if (newTag.value) {
    form.value.tags.push(newTag.value);
    newTag.value = '';
  }
};

// 删除tag
const removeTag = (index) => {
  form.value.tags.splice(index, 1);
};

// 表单提交

// eslint-disable-next-line no-unused-vars
const submitForm = (formName) => {
  form.value.validate((valid) => {
    if (valid) {
      console.log('jwt:' + localStorage.getItem('jwt'));
      axios.post('http://localhost:8080/content/add', form, {
            headers: {
              Authorization: localStorage.getItem('jwt'),
            },
          })
          .then((response) => {
            if (response.data.data) {
              // Success logic, you can use page redirection or programmatic navigation
              router.push('/home');
            } else {
              alert('接口异常');
            }
          })
          .catch((error) => {
            console.error(error);
          });
    } else {
      console.log('error submit!!');
      return false;
    }
  })
}

</script>
<style scoped>

</style>
