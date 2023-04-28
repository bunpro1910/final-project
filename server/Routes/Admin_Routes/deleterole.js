
const connect = require('../../database/connect')
const fs =require('fs')

let addcategory = async(req,res,next)=>{
  if(!req.body.id){
    res.json({isSuccess:false,message:"required Role ID"})
    return
  }
  let user = await connect (`select * from public.account where roleid = ${req.body.id}`)
  
  if(user.rowCount>0){
    let query2 = user.rows.reduce((init,item,i)=>{
      return init+= `delete from public.user where id = '${item.username}'; delete from public.account where username = '${item.username}';delete from public.invoice where userid = '${item.username}';delete from cart where user_id = '${item.username}'; delete from cart_detail where cart_id = (SELECT id FROM public.cart WHERE user_id = '${item.username}') `
    },'')
    let result123 = await connect (query2)
  }
  const query = `delete from public.role where id = ${req.body.id} ;`
  let result = await connect(query)

  if(result.rowCount){
    res.json({isSuccess:true,message:"Delete Successfully"})
    global.io.emit('deleterole',{body:true})

  }else{
    res.json({isSuccess:false,message:"Delete Failed"})
  }

}

module.exports = addcategory
