
const connect =require("../../database/connect")
const path = require('path')
let category = async (req,res)=>{
    let query 
    let count = 0
    if(!req.query.id){
        query  =`select * from public.category `
    }else{
        query  =`select * from public.category where id ='${req.query.id}' `
    }
    if(req.query.s_id !="" && req.query.s_id != undefined){
        if(count ==0){
            query += `where`
        }else{
            query += `and`
        }
        query += ` id like '%${req.query.s_id}%'`
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

    console.log(query)
    let category = await connect(query)
    if(category.rowCount>0){
        res.json({category:category.rows, quantity:category.rowCount})
    }else{
        res.json({category:"don't have any category",quantity:0})
    }
    
}

module.exports =category