const paypal = require('paypal-rest-sdk');

paypal.configure({
  'mode': 'sandbox', 
  'client_id': process.env.CLIENT_ID,
  'client_secret': process.env.CLIENT_SECRET,
});

let payyal = async(req,res,next)=>{

    let cart = req.body.product.reduce((init,item,i)=>{
        init.push({
            "name":item.name,
            "price": parseInt((item.price* item.orderquantity)/23000) ,
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
        intent: "sale",
        payer: {
            payment_method: "paypal"
        },
        redirect_urls: {
            return_url: `${process.env.HOST_URL}/user/payal/success?cartid=${req.body.product[0].cartid}`,
            cancel_url: `${process.env.HOST_URL}/user/payal/cancel`
        },
        transactions: [{
            item_list: {
                items: cart
            },
            amount: {
                currency: "USD",
                total: parseInt(total/23000)  
            },
            description: `Pay for order id ${req.body.product[0].cartid}` 
        }]
    };
    
    paypal.payment.create(create_payment_json, function (error, payment) {
      if (error) {
          throw error;
      } else {
          for(let i = 0;i < payment.links.length;i++){
            if(payment.links[i].rel === 'approval_url'){
              res.json({link: payment.links[i].href});
            }
          }
      }
    });
}

module.exports = payyal
