import axios from "axios";
axios.defaults.baseURL='http://localhost:8080';
axios.interceptors.request.use(
    (config)=>{
        // 在请求发送前添加 Authorization 请求头
        const jwtToken = localStorage.getItem('jwt'); // 假设你的 JWT 存储在 localStorage 中
        if (jwtToken) {
            config.headers.Authorization = jwtToken;
        }
        return config;
    },
    (error)=>{
        return Promise.reject(error);
    }
)

function getCollectList() {
    // 在这里进行你的具体请求逻辑
    return axios.get('/collect/list')
        .then((res)=>{
            return res.data.data
        })
        .catch(err=>{
            console.log(err)
        })
}

function addCollect(params){
    return axios.post('/collect/add',params)
        .then((res)=>{
            return res.data.data
        })
        .catch(err=>{
            console.log(err)
        })
}

function addCollectVideo(collectId,videoId){
    return axios.post('/collect/video/'+collectId+"/"+videoId)
        .then((res)=>{
            return res.data.data
        })
        .catch(err=>{
            console.log(err)
        })
}

export { getCollectList,addCollect,addCollectVideo };