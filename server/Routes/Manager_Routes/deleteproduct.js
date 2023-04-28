const connect = require('../../database/connect')
const fs =require('fs')

let addcategory = async(req,res,next)=>{
  if(!req.body.id){
    res.json({isSuccess:false,message:"required Category ID"})
    return
  }
  let query = `delete from public.product where id = '${req.body.id}';`
  let query1 = `delete from public.cart_detail where product_id = '${req.body.id}';`
  "//veriti"
  let result = await connect(query)
  let result1 = await connect(query)
  if(result.rowCount>0){
    res.json({isSuccess:true,message:"Delete Successfully"})
    global.io.emit('deletepro',{body:true})
  }else{
    res.json({isSuccess:false,message:"Delete Failed"})
  }

}

module.exports = addcategory
