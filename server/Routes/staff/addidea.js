const { json } = require("body-parser")

const connect = require('../database/connect')
 let addtopic = async(req,res,next)=>{
  let date = new Date(req.body.date)
  console.log(date)
  let finaldate = new Date(req.body.finaldate)
  const query = `insert into public.category (id,name) values('${req.body.id}','${req.body.name}')`
  let topic = await connect(query)
  if(topic !='err'){
    res.json({isSuccess:true})
  }else{
    res.json({isSuccess:false})
  }
}

module.exports = addtopic
