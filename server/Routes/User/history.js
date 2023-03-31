

const connect = require('../../database/connect')
 let addtopic = async(req,res,next)=>{
    let query = `select * from public.invoice where userid = '${req.session.user.id}' order by id desc`
    let result = await connect(query)
 
    if(result.rowCount>0){
        res.json({history:result.rows,totalhistory:result.rows.length})
    }else{
        res.json({history:"you don't have any history",totalhistory:0})
    }
}

module.exports = addtopic
