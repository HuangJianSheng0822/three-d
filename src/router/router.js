// history模式
import {
    createRouter,
    createWebHashHistory,
} from 'vue-router'

import LoginView from "@/components/login-view.vue";
import RegisterView from "@/components/register-view.vue";
import HomeView from "@/view/home-view.vue";
import VideoPlayView from "@/view/video-play-view.vue";
import UploadContent from "@/view/upload-content.vue";
import VideoUpload from "@/components/video-upload.vue";
const routes = [
    {
        path: "/login",
        component:LoginView
    },
    {
        path: "/register",
        component:RegisterView
    },
    {
        path: "/home",
        component:HomeView
    },
    {
        path: "/playing/:id/:userId",
        name: "playing",
        component:VideoPlayView
    },
    {
        path: "/content",
        name: "content",
        component:UploadContent,
        redirect: '/video-upload',
        children: [
            {
                path: '/video-upload',
                name: 'video-upload',
                component: VideoUpload
            }
        ]
    },
    {
        path: '/',
        redirect: '/login'
    }
]


// 创建路由对象
const router = createRouter({
    history: createWebHashHistory(),
    routes
})
export default router;