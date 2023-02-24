<template>
  <div>
    <h3>姓名：{{name}}</h3>
    <h3>学校名称：{{school.name}}</h3>
    <h3>学校地址：{{school.add}}</h3>
    <button @click="changeMsg">点我</button>
  </div>
</template>

<script>
import{ref} from 'vue'

export default {
  name: 'App',
  setup(){
    let name= ref('小明')
    let school=ref({name:'xxx',add:'mmm'})
    function changeMsg(){
      name.value= '小王';
      school.value.name='yyy'
    }
    return{
      name,
      school,
      changeMsg
    }
  }
}
</script>

