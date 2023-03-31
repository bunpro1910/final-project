
const connect =require("../../database/connect")
const path = require('path')
const bcrypt = require('bcrypt')
let handlelogin = async (req,res)=>{
    let query =`select * from public.account where lower (username) = lower('${req.body.username}')`

    
    let account = await connect(query)
    if(account.rowCount >0){
            let result = await bcrypt.compare(req.body.password,account.rows[0].password)
            if(!result){
                res.json({isSucess:false,message:"User ID or password not match"})
                return
            }
            let query1 = `select u.account_id,u.fullname,a.password,u.gender,u.gmail,u.id,u.old,u.phone_number,a.roleid from public.user as u,public.account as a where u.account_id = '${req.body.username}' and u.account_id = a.username`
            let user = await connect(query1)        
            req.session = {user: user.rows[0]}
            console.log(req.session)
            res.json({isSuccess:true,message:"Login Successfully"})
            global.io.emit('authentication',{body:true})    
        return
    }else{
        res.json({isSuccess:false,message:"User ID not match"})
    }
    
    
    
  


  
}

module.exports =handlelogin