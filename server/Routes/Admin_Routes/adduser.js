
const connect =require("../../database/connect")
const path = require('path')
const bcrypt = require("bcrypt")
let handlelogin = async (req,res)=>{
    let query =`select * from public.account where lower (username) = lower('${req.body.form.gmail}')`
    const gmail = req.body.form.gmail
    const id = req.body.form.id
    const gender = req.body.form.gender
    const old = req.body.form.old
    const fullname = req.body.form.fullname
    const phone_number = req.body.form.phonenumber

    let hash = await bcrypt.genSalt(10)
    let password = await bcrypt.hash(req.body.form.password,hash)
    let account = await connect(query)
    if(account.rowCount >0 && !req.body.isupdate){
        res.json({isSucess:false,message:"Gmail exits"})
    }else{
        let queryinsert = `insert into public.user (id,fullname,phone_number,gmail,old,account_id,gender) values('${gmail}','${fullname}','${phone_number}','${gmail}',${old},'${gmail}',${gender});
        insert into public.account(username,password,roleid) values('${gmail}','${password}',${req.body.form.role}) `
        if(req.body.isupdate){
            queryinsert = `update public.user set fullname = '${fullname}', phone_number = '${phone_number}', old = ${old}, gender = ${gender} where id = '${id}'; `
        }
        if(req.body.updaterole){
            queryinsert += `update public.account set roleid = ${req.body.form.role}`
        }
        if(req.body.updatepass){
            let hash = await bcrypt.genSalt(10)
            let password = await bcrypt.hash(req.body.form.password,hash)
            queryinsert += `, password = '${password}'`
        }
        if(req.body.updaterole ||req.body.updatepass){
            queryinsert += ` where username = '${id}'`
        }
        let result =await connect(queryinsert)
        
        if(result[0]){
            if(result[1]){
                if(result[0].rowCount>0&&result[1].rowCount>0){
                    res.json({isSucess:true,message:`Add user successfully`})
                    
                }else{
                    res.json({isSucess:false,message:"Error"})
                }
            }
        }

    }
    
    
    
  


  
}

module.exports =handlelogin