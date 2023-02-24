import axios from './axios.js'

export const getMenu = (params)=>{
    return axios.request({
        url:'/permission/getMenu',
        method:'post',
        data:params
    })
}

export const getData = ()=>{
    return axios.request({
        url:'/home/getData',
    })
}

export const getUser=(params)=>{
    return axios.request({
        url:'/user/getUser',
        method:'get',
        params,
    })
}

// export const getMenu=(params)=>{
//     return axios.request({
//         url:'/permission/getMenu',
//         method:'post',
//         data:params,
//     })
// }