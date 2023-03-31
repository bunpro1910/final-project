

const connect = require('../../database/connect')
 let addtopic = async(req,res,next)=>{
    let fullname = req.body.user.fullname
    let gender = req.body.user.gender
    let phone_number = req.body.user.phone_number
    let old = req.body.user.old
    if(!fullname){
        res.json({isSuccess: false,message:"need full name"})
        return
    }
    if(!gender){
        res.json({isSuccess: false,message:"need gender"})
        return
    }
    if(!phone_number){
        res.json({isSuccess: false,message:"need phone number"})
        return
    }
    if(!old){
        res.json({isSuccess: false,message:"need old"})
        return
    }
  let query = `update public.user set fullname = '${fullname}',gender = ${gender},phone_number ='${phone_number}',old = ${old} where account_id = '${req.body.user.account_id}'`
  let result = await connect(query)
    if(result.rowCount>0){
        req.session.user = req.body.user
        res.json({isSuccess: true,message:"update sucessfully"})
    }else{
        res.json({isSuccess: false,message:"update failed"})
    }
    

}

module.exports = addtopic
