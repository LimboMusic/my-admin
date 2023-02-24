<template>
  <diV class="manage">
    <!-- <h1>User页面</h1> -->
    <el-dialog :title="operateType==='add' ? '新增用户' : '更新用户'" :visible.sync="isShow">
      <UserForm :formLabel="operateFormLabel" :form="operateForm" :inline="true" ref="form"></UserForm>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow=false">取消</el-button>
        <el-button @click="confirm" type="primary">确定</el-button>
      </div>
    </el-dialog>
    <div class="manage-header">
      <el-button type="primary" @click="addUser">+ 新增</el-button>
      <UserForm :formLabel="formLabel" :form="searchForm" :inline="true" ref="form">
        <el-button type="primary" @click="getList(searchForm.keyword)">搜索</el-button>
      </UserForm>
    </div>
    
    <Table :tableData="tableData" :tableLabel="tableLabel" :config="config" @changePage='getList()' @edit='editUser' @del='delUser'></Table>
  </diV>
</template>

<script>
import UserForm from '../../src/components/UserForm.vue'
import Table from '../../src/components/Table.vue'
import {getUser} from '../../api/data.js'
import {Message} from 'element-ui'
    export default {
        name:'User',
        components:{UserForm,Table},
        data(){
          return{
            operateType:'add',
            isShow:false,
            operateFormLabel:[
              {model:'name',
                label:'姓名',
                type:'input'
              },
              {model:'age',
                label:'年龄',
                type:'input'
              },
              {model:'sex',
                label:'性别',
                type:'select',
                opts:[
                {
                  label:'男',
                  value:1,
                },
                {
                  label:'女',
                  value:0,
                }
                ]
              },
              { model:'birth',
                label:'出生日期',
                type:'date',
              },
              { model:'addr',
                label:'地址',
                type:'input'
              }
            ],
            operateForm:{
              name:'',
              addr:'',
              age:'',
              birth:'',
              sex:'',
            },
            formLabel:[
              {
                model:'keyword',
                label:'姓名',
                type:'input',
              }
            ],
            searchForm:{
              keyword:''
            },
            tableData:[],
            tableLabel:[
              {
                prop:'name',
                label:'姓名',
              },
              {
                prop:'age',
                label:'年龄',
              },
              {
                // prop:'sex',问题1的原因
                prop:'sexLabel',
                // prop:'sex',
                label:'性别',
              },
              {
                prop:'birth',
                label:'出生日期',
                width:200
              },
              {
                prop:'addr',
                label:'地址',
                width:320
              },
            ],
            config:{
              page:1,
              total:30
            }
          }
        },
        methods:{
          confirm(){
            if(this.operateType === 'edit'){
              this.$http.post('/user/edit',this.operateForm).then(res=>{
                this.isShow=false;
                this.getList();
                console.log('edit',res)
              })
            }else{
              this.$http.post('/user/add',this.operateForm).then(res=>{
                this.isShow = false
                this.getList()
                console.log(res)
              })
            }
          },
          addUser(){
            this.isShow=true;
            this.operateType='add';
            this.operateForm={
              name:'',
              addr:'',
              age:'',
              birth:'',
              sex:'',
            }
          },
          getList(name=''){
            this.config.loading=true
            name?(this.config.page=1):''
            getUser({page:this.config.page,
                     name
            }).then(({data:res}) =>{
              console.log('res',res)
              this.tableData=res.list.map(item =>{
                // console.log('item.sex',item.sex)
                item.sexLabel=item.sex ===0?'女':'男'//问题1：只能显示0和1不能显示男女
                // console.log('item.sexLabel',item.sexLabel)
                return item
              })
              // console.log('tableData',this.tableData)
              this.config.total=res.count
              this.config.loading=false
            })
          },
          editUser(row){
            this.operateType = 'edit'
            this.isShow=true
            this.operateForm=row
          },
          delUser(row){
            this.$confirm('此操作将永久删除该文件,是否继续？','提示',{
              confirmButtonText:'确认',
              cancelButtonText:'取消',
              type:'warning',
            }).then(()=>{
              const id = row.id
              //this.$http.get('user/del',{//问题2：点击删除并且确定，有成功删除提示但是没有删除成功 在mock.js中有原因
              this.$http.get('user/del',{
                params:{id}
              }).then(res=>{
                this.$message({
                  type:'success',
                  message:'删除成功'
                })
                this.getList()
              })
            })
          }
        },
        mounted(){
          this.getList()
          this.$message=Message
        }
    }
</script>

<style scoped>
.manage-header{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>