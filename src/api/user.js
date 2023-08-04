import axios from "axios";
function login(params){
    return axios.post("/user/login",params)
}
function getUserInfoApi(userId){
    return axios.get("/user/"+userId)
}
export {login,getUserInfoApi}