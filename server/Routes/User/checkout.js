

const connect = require('../../database/connect')
const nodemailer = require('nodemailer')
const os = require("os");

// get host name
const hostName = os.hostname();
 let checkout = async(req,res,next)=>{
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
    let result3 = await connect(minusquantity)
   
    let transaction = `insert into public.invoice (cart_id,name,address,userid,phone_number,date,status,email,type) select id,'${req.body.fullname}','${req.body.address}','${req.session.user.id}','${req.body.phone_number}','${req.body.date}',1,'${req.body.email}','ship COD' from public.cart where user_id = '${req.session.user.id}' and status = false`
    
    let result = await connect(transaction)
   
    let updatecart = `update public.cart set status = true where user_id = '${req.session.user.id}' and status = false` ;
    let result1 = await connect(updatecart)
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
          user: 'gokuhieu20@gmail.com',
          pass: 'zkebzsornfordonc',
        },
      });
      let info = transporter.sendMail({
        from: '"Pham Le Hai Son Shop" <gokuhieu20@gmail.com>', 
        to: `${req.body.email}`,
        subject: `You have Check out successfully`,
        secure: false, 
        text: "You have Check out successfully please check your info in my website",
        html: `You have Check out successfully please check your info in my website, there is your history <a href="${process.env.HOST_URL}/history">History</a>`,
      });
      info.then(result => {
     
      })
      res.json({isSuccess:true,message:"invoice sucessfully"})
}

module.exports = checkout
