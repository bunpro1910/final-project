
const connect = require('../../database/connect')
const fs =require('fs')

let addcategory = async(req,res,next)=>{
  if(!req.body.id){
    res.json({isSuccess:false,message:"required Category ID"})
    return
  }
  let query = `delete from public.product where cateid = '${req.body.id}';`
  query += `delete from public.category where id = '${req.body.id}';`
  let result = await connect(query)

  if(result[1].rowCount){
    res.json({isSuccess:true,message:"Delete Successfully"})
    global.io.emit('deletecate',{body:true})

  }else{
    res.json({isSuccess:false,message:"Delete Failed"})
  }

}

module.exports = addcategory
