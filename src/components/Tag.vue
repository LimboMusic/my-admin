<template>
  <div class="tabs">
    <el-tag 
      size="small" 
      v-for="(t,index) in tags" 
      :key='t.name' 
      :closable="t.name !== 'home'"
      :effect="$route.name === t.name ? 'dark' : 'plain'"
      @click="changeMenu(t)"
      @close="handleClose(t,index)"
    >
      {{t.label}}
    </el-tag>
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
  export default {
    name:'Tag',
    data(){
      return{

      }
    },
    computed:{
      ...mapState({
        // tags:state=>state.tab.BrowseHistory
        tags(){
          return this.$store.state.tab.BrowseHistory
        }
      })
    },
    methods:{
      ...mapMutations({
        closeTag:'closeTag'
      }),
      changeMenu(item){
        this.$router.push({
          name:item.name
        })
      },
      handleClose(item,index){
        const len=this.tags.length - 1
        this.closeTag(item)
        if(item.name!==this.$route.name){
          return;
        }
        if(index===len){
          this.$router.push({
            name:this.tags[index-1].name
          })
        } else{
          this.$router.push({
            name:this.tags[index].name
          })
        }
      }
    }
  }
</script>

<style scoped>
.tabs{
  padding: 20px;
  padding-bottom: 10px;
}

.tabs .el-tag{
  margin-right: 15px;
  cursor: pointer;
}
</style>