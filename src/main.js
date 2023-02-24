import Vue from 'vue'
import App from './App.vue'



import ElementUI, { Message, MessageBox } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI)

// Vue.use(Message)



import store from '../store'


import router from '../router'


import http from 'axios'
Vue.prototype.$http=http


Vue.prototype.$confirm=MessageBox.confirm
// Vue.prototype.$message=Message

import '../api/mock.js'

router.beforeEach((to,from,next)=>{
  store.commit('getToken')
  const token = store.state.user.token
  if(!token&&to.name!='login'){
    next({name:'login'})
  }else if(token && to.name === 'login'){
    next({name:'home'})
  }else{
    next()
  }
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
  created(){
    store.commit('addMenu',router)
  }
}).$mount('#app')
