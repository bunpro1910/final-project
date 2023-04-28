

const connect = require('../../database/connect')
 let addtopic = async(req,res,next)=>{

    let query = `select * from public.invoice`
    let result = await connect(query)

    let totalsuccess = 0
    let totalwaiting =0
    let totalerr = 0
    result.rows.map((item,i)=>{
      if(new Date(item.date).getMonth()==req.query.month){
        if(item.status ==1){
            totalwaiting++;
            
        }else if(item.status == 2){
            totalsuccess++
        }else{
            totalerr ++
        }
      }
    })
    console.log(totalsuccess,totalwaiting)
    arr = {month :req.query.month,totalsuccess:totalsuccess,totalwaiting:totalwaiting,totalerr:totalerr}

    res.json({data:arr})



}

module.exports = addtopic
