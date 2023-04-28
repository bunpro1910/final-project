
const connect = require('../../database/connect')

const nodemailer = require('nodemailer')
let addtopic = async (req, res, next) => {
    console.log(req.query)
    let query = `select p.image,p.price,cd.product_quantity as orderquantity,p.name from public.cart as c,public.cart_detail as cd, public.product as p where cd.product_id = p.id and cd.cart_id = c.id and c.id =${req.query.cartid}`
    let result = await connect(query)

    let total = result.rows.reduce((init, item, i) => {
        init += item.price * item.orderquantity
        return init
    }, 0)
    if (req.query.resultCode == 0) {

        let query1 = `update public.cart set status = true where id=${req.query.cartid}`
        let query2 = `insert into public.invoice (cart_id,name,address,userid,date,status,email,phone_number,type,payalid) values( ${req.query.cartid},'${req.query.fullname}','${req.query.address}','${req.session.user.id}',to_timestamp(${new Date() / 1000}),1, '${req.query.email}','${req.query.phone_number}','Momo','${req.query.orderId}')`
        let minusquantity = `update public.product set quantity = quantity - d.product_quantity from(select * from public.cart_detail where cart_id= ${req.query.cartid}) as d where public.product.id = d.product_id`
        let result1 = await connect(query1)
        let result2 = await connect(query2)
        let result3 = await connect(minusquantity)
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
            to: `${req.query.email}`,
            subject: `You have Check out successfully`,
            secure: false,
            text: "You have Check out successfully please check your info in my website",
            html: `You have Check out successfully please check your info in my website, there is your history <a href="${process.env.HOST_URL}/history">History</a>`,
        });
        info.then(result => {
            res.redirect(`${process.env.HOST_URL}/history`);
        })

    } else {
        res.redirect(`${process.env.HOST_URL}/checkout`)
    }





}

module.exports = addtopic
