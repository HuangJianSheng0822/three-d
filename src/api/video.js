import axios from "axios";
function getVideoCoverList(page,size){

    return axios.get('/video/'+page+"/"+size);
}

function getVideoInfoApi(id){
    return axios.post("/video/"+id)
}
export {getVideoCoverList,getVideoInfoApi}