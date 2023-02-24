<template>
  <diV>
    <el-row class="home" :gutter='20'>
      <el-col :span='8' style="margin-top:20px">
        <el-card shadow='hover'>
          <div class='user'>
            <img :src="userImg" />
            <div class="userInfo">
              <p class="name">{{userInfo[0]}}</p>
              <p class="access">{{userInfo[1]}}</p>
            </div>
          </div>
          <div class="login-info">
            <p>上次登录时间:<span>2022-8-20</span></p>
            <p>上次登录地点:<span>金华</span></p>
          </div>
        </el-card>
        <el-card style="margin-top:20px;height:250px">
            <el-table :data='dataBuy'  >
              <el-table-column v-for='(val,index) in tableLabel' :key='index' :prop='index' :label="val">
              </el-table-column>
            </el-table>
        </el-card>
      </el-col>
      <el-col :span='16' >
        <div class="num">
          <el-card v-for="item in countData" :key='item.name' :body-style="{display:'flex',padding:0}" >
            <i class='icon' :class='`el-icon-${item.icon}`' :style='{background:item.color}'></i>
            <div class="detail">
              <p class="number">
                ￥{{item.value}}
              </p>
              <p class="txt">
                {{item.name}}
              </p>
            </div>
          </el-card>
        </div>
        <el-card style="height:280px;marginTop:50px;width:810px">
          <div style="height:280px" ref='echarts'>

          </div>
        </el-card>
      </el-col>
      
    </el-row>
  </diV>
</template>

<script>

import {getData} from '../../api/data.js'
import * as echarts from 'echarts'
    export default {
        name:'index',
        data(){
            return{
              userImg:require('../../src/assets/user.png'),
              dataBuy:[],
              tableLabel:{
                name:'手机型号',
                todayBuy:'今日购买',
                monthBuy:'本月购买',
                totalBuy:'总共购买'
              },
              countData:[
                {
                  name:'今日支付订单',
                  value:1234,
                  icon:'success',
                  color:'#2ec7c9'
                },
                {
                  name:'今日收藏订单',
                  value:210,
                  icon:'star-on',
                  color:'#ffb980'
                },
                {
                  name:'今日未支付订单',
                  value:210,
                  icon:'star-on',
                  color:'#ffb980'
                },
                {
                  name:'本月支付订单',
                  value:2210,
                  icon:'success',
                  color:'#2ec7c9'
                },
                {
                  name:'本月收藏订单',
                  value:220,
                  icon:'success',
                  color:'#ffb980'
                },
                {
                  name:'本月未支付订单',
                  value:130,
                  icon:'s-goods',
                  color:'#5ab1ef'
                },
              ],
              // userInfo:[]
            }
        },
        computed:{
          userInfo(){
            return this.$store.state.tab.userMsg
          }
        },
        mounted(){
          // this.userInfo=this.$store.commit('getUserMsg')
          console.log(this)
          getData().then(res=>{
            const{code,data} =res.data
            // console.log(res)
            if(code===20000){
               this.dataBuy=data.dataBuy
               const order=data.orderData
               
               const keyArray = Object.keys(order.data[0])
              //  console.log('keyArray',keyArray)
               const series=[]
               keyArray.forEach(key=>{
                series.push({
                  name:key,
                  data:order.data.map(item => item[key]),
                  type:'line'
                })
               })
               const option={
                xAxis:{
                  data:order.date,
                },
                yAxis:{},
                legend:{
                  data:keyArray
                },
                series
               }

              const e =  echarts.init(this.$refs.echarts)
              e.setOption(option)
            }
          })
        }
    }
</script>

<style scoped>
.user{
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.user img{
  border-radius: 50%;
  width: 150px;
  margin-right: 50px;
  
}

.user .name{
  font-size: 30px;
  line-height: 30px;
  margin:0px;
  margin-top: 30px;
}

.user .access{
  font-size: 14px;
  color: #c0c0c0;
}

.login-info{
  border-top: 2px solid grey;
  font-size: 14px;
  
}

.login-info span{
  margin-left: 40px;
}

.dataBuy{
  height: 200px;
}

.num .el-card{
  width:250px;
  margin-top:20px;
  margin-right:20px
}

.num{
  display: flex;
  flex-wrap: wrap;
}

.num .el-card .icon{
  width:50px;
  /* height: 100px; */
  line-height: 100%;
  font-size: 40px;
  text-align: center;
  
  display: flex;
 
  align-items: center;
  justify-content: center;
}

.num .detail .number{
  font-size: 22px;
  margin-bottom: 0px;
}

.num .detail .txt{
  font-size: 14px;
  color: #a0a0a0;
}

.num .detail{
  margin-left: 10px;
}
</style>