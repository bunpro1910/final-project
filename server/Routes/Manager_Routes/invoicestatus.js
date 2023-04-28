
const connect = require('../../database/connect')
const fs =require('fs')

let addcategory = async(req,res,next)=>{
  if(!req.body.id){
    res.json({isSuccess:false,message:"required Invoice ID"})
    return
  }
  if(!req.body.status){
    res.json({isSuccess:false,message:"required Status ID"})
    return
  }

  let query =`update public.invoice set status = ${req.body.status}  where id = ${req.body.id}`
  let result = await connect(query)

  if(result.rowCount){
    res.json({isSuccess:true,message:"Update Successfully"})
    global.io.emit('updatestatus',{body:true})

  }else{
    res.json({isSuccess:false,message:"Update Failed"})
  }

}

module.exports = addcategory
