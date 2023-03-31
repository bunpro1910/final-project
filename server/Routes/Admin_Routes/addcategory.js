const { json } = require("body-parser")

const connect = require('../../database/connect')
 let addcategory = async(req,res,next)=>{
  let err=''
  if(!req.body.category.id){
    err+= 'you need input category ID '
  }
  if(!req.body.category.name){
    err+= 'you need input category Name '
  }
  if(err!=''){
    res.json({isSuccess:false,message:err})
    return
  }
  console.log(req.body)
  
  let query = `insert into public.category (id,name) values('${req.body.category.id}','${req.body.category.name}');`
  if(req.body.isupdatedid){
     query = `delete from public.category where id = '${req.body.oldid}';` + query
  }
  else if(req.body.isupdated){
    query = `update public.category set name = '${req.body.category.name}' where id='${req.body.category.id}'`
  }

  let category = await connect(query)
  if(category.rowCount>0){
    let message = "Add new Category Sucessfully"
    if(req.body.isupdated){
      message = "Update Category Sucessfully"
    }
    res.json({isSuccess:true,message:message})
  }else{
    let message = "Categorty ID not same"
    if(req.body.isupdated){
      message = "Update Category Failed"
    }
    if(category[0]||category[1]){
      if (category[0].rowCount>0){
        message = `update sucessfully`
        res.json({isSuccess:true,message:message})
        return
      } 
    }

    res.json({isSuccess:false,message:message})
  }
}

module.exports = addcategory
