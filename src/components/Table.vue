<template>
  <div class="wrapper">
    <el-table :data="tableData" height="90%" stripe>
        <el-table-column show-overflow-tooltip v-for="t in tableLabel" :key="t.prop" :label='t.label' :width="t.width?t.width:125">
            <template slot-scope="scope">
                <span style="margin-left=10px">{{scope.row[t.prop]}}</span>
            </template>        
        </el-table-column>
        <el-table-column label="操作" min-width="180">
            <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination class="pager" layout="prev,pager,next" :total="config.total" :current-page.sync="config.page" @current-change="changePage" :page-size="20">

    </el-pagination>
  </div>
</template>

<script>
    export default {
        name:'Table',
        data(){
            return{

            }
        },
        props:{
            tableData:Array,
            tableLabel:Array,
            config:Object,
        },
        methods:{
            handleEdit(row){
                this.$emit('edit',row)
            },
            handleDelete(row){
                this.$emit('del',row)
            },
            changePage(page){
                this.$emit('changePage',page)
            },
        }
    }
</script>

<style scoped>
.wrapper{
    /* height: calc(100%-62px); */
    height: 520px;
    background-color: #fff;
    position: relative;
}

.wrapper .pager{
    position: absolute;
    bottom: 0;
    right: 20px;
}
</style>