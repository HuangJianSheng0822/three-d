const webSocketUrl = `ws://192.168.31.248:8080/barrage?videoId=`;
const liveSocketUrl = `ws://192.168.31.248:8080/live?liveId=`;
function getSocketUrl(id){
    return webSocketUrl+id;
}
function getLiveSocketUrl(id){
    return liveSocketUrl+id;
}
export {getSocketUrl,getLiveSocketUrl}