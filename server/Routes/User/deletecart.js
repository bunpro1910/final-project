

const connect = require('../../database/connect')
 let addtopic = async(req,res,next)=>{
    let err = ''
    if(!req.body.proid){
        err+= "need product ID "
    }
    if(!req.body.cartid){
        err+= "need cart ID"
    }
    if(err!=''){
        res.json({isSuccess:false,err:err})
        return
    }

    let query = `delete from public.cart_detail where product_id = '${req.body.proid}' and cart_id = ${req.body.cartid}`
    let result = await connect(query)
    console.log(result)
    if(result.rowCount>0){
        res.json({isSuccess:true, message:"delete sucessfully"})
    }else{
        res.json({isSuccess:false,err:"delete failed"})
    }


}

module.exports = addtopic
