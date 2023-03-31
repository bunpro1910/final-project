const paypal = require('paypal-rest-sdk');
const connect = require('../../database/connect')
paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'ATk9WKFz_xbHKI-rUr_FGxKFHe909FuZQ4PnnBTlm_YTc4jPRcjnO50__2VwBpVMs2b2OEDvPhO5ghEK',
    'client_secret': 'EIuJ_KeKiDgVmN1UN4vaRc2FJOGF5rBQwdxzyH61Nh94SaCY8IErwrVu_sqlR7QqamA7c46F4_y9VQgZ'
});

let addtopic = async (req, res, next) => {
    console.log(req.query)
    let query = `select p.image,p.price,cd.product_quantity as orderquantity,p.name from public.cart as c,public.cart_detail as cd, public.product as p where cd.product_id = p.id and cd.cart_id = c.id and c.id =${req.query.cartid}`
    let result = await connect(query)
    console.log(result)
    let cart = result.rows.reduce((init,item,i)=>{
        init.push({
            "name":item.name,
            "price": item.price* item.orderquantity ,
            "currency": "USD",
            "quantity": item.orderquantity 
        })
        return init
    },[])
    let total = result.rows.reduce((init,item,i)=>{
        init+= item.price*item.orderquantity
        return init
    },0)
    const execute_payment_json = {
        "payer_id": req.query.PayerID,
        "transactions": [{
            "item_list": {
                "items": cart
            },
            "amount": {
                "currency": "USD",
                "total": total
            }
        }]
    };
    paypal.payment.execute( req.query.paymentId, execute_payment_json, async function (error, payment) {
        //When error occurs when due to non-existent transaction, throw an error else log the transaction details in the console then send a Success string reposponse to the user.
        if (error) {
            console.log(error.response);
            throw error;
        } else {
            let address = `${payment.payer.payer_info.shipping_address.line1}, ${payment.payer.payer_info.shipping_address.city}, ${payment.payer.payer_info.shipping_address.state}, ${payment.payer.payer_info.shipping_address.country_code}`
            console.log(payment.payer.payer_info);
            let query1 = `update public.cart set status = true where id=${req.query.cartid}`
            let query2 = `insert into public.invoice (cart_id,name,address,userid,date,status,email,type,payalid) values (${req.query.cartid},'${payment.payer.payer_info.lastname} ${payment.payer.payer_info.first_name}','${address}','${req.session.user.id}',to_timestamp(${new Date()/1000}),1,'${payment.payer.payer_info.email}','Payal','${payment.id}')`
            let minusquantity = `update public.product set quantity = quantity - d.product_quantity from(select * from public.cart_detail where cart_id= ${req.query.cartid}) as d where public.product.id = d.product_id`
            let result1 = await connect(query1)
            let result2 = await connect(query2)
            let result3 = await connect(minusquantity)
            res.redirect('http://localhost:3000/history');
        }
    });
    
}

module.exports = addtopic
