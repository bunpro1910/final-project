

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

    let cart = `select * from public.cart_detail where product_id = '${req.body.proid}' and cart_id = ${req.body.cartid}`
    let result1 =await connect(cart)
    if(req.body.quantity <=0)
    {
        let query3  = `delete from public.cart_detail where product_id = '${req.body.proid}' and  cart_id = ${req.body.cartid}`
        let result3 =await connect(query3)
        if(result3.rowCount>0){
            res.json({isSuccess:true, message:"Updated sucessfully"})
            global.io.emit(`reloadcart`)
        }else{
            res.json({isSuccess:false,err:"Updated failed"})
        }
        return
    }
    let query = `update public.cart_detail set product_quantity = ${req.body.quantity} where product_id = '${req.body.proid}' and cart_id = ${req.body.cartid} `
    let result = await connect(query)
    console.log(result)
    if(result.rowCount>0){
        res.json({isSuccess:true, message:"Updated sucessfully"})
        global.io.emit(`reloadcart`)
    }else{
        res.json({isSuccess:false,err:"Updated failed"})
    }


}

module.exports = addtopic
