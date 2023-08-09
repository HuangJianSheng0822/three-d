const webSocketUrl = `ws://192.168.31.248:8080/barrage?videoId=`;

function getSocketUrl(id){
    return webSocketUrl+id;
}

export {getSocketUrl}