const axios = require('axios');
const crypto =require('crypto');



let momo = async (req,res,next)=>{
  
    let total = req.body.product.reduce((init,item,i)=>{
        init+= item.price*item.orderquantity
        return init
    },0)
    
    const partnerCode = "MOMO";
    const accessKey = "F8BBA842ECF85";
    const secretkey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
    const requestId = partnerCode + new Date().getTime();
    const orderId = requestId;
    const orderInfo = "pay with MoMo";
    const redirectUrl = `${process.env.HOST_URL}/user/momo/success?cartid=${req.body.product[0].cartid}&fullname=${req.body.fullname}&email=${req.body.email}&address=${req.body.address}&phone_number=${req.body.phone_number}`;
    const ipnUrl = "https://callback.url/notify";
    const amount = `${total}`;
    const requestType = "captureWallet"
    const extraData = "";
    const rawSignature = "accessKey=" + accessKey + "&amount=" + amount + "&extraData=" + extraData + "&ipnUrl=" + ipnUrl + "&orderId=" + orderId + "&orderInfo=" + orderInfo + "&partnerCode=" + partnerCode + "&redirectUrl=" + redirectUrl + "&requestId=" + requestId + "&requestType=" + requestType
    const signature = crypto.createHmac('sha256', secretkey)
      .update(rawSignature)
      .digest('hex');
    const requestBody = JSON.stringify({
      partnerCode: partnerCode,
      accessKey: accessKey,
      requestId: requestId,
      amount: amount,
      orderId: orderId,
      orderInfo: orderInfo,
      redirectUrl: redirectUrl,
      ipnUrl: ipnUrl,
      extraData: extraData,
      requestType: requestType,
      signature: signature,
      lang: 'en'
    });
    let result = await axios.post('https://test-payment.momo.vn/v2/gateway/api/create',requestBody,{    
     headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(requestBody)
      }
    })
    res.json({link:result.data.payUrl})
}
module.exports = momo