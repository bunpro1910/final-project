

const connect = require('../../database/connect')
 let addtopic = async(req,res,next)=>{
  let err = ''
  if(!req.body.id) err +='required id \n'
  if(!req.body.name) err +='required name \n'
  if(!req.body.date) err +='required date \n'
  if(!req.body.finaldate) err +='required finaldate \n'
  if(err!=''){
    res.json({isSuccess:false,err:err})
    return
  }
  let date = new Date(req.body.date)
  console.log(date)
  let finaldate = new Date(req.body.finaldate)
  const query = `insert into public.topic (id,name,clousuredate,finalclosuredate) values('${req.body.id}','${req.body.name}','${format_date(date.getMonth()+1)}-${format_date(date.getDate())}-${date.getFullYear()}','${format_date(finaldate.getMonth()+1)}-${format_date(finaldate.getDate())}-${finaldate.getFullYear()}')`
  let topic = await connect(query)
  if(topic.rowCount>0){

    res.json({isSuccess:true})
    global.io.emit('newtopic',{body:true})
  }else{

    res.json({isSuccess:false})

  }
}
function format_date(date){
    if(date<10){
        return `0${date}`
    }else{
        return date
    }
}
module.exports = addtopic
