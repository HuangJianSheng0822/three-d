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
import CreateInfo from "@/components/create-info.vue";
import VideoManage from "@/components/video-manage.vue";
import AccHome from "@/view/account/acc-home.vue";
import AccountView from "@/view/account-view.vue";
import AccSetting from "@/view/account/acc-setting.vue";
import AccFace from "@/view/account/acc-face.vue";
import FavListView from "@/view/fav-list-view.vue";
import AccUserIntegration from "@/view/account/acc-userIntegration.vue";
import AccSafety from "@/view/account/acc-safety.vue";
import AccBlackList from "@/view/account/acc-black-list.vue";
import AccRecord from "@/view/account/acc-record.vue";
import LiveView from "@/view/live-view.vue";
import AccLiveSeting from "@/view/account/acc-live-seting.vue";
import LivePlayView from "@/view/live-play-view.vue";
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
        path: "/live-home",
        component:LiveView
    },
    {
        path: "/live/:id",
        component: LivePlayView
    },
    {
        path: "/playing/:id/:userId",
        name: "playing",
        component:VideoPlayView
    },
    {
        path: '/favlist',
        name: 'favlist',
        component: FavListView
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
            },
            {
                path: '/create-info',
                name: 'create-info',
                component: CreateInfo
            },
            {
                path: "/video-manage",
                name: "video-manage",
                component: VideoManage
            }
        ]
    },
    {
        path:"/account",
        name: "account",
        component: AccountView,
        redirect: "/acc-home",
        children: [
            {
                path: "/acc-home",
                name: "acc-home",
                component: AccHome
            },
            {
                path: "/acc-setting",
                name: "acc-setting",
                component: AccSetting
            },
            {
                path: "/acc-face",
                name: "acc-face",
                component: AccFace
            },
            {
                path: "/acc-integration",
                name: "acc-integration",
                component: AccUserIntegration
            },
            {
                path: "/acc-safety",
                name: "acc-safety",
                component: AccSafety
            },
            {
                path: "/acc-black-list",
                name: "acc-black-list",
                component: AccBlackList
            },
            {
                path: "/acc-live-setting",
                name: "acc-live-setting",
                component: AccLiveSeting
            },
            {
                path: "/acc-record",
                name: "acc-record",
                component: AccRecord
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
