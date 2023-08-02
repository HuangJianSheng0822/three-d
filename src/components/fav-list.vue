<template>
  <div class="root">
    <div class="left">
      <div class="add-btn">
        <el-popover placement="left-end" :width="400" trigger="click">
          <template #reference>
            <el-button class="add-btn">新建收藏夹</el-button>
          </template>
          <div>
            <el-form ref="addFormRef" v-model="typeData" :rules="rules" size="medium" label-width="100px" label-position="left">

              <!--
               <el-form-item label="收藏夹封面" prop="coverUrl">
                <el-upload ref="coverUrl" v-model="coverUrlfileList" :action="coverUrlAction" :before-upload="coverUrlBeforeUpload" accept="image/*">
                  <el-button size="small" type="primary" icon="el-icon-upload">点击上传</el-button>
                </el-upload>
              </el-form-item>
              -->
              <upload-images @img-upload="getImgUrl"  :title="'封面'"></upload-images>
              <el-form-item label="收藏夹名称" prop="name">
                <el-input v-model="typeData.name" placeholder="请输入收藏夹名称" :maxlength="20" show-word-limit clearable style="width: 100%"></el-input>
              </el-form-item>
              <el-form-item label="简介" prop="desc">
                <el-input v-model="typeData.desc" type="textarea" placeholder="可填写简介" :maxlength="200" show-word-limit :autosize="{minRows: 4, maxRows: 6}" style="width: 100%"></el-input>
              </el-form-item>
              <el-form-item label="是否公开" prop="open" required>
                <el-switch v-model="typeData.open" active-color="#FFFFFF"></el-switch>
              </el-form-item>
              <el-form-item size="large">
                <el-button type="primary" @click="submitForm('typeData')">提交</el-button>
                <el-button @click="resetForm">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-popover>
      </div>
      <div class="fuv-list" v-for="(type,index) in types" :key="index">
        <div class="list-item" :class="{ active: activeIndex === index }" @click="changeActive(index,type.id)">
          <span>{{type.name}}</span>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="list">
        <div v-for="(item,index) in lists" :key="index">
          <h1>{{item}}</h1>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import {ref} from 'vue';
import {getCollectList,addCollect} from "@/api/collect";
import UploadImages from "@/components/upload-images.vue";
const activeIndex = ref(0); // 默认选中第一个

// eslint-disable-next-line no-unused-vars
const changeActive = (index,id) => {
  activeIndex.value = index;
  lists.value=["3","4"]
};
const lists=ref(["1","2"]);
const types=ref([])

const initTypes=async ()=>{
  types.value=await getCollectList();

}
initTypes()



console.log("val"+types.value)

const imgUrl=ref('')
const addFormRef=ref(null)
// eslint-disable-next-line no-unused-vars
const getImgUrl = (value) => {
  imgUrl.value = value;
}

const typeData = ref({
  cover: "",
  name: "",
  desc: "",
  open: true,
});

const rules = ref({
  name: [
    {
      required: true,
      message: '请输入收藏夹名称',
      trigger: 'blur',
    },
  ],
  desc: [],
});

// eslint-disable-next-line no-unused-vars
const coverUrlAction = 'https://jsonplaceholder.typicode.com/posts/';
// eslint-disable-next-line no-unused-vars
const coverUrlfileList = ref([]);

const submitForm = () => {

    typeData.value.cover=imgUrl.value
    addCollect(typeData.value)
};

const resetForm = () => {
  addFormRef.value.valid.resetFields();
};

// eslint-disable-next-line no-unused-vars
const coverUrlBeforeUpload = (file) => {
  const isRightSize = file.size / 1024 / 1024 < 2;
  if (!isRightSize) {
    //$message.error('文件大小超过 2MB');
  }
  const isAccept = new RegExp('image/*').test(file.type);
  if (!isAccept) {
    //$message.error('应该选择image/*类型的文件');
  }
  return isRightSize && isAccept;
};
</script>

<style scoped>
.root {
  display: flex;
}

.left {
  width: 200px;
  height: 500px;
}

.right {
  flex: 1;

}

.list-item {
  height: 60px;
  font-size: 14px;
  text-align: center;
  margin-top: 5px;
}

.active {
  background-color: #00a1d6;
  color: white;
}
.el-upload__tip {
  line-height: 1.2;
}
.add-btn>button{
height: 60px;
  width: 100%;
}
.list-item:hover{
  cursor: pointer;
}
</style>