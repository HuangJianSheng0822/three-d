import axios from "axios";
axios.defaults.baseURL='http://localhost:8080';
function getVideoCoverList(page,size){
    const params={
        page:page,
        size:size
    }
    return axios.post('/video/list',params)
}

export {getVideoCoverList}