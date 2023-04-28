
const connect =require("../../database/connect")
const path = require('path')
let topic = async (req,res)=>{
    let query 
    let count = 0
    if(!req.query.id){
        query  =`select r.name,r.id ,p.name as permission,p.id as permissionid from public.role as r, public.permission as p where r.permission = p.id `
    }else{
        query  =`select r.name,r.id,p.name as permission,p.id as permissionid from public.role as r, public.permission as p where r.permission = p.id and r.id = ${req.query.id} `
    }

    if(req.query.s_name !="" && req.query.s_name != undefined){

        query += `and r.name like '%${req.query.s_name}%'`
        count++
    }
    if(req.query.s_permission !="" && req.query.s_permission != undefined){

        query += `and p.name like '%${req.query.s_permission}%'`
        count++
    }


    let role = await connect(query)
    if(role.rowCount>0){
        res.json({role:role.rows, quantity:role.rowCount})
    }else{
        res.json({role:"don't have any role",quantity:0})
    }
    
}

module.exports =topic