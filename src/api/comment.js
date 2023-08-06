import axios from "axios";
function getChildCommentsApi(rootId,page,size){
    return axios.get("/comment/"+rootId+"/"+page+"/"+size)
}

function getRootCommentApi(id){
    return axios.get("/comment/"+id);
}
export {getChildCommentsApi,getRootCommentApi}