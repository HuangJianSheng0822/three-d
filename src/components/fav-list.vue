<template>
    <div class="root">
        <div class="left">
            <div class="add-btn">
                <el-popover placement="left-end" :width="400" trigger="click">
                    <template #reference>
                        <el-button class="add-btn">新建收藏夹</el-button>
                    </template>
                    <div>
                        <el-form ref="addFormRef" v-model="typeData" :rules="rules" size="medium" label-width="100px"
                                 label-position="left">
                            <upload-images @img-upload="getImgUrl" :title="'封面'" :proportion="'avatar_rectangle'"></upload-images>
                            <el-form-item label="收藏夹名称" prop="name">
                                <el-input v-model="typeData.name" placeholder="请输入收藏夹名称" :maxlength="20"
                                          show-word-limit clearable style="width: 100%"></el-input>
                            </el-form-item>
                            <el-form-item label="简介" prop="desc">
                                <el-input v-model="typeData.desc" type="textarea" placeholder="可填写简介"
                                          :maxlength="200" show-word-limit :autosize="{minRows: 4, maxRows: 6}"
                                          style="width: 100%"></el-input>
                            </el-form-item>
                            <el-form-item label="是否公开" prop="open">
                                <el-switch v-model="typeData.open" class="is-open"></el-switch>
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
                    <span>{{ type.name }}</span>
                </div>
            </div>
        </div>
        <div class="right">
            <!--收藏夹-->
            <div class="fav-collapse">
                <div class="normal-title">
                    <div class="block"></div>
                    <div>收藏夹</div>
                </div>
                <!--收藏夹列表-->
                <div class="collapse-content">
                    <div>
                        <!--收藏列表单个样式-->
                        <div class="fav-block">
                            <!--图片-->
                            <div class="image">
                              <img :src="activeCollectData.cover" :alt="activeCollectData.desc">
                            </div>
                            <div class="title">{{activeCollectData.name}}</div>
                            <div class="tips">创建于：{{activeCollectData.created}}</div>
                        </div>
                    </div>
                </div>
            </div>

            <!--收藏列表-->
            <div class="list mt40">
                <div class="normal-title">
                    <div class="block"></div>
                    <div>收藏的视频</div>
                </div>
                <div class="list-content">
                    <div v-for="(item,index) in collectVideoLise" :key="index">
                        <!--收藏列表单个样式-->
                        <div class="fav-block">
                            <!--图片-->
                            <div class="image">
                              <img :src="item.coverUrl" :alt="item.name">
                            </div>
                            <div class="title">{{item.name}}</div>
                            <div class="tips">收藏于：{{item.created}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import {ref} from 'vue';
import {getCollectListApi, addCollect, getCollectVideoListApi} from "@/api/collect";
import UploadImages from "@/components/upload-images.vue";

const activeIndex = ref(0); // 默认选中第一个
const activeCollectData=ref({
  "id": "",
  "name": "",
  "cover": "",
  "desc": "",
  "created": ""
})
const collectVideoLise=ref([])


const types = ref([])

const initTypes = () => {
    getCollectListApi()
        .then((res) => {
            types.value = res.data.data
          changeActive(0,types.value[0].id)
        })
        .catch(err => {
            console.log(err)
        })

}
initTypes()

const changeActive = (index, id) => {
  activeIndex.value = index;
  types.value.forEach(e=>{
    if (e.id===id){
      activeCollectData.value=e
    }
  })
  getCollectVideoListApi(id,0,10)
      .then(res=>{
        collectVideoLise.value=res.data.data
      })
      .catch(e=>{
        console.log(e)
      })
};


const imgUrl = ref('')
const addFormRef = ref(null)
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

const submitForm = () => {

    typeData.value.cover = imgUrl.value
    addCollect(typeData.value)
};

const resetForm = () => {
    addFormRef.value.valid.resetFields();
};

</script>

<style scoped>
.root {
    display: flex;
    padding: 0 20px;
}

.left {
    width: 200px;
    height: 500px;
}

.right {
    flex: 1;
    margin-left: 20px;
}

.list-item {
    height: 60px;
    font-size: 14px;
    text-align: center;
    margin-top: 5px;
  line-height: 60px;
}

.active {
    background-color: #00a1d6;
    color: white;
}

.el-upload__tip {
    line-height: 1.2;
}

.add-btn > button {
    height: 60px;
    width: 100%;
}

.list-item:hover {
    cursor: pointer;
}

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

.fav-block .image {
    width: 250px;
    height: 150px;
    background: #00AEEC;
    border-radius: 4px;
    cursor: pointer;
}

.fav-block .title {
    font-size: 14px;
    font-weight: 500;
    margin-top: 10px;
    cursor: pointer;
}

.fav-block .title:hover {
    color: #00AEEC;
}

.fav-block .tips {
    font-size: 14px;
    color: #999999;
    margin-top: 15px;
}

.list-content, .collapse-content {
    padding: 20px;
    display: grid;
    grid-template-columns: repeat(auto-fill, 250px);
    grid-gap: 20px;
}

.image-mask {
    opacity: 0;
    width: 100%;
    height: 100%;
    color: #ffffff;
    font-size: 14px;
}

.fav-block .image:hover .image-mask {
    opacity: 1;
    background: rgba(155, 162, 169, 0.5);
}

.mt40 {
    margin-top: 40px;
}
.image>img{
  width: 100%;
  height: 100%;
}





.is-open::after {
  content: url("data:image/svg+xml,%3Csvg xmlns='://www.w3.org/2000/svg' width='23' height='23' viewBox='0 0 23 23' fill='none'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M6.55021 5.84315L17.1568 16.4498L16.4497 17.1569L5.84311 6.55026L6.55021 5.84315Z' fill='%23EA0707' fill-opacity='0.89'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M17.1567 6.55021L6.55012 17.1568L5.84302 16.4497L16.4496 5.84311L17.1567 6.55021Z' fill='%23EA0707' fill-opacity='0.89'/%3E%3C/svg%3E");
  position: absolute;
  top: 0;
  left: 20px;
}

.is-open:checked {
  border: 2px solid #02c202;
  background: #e2f1e1;
}

.is-open:checked::before {
  background: rgba(2, 194, 2, 0.5);
  border: 2px solid #02c202;
  transform: translate(133%, 13%);
  transition: all 0.3s ease-in-out;
}

.is-open:checked::after {
  content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='15' height='13' viewBox='0 0 15 13' fill='none'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M14.8185 0.114533C15.0314 0.290403 15.0614 0.605559 14.8855 0.818454L5.00187 12.5L0.113036 6.81663C-0.0618274 6.60291 -0.0303263 6.2879 0.183396 6.11304C0.397119 5.93817 0.71213 5.96967 0.886994 6.18339L5.00187 11L14.1145 0.181573C14.2904 -0.0313222 14.6056 -0.0613371 14.8185 0.114533Z' fill='%2302C202' fill-opacity='0.9'/%3E%3C/svg%3E");
  position: absolute;
  top: 5px;
  left: 5px;
}
</style>