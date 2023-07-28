<template>
  <div class="container">
    <div v-if="showUpload" class="upload">

      <div class="upload-container">
        <div class="fileinp">
          <div class="upload">选择文件</div>
          <input type="file" @change="fileChange($event)" class="file-up" title="" id="fileUpload">
        </div>
      </div>

      <!--
      <div class="upload-type">
        <button @click="authUpload" :disabled="uploadDisabled" class="upload-start-btn">开始上传</button>
        <button @click="pauseUpload" :disabled="pauseDisabled">暂停</button>
        <button :disabled="resumeDisabled" @click="resumeUpload">恢复上传</button>
      </div>
      -->
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
                action="http://localhost:8080/upload"
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

<script>
import axios from 'axios';
export default {
  data() {
    return {

      file: null,
      authProgress: 0, // 上传进度
      uploadDisabled: true, // 开始，此时不能点击
      resumeDisabled: false, // 恢复上传
      pauseDisabled: true, // 暂停
      uploader: null,
      statusText: '',
      showUpload: true, // 是否显示上传界面
      //表单
      form: {
        videoId:'',
        coverUrl:'',
        title: 'title',
        typeId: '',
        description: '',
        tags:[],
      },
      newTag: '',
      //表单校验
      rules: {
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
      }
    };
  },
  methods: {
    fileChange(e) {
      this.file = e.target.files[0];
      if (!this.file) {
        alert('请先选择需要上传的文件!');
        return;
      }
      var userData = '{"Vod":{}}';
      // 修改文件时停止上传
      if (this.uploader) {
        this.uploader.stopUpload();
        this.authProgress = 0;
        this.statusText = '';
      }
      // 上传
      const _this=this;
      this.uploader = this.createUploader(_this);
      this.uploader.addFile(this.file, null, null, null, userData);
      this.uploadDisabled = false;
      this.pauseDisabled = true;
      this.resumeDisabled = false;
      this.authUpload();
    },
    authUpload() {
      // 然后调用 startUpload 方法, 开始上传
      if (this.uploader !== null) {
        this.uploader.startUpload();
        this.uploadDisabled = true;
        this.pauseDisabled = false;
      }
    },
    // 暂停上传
    pauseUpload() {
      if (this.uploader !== null) {
        this.uploader.stopUpload();
        this.resumeDisabled = false;
        this.pauseDisabled = true;
        console.log("stop")
      }
    },
    // 恢复上传
    resumeUpload() {
      if (this.uploader !== null) {
        this.uploader.startUpload();
        this.resumeDisabled = true;
        this.pauseDisabled = false;
      }
    },
    createUploader(_this) {
      this.resumeDisabled = false;
      let self = this;
      // eslint-disable-next-line no-undef
      let uploader = new AliyunUpload.Vod({
        timeout: 60000, // 请求超时
        partSize: 1048576, // 分片大小，默认1MB
        parallel: 5, // 并行上传分片个数，默认为5
        retryCount: 3, // 失败重试次数，默认为3
        retryDuration: 2, // 失败重试间隔时间，默认2秒
        localCheckpoint: true, // 此参数是禁用服务端缓存，不影响断点续传
        // 添加文件成功
        addFileSuccess: function(uploadInfo) {
          self.uploadDisabled = false;
          self.resumeDisabled = false;
          self.statusText = '添加文件成功, 等待上传...';
          console.log('addFileSuccess: ' + uploadInfo.file.name);
        },
        // 开始上传
        onUploadstarted: function(uploadInfo) {
          // 如果是 UploadAuth 上传方式, 需要调用 uploader.setUploadAuthAndAddress 方法
          // 如果是 UploadAuth 上传方式, 需要根据 uploadInfo.videoId是否有值，调用点播的不同接口获取uploadauth和uploadAddress
          // 如果 uploadInfo.videoId 有值，调用刷新视频上传凭证接口，否则调用创建视频上传凭证接口
          // 如果 uploadInfo.videoId 存在, 调用 刷新视频上传凭证接口
          // 如果 uploadInfo.videoId 不存在,调用 获取视频上传地址和凭证接口
          if (!uploadInfo.videoId) {
            // 首次提交
            // axios 请求
            let createUrl = 'http://localhost:8080/video/getUploadAuth';
            axios.post(createUrl).then(({ data }) => {
              if (data.data==null){
                alert("上传接口异常")
                return;
              }
              self.showUpload = false;
              let uploadAuth = data.data.uploadAuth;
              let uploadAddress = data.data.uploadAddress;
              let videoId = data.data.videoId;

              uploader.setUploadAuthAndAddress(
                  uploadInfo,
                  uploadAuth,
                  uploadAddress,
                  videoId
              );
            });
            self.statusText = '文件开始上传...';

          } else {
            // 如果videoId有值，根据videoId刷新上传凭证
            let refreshUrl = 'http://localhost:8080/video/refreshUploadAuth/' + uploadInfo.videoId;
            axios.post(refreshUrl).then(({ data }) => {
              if (data.data==null){
                alert("上传接口异常")
                return;
              }

              let uploadAuth = data.data.uploadAuth;
              let uploadAddress = data.data.uploadAddress;
              let videoId = data.data.videoId;
              uploader.setUploadAuthAndAddress(
                  uploadInfo,
                  uploadAuth,
                  uploadAddress,
                  videoId
              );
            });
          }
        },
        // 文件上传成功
        onUploadSucceed: function(uploadInfo) {

          self.statusText = '文件上传成功!';
          self.showUpload = false; // 上传成功后隐藏上传界面
          console.log("成功"+uploadInfo.videoId)
          console.log(_this.form)
          _this.form.videoId=uploadInfo.videoId;
        },
        // 文件上传失败
        // eslint-disable-next-line no-unused-vars
        onUploadFailed: function(uploadInfo, code, message) {
          self.statusText = '文件上传失败!';
        },
        // 取消文件上传
        // eslint-disable-next-line no-unused-vars
        onUploadCanceled: function(uploadInfo, code, message) {
          self.statusText = '文件已暂停上传';
        },
        // 文件上传进度，单位：字节，可以在这个函数中拿到上传进度并显示在页面上
        onUploadProgress: function(uploadInfo, totalSize, progress) {
          let progressPercent = Math.ceil(progress * 100);
          self.authProgress = progressPercent;
          self.statusText = '文件上传中...';
        },
        // 上传凭证超时
        onUploadTokenExpired: function(uploadInfo) {
          // 上传大文件超时，如果是上传方式一即根据 UploadAuth 上传时
          // 需要根据 uploadInfo.videoId 调用刷新视频上传凭证接口(https://help.aliyun.com/document_detail/55408.html)重新获取 UploadAuth
          // 然后调用 resumeUploadWithAuth 方法，这里是测试接口，所以我直接获取了 UploadAuth
          let refreshUrl =
              'https://demo695-mp4&VideoId=' + uploadInfo.videoId;
          axios.get(refreshUrl).then(({ data }) => {
            let uploadAuth = data.UploadAuth;
            uploader.resumeUploadWithAuth(uploadAuth);
            console.log(
                'upload expired and resume upload with uploadauth ' +
                uploadAuth
            );
          });
          self.statusText = '文件超时...';
        },
        // 全部文件上传结束
        // eslint-disable-next-line no-unused-vars
        onUploadEnd: function(uploadInfo) {
          console.log('onUploadEnd: uploaded all the files');
          self.statusText = '文件上传完毕';

        }
      });
      return uploader;
    },

    /*-------------------------------参数表单--------------------------------------*/
    //封面上传
    // eslint-disable-next-line no-unused-vars
    handleAvatarSuccess(res, file) {
      console.log(res)
      this.form.coverUrl = res.data;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      if (!isJPG) {
        this.$message.error('只能上传图片!');
      }
      return isJPG;
    },
    //tag事件

    addTag() {
      if (this.newTag) {
        this.form.tags.push(this.newTag);
        this.newTag = '';
      }
    },
    removeTag(index) {
      this.form.tags.splice(index, 1);
    },



    //表单提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log("jwt:"+localStorage.getItem("jwt"));
          axios.post('http://localhost:8080/video/add', this.form,{
            headers: {
              'Authorization': localStorage.getItem("jwt")
            }
          })
              .then(response => {
                if (response.data.data) {
                  // 成功后的跳转逻辑，可以使用页面重定向或者编程式导航
                  this.$router.push('/home');

                } else {

                  alert('接口异常');
                }
              })
              .catch(error => {
                console.error(error);
              });

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }

  }


};
</script>

<style scoped>
.container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}


.upload-container{
  display: flex;
  align-items: center; /*垂直方向居中*/
  justify-content: center;  /*水平方向居中*/
  border: 1px dashed #00AEEC;
  height: 255px;
}
.file {
  margin-bottom: 30px;
}
.fileinp {
  width: 108px;
  height: 30px;
  overflow: hidden;
  position: relative;
  margin: auto;
  background-color: #00AEEC;
  text-align: center;
}
.upload {
  width: 70%;
  border-radius: 13px;
  text-align: center;
  padding: 4px;
  color: #fff;
  margin-left: 11px;
}
.file-up {
  position: absolute;
  top: 0;
  right: 0;
  height: 30px;
  cursor: pointer;

}
.upload-success{
  flex: 1;
}
/*上传进度条*/
.upload-progress-area{
  height: 50px;
  display: flex;
  font-size: 14px;
}

.progress-bar-area{
  height: 50px;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
}
.progress-bar{
  height: 3px;
  background-color: #00AEEC;
}
.progress-bar-inner{
  height: 3px;
  background-color: red;
}

/**控制暂停恢复*/
.uploading-controller-area{
  float: right;
  display: flex;
}
.uploading-controller-area>button{
  margin-right: 10px;
  width: 100px;
  height: 20px;
  background-color: #00AEEC;
  color: white;
  border-width: 0px;
}

.uploading-controller-area>button:active{

  background-color: coral;
}

/*视频参数配置*/
.video-setting-area{
  margin-top: 50px;

}



/*表单元素间隔*/
.el-form-item{
  margin-bottom: 50px;
}
/*tag*/


/*图片上传*/
/*封面上传*/
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
</style>
