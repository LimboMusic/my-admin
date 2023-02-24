import Cookie from "js-cookie"


export default{
    state:{
        isCollapse:false,
        BrowseHistory:[
            {
                path:'/home',
                name:'home',
                label:'首页',
                // title:'首页',
                icon:'home'
            }
        ],
        currentMenu:null,
        menu:[],
        userMsg:[]
    },
    mutations:{
        setUserMsg(state,value){
            state.userMsg.push(value.userName)
            if(value.userName==='admin'){
                state.userMsg.push('超级管理员')
            }else{
                state.userMsg.push('普通用户')    
            }
            
        },
        getUserMsg(state){
            return state.userMsg;
        },
        collapseMenu(state){
            state.isCollapse = !state.isCollapse
        },
        changeMenu(state,value){
            if(value.name!=='home'){
                state.currentMenu=value
                const n = state.BrowseHistory.findIndex(item=>item.name===value.name)
                if(n===-1){
                    state.BrowseHistory.push(value)
                    // console.log('value',value)
                }
            }else{
               state.currentMenu = null 
            }
        },
        closeTag(state,value){
            const n = state.BrowseHistory.findIndex(item=>item.name===value.name)
            state.BrowseHistory.splice(n,1)
            
        },
        setMenu(state,value){
            state.menu=value
            Cookie.set('menu',JSON.stringify(value))
        },
        clearMenu(state,value){
            state.menu=[]
            Cookie.remove('menu')
        },
        addMenu(state,router){
            if(!Cookie.get('menu')){return}
            
                const menu =JSON.parse(Cookie.get('menu'))
                state.menu=menu
                const menuArray=[]
                
                menu.forEach(item => {
                    
                    if(item.children){
                        item.children=item.children.map(item=>{
                            item.component=()=>import(`../views/${item.url}`)
                            return item
                        })
                        menuArray.push(...item.children)
                    } else{
                        item.component = ()=> import(`../views/${item.url}`)
                        menuArray.push(item)
                    }
                });
                //动态路由的添加
                console.log('menuArray',menuArray)
                console.log(router)
                menuArray.forEach(item=>{
                    router.addRoute('Main',item)
                })
                
            
        }
    }
}