import axios from "axios";

axios.interceptors.request.use(
    (config)=>{
        // 在请求发送前添加 Authorization 请求头
        const jwtToken = localStorage.getItem('token'); // 假设你的 JWT 存储在 localStorage 中
        if (jwtToken) {
            config.headers.Authorization = jwtToken;
        }
        return config;
    },
    (error)=>{
        return Promise.reject(error);
    }
)
function applyLiveApi(params){
    return axios.post("/lu/",params)
}

export {applyLiveApi}