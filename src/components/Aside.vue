<template>
    <el-menu 
        default-active="1-4-1" 
        class="el-menu-vertical-demo" 
        @open="handleOpen" 
        @close="handleClose" 
        :collapse="isCollapse" 
        background-color='#545c64' 
        text-color='#fff' 
        active-text-color='#ffd04b'
        >

            <h3 class="title" v-show="!isCollapse">XXX管理系统</h3>
            <h3 class="title" v-show="isCollapse">后台</h3>
            <el-menu-item  v-for="n in noChildern" :key="n.path" @click="clickMenu(n)" :index="n.path + ' '">
                <i :class="'el-icon-'+n.icon"></i>
                <span slot="title">{{n.label}}</span>
            </el-menu-item>
            <el-submenu  v-for="h in hasChildren" :key='h.path' :index="h.path + ' '">
                <template slot="title">
                    <i :class="'el-icon-' + h.icon"></i>
                    <span slot="title">{{h.label}}</span>
                </template>
                <el-menu-item-group v-for="c in h.children" :key="c.path">
                    <el-menu-item @click="clickMenu(c)" :index="c.path">{{c.label}}</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
    </el-menu>
</template>


<script>
  export default {
    data() {
      return {   
        // menu:[
        //     {
        //         path:'/',
        //         name:'home',
        //         label:'首页',
        //         icon:'s-home',
        //         url:'Home/Home'
        //     },
        //     {
        //         path:'/mall',
        //         name:'mall',
        //         label:'商品管理',
        //         icon:'video-play',
        //         url:'MallManage/MallManage'
        //     },
        //     {
        //         path:'/user',
        //         name:'user',
        //         label:'用户管理',
        //         icon:'user',
        //         url:'UserManage/UserManage'
        //     },
        //     {
        //         label:'其他',
        //         icon:'location',
        //         children:[
        //             {
        //                 path:'/page1',
        //                 name:'page1',
        //                 label:'页面1',
        //                 icon:'setting',
        //                 url:'Other/PageOne',
        //             },
        //             {
        //                 path:'/page2',
        //                 name:'page2',
        //                 label:'页面2',
        //                 icon:'setting',
        //                 url:'Other/PageTwo'
        //             }
        //         ]
        //     }
        // ]
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      clickMenu(item){
        this.$router.push({
            name:item.name
        })
        this.$store.commit('changeMenu',item)
      }
    },
    computed:{
        // noChildern(){
        //     return this.menu.filter((item)=>{
        //         return !item.children
        //     })
        // },
        // hasChildren(){
        //     return this.menu.filter((item)=>{
        //         return item.children
        //     })
        // },
        noChildern(){
            return this.asyncMenu.filter((item)=>{
                return !item.children
            })
        },
        hasChildren(){
            return this.asyncMenu.filter((item)=>{
                return item.children
            })
        },
        isCollapse(){
          return this.$store.state.tab.isCollapse
        },
        asyncMenu(){
          return this.$store.state.tab.menu
        }
    }
  }
</script>

<style scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 100vh;
    border: 0px;
  }
  .title{
    height: 100%;
    border: none;
    color: black;
    text-align: center; 
    line-height: 48px;
    color: #fff;
    
  }
</style>