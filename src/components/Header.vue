<template>
  <div class="wrapper">
    <div class="left-content">
        <el-button plain icon='el-icon-menu' size='mini' @click="changeCollapse"></el-button>
        <!-- <h3 style="color:#fff">首页</h3> -->
        <el-breadcrumb separator="/" class="myColor">
          <el-breadcrumb-item 
            v-for="t in tags" 
            :key='t.path' 
            :to='{path:t.path}'>
              {{t.label}}
          </el-breadcrumb-item>
          <!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
          <el-breadcrumb-item>活动列表</el-breadcrumb-item>
          <el-breadcrumb-item>活动详情</el-breadcrumb-item> -->
        </el-breadcrumb>
    </div>
    <div class="right-content">
      <el-dropdown trigger="click" szie="mini">
        <span>
          <img :src="userImg" class="userImg">
        </span>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item >个人中心</el-dropdown-item>
            <el-dropdown-item @click.native="logOut">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name:'Header',
  data(){
    return{
      userImg:require('../assets/user.png')
    }
  },
  methods:{
    changeCollapse(){
      this.$store.commit('collapseMenu')
    },
    logOut(){
      this.$store.commit('clearToken')
      this.$store.commit('clearMenu')
      this.$router.push("/login")
    }
  },
  computed:{
    ...mapState({
      tags(){
        return this.$store.state.tab.BrowseHistory
      }
    })
  },
  mounted(){
    // console.log('Header',this)
  }
}
</script>

<style scoped>
.wrapper{
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
}

.left-content{
  display: flex;
  align-items: center;
}

.left-content .el-button{
  margin-right: 20px;
  height: 40px;
}

.right-content .userImg{
  width:40px;
  height: 40px;
  border-radius: 50%;
}

.myColor /deep/ .el-breadcrumb__inner {
    color:white;
}
</style>