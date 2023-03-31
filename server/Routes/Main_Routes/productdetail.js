
const connect =require('../../database/connect')
const path = require('path')
const { fail } = require('assert')

let topic = async (req,res)=>{
    let query 
    if(!req.query.id){
        res.json({err:"need id"})
        return
    }else{
        query  =`select p.id,p.name,p.price,p.quantity,p.image,p.description,c.name as category_name from public.product as p ,public.category as c where p.cateid = c.id and p.id='${req.query.id}'`
    }
    let prodetail = await connect(query)
 
    if(prodetail.rowCount>0){
        res.json({product:prodetail.rows,isSuccess:true})
    }else{
        res.json({isSuccess:false,message:"don't have any product id"})
    }
    
}

module.exports =topic