
//引入的不再是vue构造函数，而是createApp的工厂函数
import { createApp } from 'vue'
import App from './App.vue'

//创建应用实例对象-app(类似于vm,但app比vm更轻)
const app = createApp(App)
console.log('app',app)
app.mount('#app')


// vm = new Vue({
//     render:h=>h(App)
// }).$mount('#App')