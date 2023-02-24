## 一.截图页面

### 1.登录页面

![图片1](.\assets\图片1.png)

### 2.admin超级管理员用户界面

![图片2](.\assets\图片2.png)

### 3.test普通用户界面

![图片3](.\assets\图片3.png)

### 4.用户管理界面

![图片4](.\assets\图片4.png)

### 5.新增用户功能界面

![图片5](.\assets\图片5.png)

### 6.查询功能界面

![图片6](.\assets\图片6.png)

### 7.新增用户功能界面

![图片7](.\assets\图片7.png)



## 二.问题以及解决方法

###     1.样式问题

​            在使用elementUI时，改变引入组件的样式，但是被覆盖了,详情如下:

​			Main组件中引入了el-aside class为'aside' 

```html
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
```

​			el-aside样式如下

<style >
.aside{
    width: auto ;
    border: 0px;
}
</style>

​			网页效果如下:

![图片8](D:\桌面\前端\Vue\暑期实践\作业二\assets\图片8.png)

​			可以明显看到，Aside组件有一段空白，经过检查，可以发现如下问题

![图片9](.\assets\图片9.png)

​			可以看到 element.style 中设置的 width:300px 覆盖了我们自定义的width:auto，可以通过在自己写的样			式中添加!important提升权重来解决,解决代码与界面如下

<style >
.aside{
    width: auto !important; 
    border: 0px;
}

</style>

​			![图片2](.\assets\图片2.png)

### 		2.Axios问题

​				在user组件中进行删除操作时，遇到了问题，代码以及问题如下

<script>
    methods:{
        delUser(row){
            this.$confirm('此操作将永久删除该文件,是否继续？','提示',{
              confirmButtonText:'确认',
              cancelButtonText:'取消',
              type:'warning',
            }).then(()=>{
              const id = row.id
              this.$http.post('user/del',{
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
    }
</script>

<script>
    Mock.mock(/user\/del/,'post',userApi.deleteUser) 
</script>

​				点击删除时，会提示删除成功信息，但是对应用户没有真的删除，经过检查，发现是post请求的问题，				将post请求改成get请求即可解决

### 		3.信息显示问题

​			 在user组件中调用了userForm组件来展示人员信息，在性别那一栏中原始数据用1和0表示男女,并且用户			 信息由user组件中的数据tableLabel传给userForm组件并由它展示信息,代码与错误如下

user组件代码:

<template>
  <diV>
    <Table :tableData="tableData" :tableLabel="tableLabel" :config="config" @changePage='getList()' @edit='editUser' @del='delUser'></Table>
  </diV>
</template>	

<script>
    data(){
        return(){
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
                prop:'sex',
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
        }
    }
</script>





Table组件代码

<template>
  <diV>
     <el-table :data="tableData" height="90%" stripe>
        <el-table-column show-overflow-tooltip v-for="t in tableLabel" :key="t.prop" 							:label='t.label' :width="t.width?t.width:125">
            <template slot-scope="scope">
                <span style="margin-left=10px">{{scope.row[t.prop]}}</span>
            </template>        
    </el-table>
</template>	

运行截图：

![图片10](.\assets\图片10.png)

​				可以看到，性别为1或者0，不符合预期

​				经过检查,发现是user组件传给form组件的数据tableLabel中的 prop：’sex' 出现的问题，将其改成prop:'sexLabel'即可解决





## 三.项目亮点

​		(其实没什么亮点)

1.运用了axios和vuex

2.运用了mock模拟后端的数据

3.使用了elementUI

4.使用了vue-router
