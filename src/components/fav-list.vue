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
                    <div v-for="(item,index) in 20" :key="index">
                        <!--收藏列表单个样式-->
                        <div class="fav-block">
                            <!--图片-->
                            <div class="image">
                                <div class="image-mask">这里可以显示你的内容</div>
                            </div>
                            <div class="title">这里是你的视频名字</div>
                            <div class="tips">收藏于：2023-07-07</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import {ref} from 'vue';
import {getCollectListApi, addCollect} from "@/api/collect";
import UploadImages from "@/components/upload-images.vue";

const activeIndex = ref(0); // 默认选中第一个
const activeCollectData=ref({
  "id": "",
  "name": "",
  "cover": "",
  "desc": "",
  "created": ""
})
const changeActive = (index, id) => {
    activeIndex.value = index;
    types.value.forEach(e=>{
      if (e.id===id){
        activeCollectData.value=e
      }
    })
};

const types = ref([])

const initTypes = () => {
    getCollectListApi()
        .then((res) => {
            types.value = res.data.data
        })
        .catch(err => {
            console.log(err)
        })

}
initTypes()


console.log("val" + types.value)

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
</style>