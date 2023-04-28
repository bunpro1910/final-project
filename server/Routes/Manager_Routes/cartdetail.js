

const connect = require('../../database/connect')
 let addtopic = async(req,res,next)=>{
    if(!req.query.id){
        res.json({err:"need id"})
    }
    let query = `select c.id as cart_id,p.id,p.name,p.image, p.quantity, p.price, d.product_quantity as orderquantity from public.cart as c ,public.cart_detail as d,public.product as p where c.id = d.cart_id and d.cart_id=${req.query.id} and c.status=true and d.product_id = p.id order by p.id`
    let result = await connect(query)
    if(result.rowCount>0){
        res.json({cart:result.rows,totalcart:result.rows.length})
    }else{
        res.json({cart:"you don't have any cart",totalcart:0})
    }


}

module.exports = addtopic
