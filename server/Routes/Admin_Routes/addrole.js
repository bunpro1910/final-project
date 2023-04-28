const { json } = require("body-parser")

const connect = require('../../database/connect')
 let addcategory = async(req,res,next)=>{
  let err=''
  if(!req.body.role.name){
    err+= 'you need input Role name '
  }
  if(!req.body.role.permission){
    err+= 'you need input Permission '
  }
  if(err!=''){
    res.json({isSuccess:false,message:err})
    return
  }
  console.log(req.body)
  
  let query = `insert into public.role (name,permission) values('${req.body.role.name}',${req.body.role.permission});`
  if(req.body.isupdated){
    query = `update public.role set name = '${req.body.role.name}',permission = ${req.body.role.permission} where id= ${req.body.role.id}`
  }
  let category = await connect(query)
  if(category.rowCount>0){
    let message = "Add new Role Sucessfully"
    if(req.body.isupdated){
      message = "Update Role Sucessfully"
    }
    res.json({isSuccess:true,message:message})
  }else{
    let message = "Add new Role Failed"
    if(req.body.isupdated){
      message = "Update Role Failed"
    }
    res.json({isSuccess:false,message:message})
 }

   
  
}

module.exports = addcategory
