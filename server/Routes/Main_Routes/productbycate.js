
const connect = require('../../database/connect')
const path = require('path')
let returnquery = (type, value, query) => {
    switch (type) {
        case 'equal':
            query += `price = ${value}`
            break;
        case 'bigger':
            query += `price > ${value}`
            break;
        case 'less':
            query += `price < ${value}`
            break;
        case 'bigger_equal':
            query += `price >= ${value}`
            break;
        case 'less_equal':
            query += `price <= ${value}`
            break;
        default:
            query += `price >= ${value.bigger} and price <= ${value.less}`
            break;
    }
    return query
}
let topic = async (req, res) => {
    let query
    if (!req.query.id) {
        query = `SELECT p.id, p.name, p.price, p.image, c.name as catename, c.id AS catei
        FROM public.product AS p
        INNER JOIN public.category AS c ON p.cateid = c.id
        WHERE p.id IN (
          SELECT id FROM (
            SELECT id, ROW_NUMBER() OVER (PARTITION BY cateid ORDER BY id) AS row_num
            FROM public.product
          ) AS subquery
          WHERE row_num <= 4
        )`
    } else {
        query = `SELECT p.id, p.name, p.price, p.image, c.name as catename, c.id AS cateid
        FROM public.product AS p
        INNER JOIN public.category AS c ON p.cateid = c.id
        WHERE p.id IN (
          SELECT id FROM (
            SELECT id, ROW_NUMBER() OVER (PARTITION BY cateid ORDER BY id) AS row_num
            FROM public.product
          ) AS subquery
          WHERE row_num <= 4
        )`
    }
    let count = 0
    if (req.query.cateid) {
        query = `select * from public.product where cateid ='${req.query.cateid}' `
    }
    if (req.query.search) {
        query = `select * from public.product where name like '%${req.query.search}%' `
    }
    if (req.query.s_id != '' && req.query.s_id != undefined) {
        if (count == 0) {
            query += ` where `
        } else {
            query += ` and `
        }
        query += ` id like '%${req.query.s_id}%'`
        count++
    }
    if (req.query.s_name != '' && req.query.s_name != undefined) {
        if (count == 0) {
            query += ` where `
        } else {
            query += ` and `
        }
        query += ` name like '%${req.query.s_name}%'`
        count++
    }
    if (req.query.s_cateid != '' && req.query.s_cateid != undefined) {
        if (count == 0) {
            query += ` where `
        } else {
            query += ` and `
        }
        query += ` cateid like '%${req.query.s_cateid}%'`
        count++
    }
    if (req.query.s_price != undefined) {
        if (req.query.s_price.value != '') {
            if (count == 0) {
                query += ` where `
            } else {
                query += ` and `
            }
            query = returnquery(req.query.s_price.type, req.query.s_price.value, query)


        }
    }
    if (req.query.s_quantity != undefined) {
        if (req.query.s_quantity.value != '') {
            if (count == 0) {
                query += ` where `
            } else {
                query += ` and `
            }
            query = returnquery(req.query.s_quantity.type, req.query.s_quantity.value, query)


        }
    }

    let product = await connect(query)
   ; // create an empty object to store the categories

    // loop through each product and add it to its category in the categories object
    const categories = product.rows.reduce((init,item)=>{
        let exists = init.find((e)=>e.catename==item.catename)
        if(!exists){
            init.push({catename:item.catename,product:[]})

        }
        init.filter((e,i)=>{if(e.catename == item.catename){e.product.push(item)}})
        return init
    },[])

    if (product.rowCount > 0) {
        res.json({ product: categories, quantity: product.rowCount })
    } else {
        res.json({ product: "don't have any product", quantity: 0 })
    }

}

module.exports = topic