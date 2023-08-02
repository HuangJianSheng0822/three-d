function hasLogin(){
    const jwtToken = localStorage.getItem('jwt'); // 从localStorage中获取JWT
    return !!jwtToken; // 如果jwtToken存在，返回true，否则返回false
}

export {hasLogin}