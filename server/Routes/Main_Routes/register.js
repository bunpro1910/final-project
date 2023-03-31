
const connect =require("../../database/connect")
const path = require('path')
const bcrypt = require("bcrypt")
let handlelogin = async (req,res)=>{
    let query =`select * from public.account where lower (username) = lower('${req.body.form.gmail}')`

    if(req.body.form.password!=req.body.form.repassword){
        res.json({isSucess:false,message:"Repassword much same"})
        return
    }
    let hash = await bcrypt.genSalt(10)
    let password = await bcrypt.hash(req.body.form.password,hash)
    let account = await connect(query)
    if(account.rowCount >0){
        res.json({isSucess:false,message:"Gmail exits"})
    }else{
        let queryinsert = `insert into public.user (id,fullname,phone_number,gmail,old,account_id,gender) values('${req.body.form.gmail}','${req.body.form.fullname}','${req.body.form.phonenumber}','${req.body.form.gmail}',${req.body.form.old},'${req.body.form.gmail}',${req.body.form.gender});
        insert into public.account(username,password,roleid) values('${req.body.form.gmail}','${password}',1) `
        let result =await connect(queryinsert)
        console.log(result)
        if(result[0]){
            if(result[1]){
                if(result[0].rowCount>0&&result[1].rowCount>0){
                    res.json({isSucess:true,message:`Register Succesfully username: ${req.body.form.gmail} please login again`})
                    
                }else{
                    res.json({isSucess:false,message:"Error"})
                }
            }
        }

    }
    
    
    
  


  
}

module.exports =handlelogin