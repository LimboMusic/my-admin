
import Mock from 'mockjs'

function param20bj(url){
    const search = url.split('?')[1]
    if(!search){
        return{}
    }
    return JSON.parse(
        '{"' +
        decodeURIComponent(search)
            .replace(/"/g,'\\"')
            .replace(/&/g,'","')
            .replace(/=/g,'":"')
        + '"}'
    )
}

let list = []
const count = 200

for(let i = 0; i < count; i++){
    list.push(
        Mock.mock({
            id:Mock.Random.guid(),
            name:Mock.Random.cname(),
            addr:Mock.mock('@county(true)'),
            // addr:Mock.Random.province(),
            // addr:Mock.Random.city(true),
            'age|18-60':1,
            birth:Mock.Random.date(),
            sex:Mock.Random.integer(0,1)
        })
    )
}

export default{
    /**
     *  获取列表
     *  要带参数 name,page,limit;name可以不填，page，limit有默认值
     *  @param name,page,limit
     *  @return {{code:number, count:number, data:*[]}}
     */
    getUserList:config=>{
        const{name,page=1,limit=20} = param20bj(config.url)
        console.log('name:' + name, 'page:' + page, '分页大小limit:' + limit)
        const mockList = list.filter(user=>{
            if(name && user.name.indexOf(name)===-1 && user.addr.indexOf(name) === -1) return false
            return true
        })
        const pageList=mockList.filter((item,index) => index < limit * page && index >= limit * (page - 1))
        return{
            code:20000,
            count:mockList.length,
            list:pageList
        }
    },
    /**
     *  增加用户
     *  @param name,addr,age,birth,sex
     *  @return {{code:number,data:{message:string}}}
     */
    createUser:config=>{
        const{name,addr,age,birth,sex} = JSON.parse(config.body)
        console.log(JSON.parse(config.body))
        list.unshift({
            id:Mock.Random.guid(),
            name:name,
            addr:addr,
            age:age,
            birth:birth,
            sex:sex
        })
        return{
            code:20000,
            data:{
                message:'添加成功'
            }
        }
    },

    
    /**
     * 删除用户
     * @param id
     * @return {*}
     */
    deleteUser:config=>{
        const {id} = param20bj(config.url)
        if(!id){
            return {
                code:-999,
                message:'参数不正确'
            }
        } else{
            list=list.filter(u=>u.id!==id)
            return{
                code:20000,
                message:'删除成功'
            }
        }
    },

    /**
     * 批量删除
     * @param  config 
     * @return {{code:number,data:{message:string}}} 
     */
    batchremove:config=>{
        let{ids}=param20bj(config.url)
        ids=ids.split(',')
        list=list.filter(u=>!ids.includes(u.id))
        return {
            code:20000,
            data:{
                message:'批量删除成功'
            }
        }
    },

    /**
     * 修改用户
     * @param id,name,addr,age,birth,sex
     * @return {{code:number,data:{message:string}}}
     */

    updateUser: config =>{
        const{id,name,addr,age,birth,sex} = JSON.parse(config.body)
        const sex_num= parseInt(sex)
        list.some(u=>{
            if(u.id===id){
                u.name=name,
                u.addr=addr,
                u.age=age,
                u.birth=birth,
                u.sex=sex_num
                return true
            }
        })
        return {
            code:20000,
            data:{
                message:'编辑成功'
            }
        }
    }
}