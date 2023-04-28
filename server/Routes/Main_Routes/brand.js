
const connect =require("../../database/connect")
const path = require('path')
let topic = async (req,res)=>{
    let query 
    let count = 0
    if(!req.query.id){
        query  =`select * from public.brand `
    }else{
        query  =`select * from public.brand where id =${req.query.id} `
    }
    if(req.query.s_id !="" && req.query.s_id != undefined){
        if(count ==0){
            query += `where`
        }else{
            query += `and`
        }
        query += ` id = ${req.query.s_id}`
        count++
    }
    if(req.query.s_name !="" && req.query.s_name != undefined){
        if(count ==0){
            query += `where`
        }else{
            query += `and`
        }
        query += ` name like '%${req.query.s_name}%'`
        count++
    }

    query+=` order by id desc`
    let brand = await connect(query)
    if(brand.rowCount>0){
        res.json({brand:brand.rows, quantity:brand.rowCount})
    }else{
        res.json({brand:"don't have any brand",quantity:0})
    }
    
}

module.exports =topic