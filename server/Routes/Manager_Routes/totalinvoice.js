

const connect = require('../../database/connect')
let addtopic = async (req, res, next) => {

    let query = `select i.id,sum(p.price*cd.product_quantity),i.status from public.invoice as i, public.cart as c, public.cart_detail as cd, public.product as p where p.id = cd.product_id and cd.cart_id = c.id and c.id = i.cart_id group by i.id`
    let result = await connect(query)

    let totalsuccess = 0
    let totalwaiting = 0
    let totalerr = 0

    let total =0
    console.log(result)
    result.rows.map((item, i) => {

        if (item.status == 1) {
            totalwaiting++;

        } else if (item.status == 2) {
            totalsuccess++
        } else {
            totalerr++
        }
        total+= parseInt(item.sum)

    })
    let data = { totalsuccess: totalsuccess, totalwaiting: totalwaiting, totalerr: totalerr,total }

    res.json({ data })



}

module.exports = addtopic
