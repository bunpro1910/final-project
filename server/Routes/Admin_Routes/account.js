
const connect =require("../../database/connect")

let topic = async (req,res)=>{
    let query 
    
    let count = 0
    if(!req.query.id){
        query  =`select r.name as rolename, u.id, a.username,a.password,a.roleid,u.fullname,u.gender,u.old,u.phone_number from public.account as a,public.user as u,public.role as r where u.id = a.username and a.roleid = r.id `
    }else{
        query  =`select * from public.account where id ='${req.query.id}' `
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
        query += ` cart_id like '%${req.query.s_cartid}%'`
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
    let account = await connect(query)
    if(account.rowCount>0){
        res.json({account:account.rows, quantity:account.rowCount})
    }else{
        res.json({account:"don't have any account",quantity:0})
    }
    
}

module.exports =topic