

const connect = require('../../database/connect')
const bcrypt =require('bcrypt')

 let addtopic = async(req,res,next)=>{
    let err  = ''
 
    if(!req.body.form.password){
        err += 'required old password '
    }
    if(!req.body.form.newpass){
        err += 'required new password '
    }
    if(!req.body.form.renewpass){
        err+= 'need confirm password ' 
    }
    if(req.body.form.newpass !=req.body.form.renewpass){
        err+='password not match '
    }
    if(err!=''){
        res.json({isSuccess:false,message:err})
        return
    }
    let query =`select * from public.account where lower(username) = '${req.session.user.account_id}'`
    let result = await  connect(query)
    if(result.rowCount>0){
        let issame = await bcrypt.compare(req.body.form.password,result.rows[0].password)
        if(issame){
            let hash = await bcrypt.genSalt(10)
            let password = await bcrypt.hash(req.body.form.newpass,hash)
            let query1 = `update public.account set password ='${password}' where lower(username) = '${req.session.user.account_id}'`
            let result1 = await connect(query1)
            if(result1.rowCount>0){
                res.json({isSuccess:true,message:"your pass is changed"})
                return
            }else{
                res.json({isSuccess:false,message:"error"})
                return
            }
            
        }else{
            res.json({isSuccess:false,message:"old password not match"})
            return
        }
    }else{  
        res.json({isSuccess:false,message:"not found user"})
        return
    }
  
   
 
    

}

module.exports = addtopic
