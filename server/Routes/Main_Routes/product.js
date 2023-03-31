
const connect =require('../../database/connect')
const path = require('path')
let returnquery =(type,value,query) =>{
    switch (type){
        case 'equal':
            query += ` and  p.price = ${value}`
            break;
        case 'bigger':
            query += ` and  p.price > ${value}`
            break;
        case 'less':
            query += ` and  p.price < ${value}`
            break;
        case 'bigger_equal':
            query += ` and  p.price >= ${value}`
            break;
        case 'less_equal':
            query += ` and  p.price <= ${value}`
            break;
        default:
            query += ` and  p.price >= ${value.bigger} and price <= ${value.less}`
            break;
    }
    return query
}
let topic = async (req,res)=>{
    let query 
    if(!req.query.id){
        query  =`select p.quantity, p.image,p.name,p.id,p.price,p.description,p.cateid,c.name as catename,b.name as brandname,b.id as brandid from public.product as p, public.category as c,public.brand as b where p.cateid = c.id and b.id = p.brandid`
    }else{
        query  =`select p.quantity, p.image,p.name,p.id,p.price,p.description,p.cateid,c.name as catename,b.name as brandname ,b.id as brandid from public.product as p, public.category as c,public.brand as b where p.cateid = c.id and b.id= p.brandid and p.id = '${req.query.id}'`
    }
    if(req.query.cateid){
        query  =`select p.quantity, p.image,p.name,p.id,p.price,p.description,p.cateid,c.name as catename,b.name as brandname,b.id as brandid from public.product as p, public.category as c,public.brand as b where p.cateid = c.id and b.id= p.brandid and p.cateid= '${req.query.cateid}'`
    }
    if(req.query.search){
        query  =`select p.quantity, p.image,p.name,p.id,p.price,p.description,p.cateid,c.name as catename,b.name as brandname,b.id as brandid from public.product as p, public.category as c,public.brand as b where p.cateid = c.id and b.id= p.brandid and p.name like '%${req.query.search}%' `
    }
    if(req.query.s_id !=''&&req.query.s_id!=undefined){

        query += ` and p.id like '%${req.query.s_id}%'`

    }
    if(req.query.s_name !=''&&req.query.s_name!=undefined){

        query += ` and  p.name like '%${req.query.s_name}%'`
       
    }
    if(req.query.s_cateid !=''&&req.query.s_cateid!=undefined){
        query += ` and  p.cateid like '%${req.query.s_cateid}%'`
    }

    if(req.query.s_price != undefined){
        if(req.query.s_price.value!=''){
            query = returnquery(req.query.s_price.type,req.query.s_price.value,query)
        }
    }
    if(req.query.s_quantity != undefined){
        if(req.query.s_quantity.value!=''){
            query = returnquery(req.query.s_quantity.type,req.query.s_quantity.value,query)  
        }
    }

    if(req.query.s_catename !=''&&req.query.s_catename!=undefined){
       query += ` and c.name = '${req.query.s_catename}'`
    }
    if(req.query.s_brandid !=''&&req.query.s_brandid!=undefined){
        query += ` and b.id = ${req.query.s_brandid}`
     }
    console.log(query)
    let product = await connect(query)
    if(product.rowCount>0){
        res.json({product:product.rows, quantity:product.rowCount})
    }else{
        res.json({product:"don't have any product",quantity:0})
    }
    
}

module.exports =topic