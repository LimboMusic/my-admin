<template>
  <div>
    <el-form :model="form" status-icon :rules="rules" ref="form" label-width="100px" class="login-container">
        <h3 class="login_title">系统登录</h3>
        <el-form-item label="用户名" label-width="80px" prop='userName' class="userName">
            <el-input type="input" v-model="form.userName" auto-complete="off" placeholder="请输入用户名">
            </el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="80px" prop="password" class="password">
            <el-input type="password" v-model="form.password" placeholder="请输入密码" auto-complete="off">
            </el-input>
        </el-form-item>
        <el-form-item class="loginSubmit">
            <el-button type="primary" @click='login' class="loginSubmit">登录</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Mock from 'mockjs'
import {getMenu} from '../../api/data.js'
import {Message} from 'element-ui'
    export default {
        name:'login',
        data(){
            return{
                form:{

                },
                rules:{
                    userName:[
                        {required:true,message:'请输入用户名',trigger:'blur'},
                        {min:4,message:'用户名长度不能小于4位',trigger:'blur'}
                    ],
                    password:[
                        {
                            required:true,message:'请输入密码',trigger:'blur'
                        }
                    ]
                }
            }
        },
        methods:{
            login(){
                getMenu(this.form).then(({data:res})=>{
                    console.log('res',res)
                    if(res.code===20000){    
                        console.log('res',res)                    
                        console.log(this.$router)
                        this.$store.commit('clearMenu')
                        this.$store.commit('setMenu',res.data.menu)                        
                        this.$store.commit('setToken',res.data.token)                        
                        this.$store.commit('addMenu',this.$router)
                        this.$store.commit('setUserMsg',this.form)                     
                        this.$router.push({name:'home'})

                    }else{
                        this.$message.warning(res.data.message)
                    }
                })
                // const token = Mock.Random.guid()
                // this.$store.commit('setToken',token)
                // this.$router.push({name:'home'})
            }
        },
        mounted(){
          this.$message=Message
        }
    }
</script>

<style scoped>
.login-container{
    border-radius: 10px;
    background-clip: padding-box;
    margin:180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background-color:#fff;
    border:1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
}

.login_title{
    margin: 0 auto 40px auto;
    text-align: center;
    color: #505458;

}

.loginSubmit{
    margin:10px auto 0px auto;

}
</style>