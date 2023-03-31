

const connect = require('../../database/connect')
 let addtopic = async(req,res,next)=>{
    let err  = ''
 

    if(!req.body.email){
        err = 'required email'
    }
    if(!req.body.address){
        err = 'required address'
    }
    if(!req.body.phone_number){
        err = 'required phone number'
    }
    if(err!=''){
        res.json({isSuccess:false,err:err})
        return
    }
    let selectcart  = `select * from public.cart where user_id = '${req.session.user.id}' and status = false`
    let orderdetail = await connect(selectcart)
    if(orderdetail.rowCount==0){
        res.json({isSuccess:false,err:"not found cartid"})
        return
    }
    let minusquantity = `update public.product set quantity = quantity - d.product_quantity from(select * from public.cart_detail where cart_id= ${orderdetail.rows[0].id}) as d where public.product.id = d.product_id`
    let resu3 = await connect(minusquantity)
   

 
    let transaction = `insert into public.invoice (cart_id,name,address,userid,phone_number,date,status,email,type) select id,'${req.body.fullname}','${req.body.address}','${req.session.user.id}','${req.body.phone_number}','${req.body.date}',1,'${req.body.email}','ship COD' from public.cart where user_id = '${req.session.user.id}' and status = false`
    
    let result = await connect(transaction)
   
    let updatecart = `update public.cart set status = true where user_id = '${req.session.user.id}' and status = false` ;
    let result1 = await connect(updatecart)

    res.json({isSuccess:true,message:"invoice sucessfully"})

}

module.exports = addtopic
