const { json } = require("body-parser")

const connect = require('../../database/connect')
 let addbrand = async(req,res,next)=>{
  let err=''
  if(!req.body.brand.name){
    err+= 'you need input brand Name '
  }
  if(err!=''){
    res.json({isSuccess:false,message:err})
    return
  }

  let query = `insert into public.brand (name) values('${req.body.brand.name}');`
  if(req.body.isupdatedid){
     query = `delete from public.brand where id = '${req.body.oldid}';` + query
  }
  else if(req.body.isupdated){
    query = `update public.brand set name = '${req.body.brand.name}' where id='${req.body.brand.id}'`
  }

  let brand = await connect(query)
  if(brand.rowCount>0){
    let message = "Add new brand Sucessfully"
    if(req.body.isupdated){
      message = "Update brand Sucessfully"
    }
    res.json({isSuccess:true,message:message})
  }else{
    let message = "brand ID not same"
    if(req.body.isupdated){
      message = "Update brand Failed"
    }
    if(brand[0]||brand[1]){
      if (brand[0].rowCount>0){
        message = `update sucessfully`
        res.json({isSuccess:true,message:message})
        return
      } 
    }

    res.json({isSuccess:false,message:message})
  }
}

module.exports = addbrand
