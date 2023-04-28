
const connect =require("../../database/connect")
const path = require('path')
let topic = async (req,res)=>{
    let query 
    let count = 0
    if(!req.query.id){
        query  =`select * from public.invoice`
    }else{
        query  =`select * from public.invoice where id ='${req.query.id}' `
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
    if(req.query.s_customer !="" && req.query.s_customer != undefined){
        if(count ==0){
            query += `where`
        }else{
            query += `and`
        }
        query += ` name like '%${req.query.s_customer}%'`
        count++
    }
    if(req.query.s_cartid !="" && req.query.s_cartid != undefined){
        if(count ==0){
            query += `where`
        }else{
            query += `and`
        }
        query += ` cart_id = ${req.query.s_cartid}`
        count++
    }
    if(req.query.s_userid !="" && req.query.s_userid != undefined){
        if(count ==0){
            query += `where`
        }else{
            query += `and`
        }
        query += ` userid like '%${req.query.s_userid}%'`
        count++
    }
    if(req.query.s_phonenumber !="" && req.query.s_phonenumber != undefined){
        if(count ==0){
            query += `where`
        }else{
            query += `and`
        }
        query += ` phone_number like '%${req.query.s_phonenumber}%'`
        count++
    }
    if(req.query.s_email !="" && req.query.s_email != undefined){
        if(count ==0){
            query += `where`
        }else{
            query += `and`
        }
        query += ` email like '%${req.query.s_email}%'`
        count++
    }
    if(req.query.s_status !="" && req.query.s_status != undefined){
        if(count ==0){
            query += `where`
        }else{
            query += `and`
        }
        query += ` status = ${req.query.s_status}`
        count++
    }
    query+=' order by id desc'
    let invoice = await connect(query)
    console.log(query)
    if(invoice.rowCount>0){
        res.json({invoice:invoice.rows, quantity:invoice.rowCount})
    }else{
        res.json({invoice:"don't have any invoice",quantity:0})
    }
    
}

module.exports =topic