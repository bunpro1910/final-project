const paypal = require('paypal-rest-sdk');

paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'ATk9WKFz_xbHKI-rUr_FGxKFHe909FuZQ4PnnBTlm_YTc4jPRcjnO50__2VwBpVMs2b2OEDvPhO5ghEK',
  'client_secret': 'EIuJ_KeKiDgVmN1UN4vaRc2FJOGF5rBQwdxzyH61Nh94SaCY8IErwrVu_sqlR7QqamA7c46F4_y9VQgZ'
});

let addtopic = async(req,res,next)=>{

    let cart = req.body.product.reduce((init,item,i)=>{
        init.push({
            "name":item.name,
            "price": item.price* item.orderquantity ,
            "currency": "USD",
            "quantity": item.orderquantity 
        })
        return init
    },[])
    let total = req.body.product.reduce((init,item,i)=>{
        init+= item.price*item.orderquantity
        return init
    },0)


    const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": `http://localhost:3001/user/payal/success?cartid=${req.body.product[0].cartid}`,
            "cancel_url": "http://localhost:3000/user/payal/cancel"
        },
        "transactions": [{
            "item_list": {
                "items": cart
            },
            "amount": {
                "currency": "USD",
                "total": total  
            },
            "description": `Pay for order id ${req.body.product[0].cartid}` 
        }]
    };
    
    paypal.payment.create(create_payment_json, function (error, payment) {
      if (error) {
          throw error;
      } else {
        console.log(payment);
          for(let i = 0;i < payment.links.length;i++){
            if(payment.links[i].rel === 'approval_url'){
              res.json({link: payment.links[i].href});
            }
          }
      }
    });
}

module.exports = addtopic
