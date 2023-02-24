<template>
  <div>
    <h3>姓名：{{person.name}}</h3>
    <h3>学校名称：{{person.school.name}}</h3>
    <h3>学校地址：{{person.school.add}}</h3>
    <h3>爱好:{{person.hobby}}</h3>
    <button @click="changeMsg">点我</button>
  </div>
</template>

<script>
import{reactive} from 'vue'

export default {
  name: 'App',
  setup(){
    let person = reactive({//返回一个代理对象(proxy的实例对象，简称proxy对象)
      name: '小明',
      school:{name:'xxx',
              add:'mmm'},
      hobby:['吃饭','睡觉']
    })

    function changeMsg(){
      person.name= '小美';
      person.school.name='yyy';
      person.hobby[0]='学习';
      person.hobby[1]='学习'
    }
    return{
      person,
      changeMsg
    }
  }
}
</script>

