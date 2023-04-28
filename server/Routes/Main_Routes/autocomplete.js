
const connect =require('../../database/connect')
const path = require('path')

let topic = async (req,res)=>{

    let query =`select * from public.product`
    let result = await connect(query)
    let arr = []
    arr = result.rows.reduce((init,item,i)=>{
        init.push({...item,type:"product"})
        return init
    },arr)
    let query1 =`select * from public.category`
    let result1 = await connect(query1)
    arr = result1.rows.reduce((init,item,i)=>{
        init.push({...item,type:"category"})
        return init
    },arr)
    let query2 =`select * from public.brand`
    let result2 = await connect(query2)
    arr = result2.rows.reduce((init,item,i)=>{
        init.push({...item,type:"brand"})
        return init
    },arr)
    res.json({data:arr,quantity : arr.length})
}



module.exports =topic