
const connect = require('../../database/connect')
const fs =require('fs')

let addcategory = async(req,res,next)=>{
  if(!req.body.id){
    res.json({isSuccess:false,message:"required Invoice ID"})
    return
  }

  let query = `delete from public.invoice where id = '${req.body.id}';`
 
  let result = await connect(query)

  if(result.rowCount>0){
    res.json({isSuccess:true,message:"Delete Successfully"})
    global.io.emit('deleteinvoice',{body:true})

  }else{
    res.json({isSuccess:false,message:"Delete Failed"})
  }

}

module.exports = addcategory
