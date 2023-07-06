import "./assets/base.css"; //引入基础样式文件

import { createApp } from "vue";
import App from "./App.vue"; //引入Vue核心文件

const app = createApp(App);

app.mount("#app"); //Vue初始化
