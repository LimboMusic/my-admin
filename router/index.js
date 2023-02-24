import VueRouter from "vue-router";
import Vue from "vue";
// import Home from '../views/Home'


Vue.use(VueRouter)

export default new VueRouter({
    mode:'history',
    routes:[
        {
            path:'/',
            name:'Main',
            redirect:'/home',
            // component:Home,
            component:()=> import('../views/Main'),//按需引入
            children:[
                // {
                //     path:'/home',
                //     name:'home',
                //     component:()=>import('../views/home/index.vue')
                // },
                // {
                //     path:'/user',
                //     name:'user',
                //     // component:Home,
                //     component:()=> import('../views/User')//按需引入
                // },
                // {
                //     path:'/mall',
                //     name:'mall',
                //     component:()=> import('../views/mall')
                // },
                // {
                //     path:'/page1',
                //     name:'page1',
                //     component:()=> import('../views/others/page1.vue')
                // },
                // {
                //     path:'/page2',
                //     name:'page2',
                //     component:()=> import('../views/others/page2.vue')
                // },
            ]
        },
        {
            path:'/login',
            name:'login',
            component:()=>import('../views/Login/Login.vue')
        }
    ]
})