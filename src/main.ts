import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { createPinia } from "pinia";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

createApp(App)
    .use(createPinia())
    .use(ElementPlus, { locale: zhCn })
    .use(router)
    .mount('#app');
