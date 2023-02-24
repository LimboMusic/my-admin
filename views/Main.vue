<template>
  <diV>
    <el-container style="hieght:100%">
        <el-aside  class="aside">
            <Aside></Aside>
        </el-aside>
        <el-container>
            <el-header class="header"><Header></Header></el-header>
            <Tag></Tag>
            <el-main class="main"><router-view></router-view></el-main>
        </el-container>
    </el-container>
  </diV>
</template>

<script>
import Aside from '../src/components/Aside.vue'
import Header from '../src/components/Header.vue'
import Tag from '../src/components/Tag.vue'
    export default {
        name:'Main',
        components:{Aside,Header,Tag},
        data(){
            return{

            }
        },
        
    }
</script>

<style >
.aside{
    /* 问题3：没有加!important时样式不对 */
    width: auto !important;
    border: 0px;
}
.header{
    background-color: #333;
}
.main{
    padding-top:0;
}
</style>