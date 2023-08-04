import { createApp } from 'vue';
import App from './App.vue';

import axios from 'axios';
const app = createApp(App);
app.config.globalProperties.$axios = axios;
axios.defaults.baseURL='https://41417103ci.imdo.co:443';

import router from './router/router.js'
app.use(router)

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

app.use(ElementPlus)
app.mount('#app');
