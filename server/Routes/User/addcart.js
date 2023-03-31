

const connect = require('../../database/connect')
 let addtopic = async(req,res,next)=>{
    let err  = ''
    let query1 = `insert into public.cart (user_id,status) select '${req.session.user.id}',false where not exists ( select * from public.cart where user_id ='${req.session.user.id}' and status =false )`
    let result = await connect(query1)
    if(!req.body.product){
        res.json({isSuccess:false,err:"you didn't add any cart"})
        return
    }
    if(!req.body.product.id){
        err = 'required product id'
    }
    if(!req.body.product.quantity){
        err = 'required quantity'
    }
    if(err!=''){
        res.json({isSuccess:false,err:err})
        return
    }

    let query4 = `select c.id, d.product_id from public.cart as c, public.cart_detail as d where c.id = d.cart_id and d.product_id = '${req.body.product.id}' and c.user_id = '${req.session.user.id}' and status = false`
    let result4 = await connect(query4)
    if(result4.rowCount>0){
        let query5 = `update public.cart_detail set product_quantity = product_quantity +${req.body.product.quantity} where cart_id = ${result4.rows[0].id} `
        let result5 = await connect(query5)
        console.log(1)
        res.json({isSuccess:true})
        return
    }
    console.log(result4)
   
    let query2 = `insert into public.cart_detail (product_quantity,product_id,cart_id) select ${req.body.product.quantity},'${req.body.product.id}',id from public.cart where user_id='${req.session.user.id}' and status = false`
    let result2 = await connect(query2)
    
    res.json({isSuccess:true})

}

module.exports = addtopic
