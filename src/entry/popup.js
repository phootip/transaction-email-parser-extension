import { createApp } from 'vue'
import App from '../view/popup.vue'
import Antd from 'ant-design-vue';
// import "ant-design-vue/dist/antd.css";

// createApp(App).mount('#app')
const app = createApp(App);
app.use(Antd).mount('#app');
