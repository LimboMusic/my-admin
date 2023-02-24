//mock模拟数据
import Mock from 'mockjs'

let List = []

export default{
    getStatisticalData:()=>{
        //Mock.Random.float 产生100到7000之间的随机数，并且保留小数
        for(let i = 0; i < 4; i++){
            List.push(
                Mock.mock({
                    苹果:Mock.Random.float(100,7000,0,0),
                    vivo:Mock.Random.float(100,7000,0,0),
                    小米:Mock.Random.float(100,7000,0,0),
                    oqqo:Mock.Random.float(100,7000,0,0),
                })
            )
        }
        return{
            code:20000,
            data:{
                //饼图
                videoData:[
                    {
                        name:'小米',
                        value:1451
                    },
                    {
                        name:'苹果',
                        value:6415
                    },
                    {
                        name:'vivo',
                        value:1645
                    }
                ],
                dataBuy:[
                    {
                        name:'oppo',
                        todayBuy:100,
                        monthBuy:300,
                        totalBuy:800,
                      },
                      {
                        name:'vivo',
                        todayBuy:100,
                        monthBuy:300,
                        totalBuy:800,
                      },
                      {
                        name:'apple',
                        todayBuy:100,
                        monthBuy:300,
                        totalBuy:800,
                      },
                      
                ],
                orderData:{
                    data:[{apple:6415,vivo:1645,oppo:1451,mi:3961},
                          {apple:6145,vivo:2045,oppo:900,mi:4561},
                          {apple:6514,vivo:1745,oppo:1431,mi:4061},
                          {apple:4651,vivo:2265,oppo:1591,mi:4000},
                          {apple:6781,vivo:2065,oppo:1951,mi:2591},
                          {apple:6155,vivo:1825,oppo:1051,mi:3091},
                          {apple:4415,vivo:1905,oppo:1351,mi:4000},
                          {apple:5465,vivo:3645,oppo:2051,mi:3761},
                          {apple:5941,vivo:1945,oppo:1751,mi:3700},
                ],
                    date:['20220101','20220201','20220301','20220401','20220501','20220601','20220701']
                }
            }
        }
    }
}