import axios from "axios";
axios.defaults.baseURL='http://localhost:8080';
function getChildCommentsApi(rootId,page,size){
    return axios.get("/comment/"+rootId+"/"+page+"/"+size)
}

function getRootCommentApi(id){
    return axios.get("http://localhost:8080/comment/"+id);
}
export {getChildCommentsApi,getRootCommentApi}