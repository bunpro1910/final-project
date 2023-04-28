

const connect = require('../../database/connect')
let addtopic = async (req, res, next) => {

    let query = `select p.name , sum(cd.product_quantity)  from public.invoice as i , public.cart_detail as cd, public.product as p  where i.cart_id = cd.cart_id  and cd.product_id = p.id group by p.name  order by p.name asc limit 5`
    let result = await connect(query)
    res.json({ data :result.rows,quantity:result.rowCount})



}

module.exports = addtopic
