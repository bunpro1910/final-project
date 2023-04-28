const { json } = require("body-parser")
const cloudinary = require("../../database/cloudinary")
const connect = require('../../database/connect')
const fs = require('fs')
function checkissuccess(resultquery, res, req,status) {

  if (resultquery.rowCount > 0) {
    let message = `${status} Product Sucessfully`
    global.io.emit('reloadproduct', { body: true })
    res.json({ isSuccess: true, message: message })
  } else {
  
    if (req.body.isupdated) {
      message = `${status} Product Failed`
    }
    if (resultquery[0] || resultquery[1]) {
      if (resultquery[0].rowCount > 0) {
        message = `${status} Product sucessfully`
        global.io.emit('reloadproduct', { body: true })
        res.json({ isSuccess: true, message: message })
        return
      }
    }

    res.json({ isSuccess: false, message: message })
  }
}
let addproduct = async (req, res, next) => {
  const file = req.file
  const id = req.body.id
  const name = req.body.name
  const cateid = req.body.cateid
  const brandid = req.body.brandid
  const price = req.body.price
  const quantity = req.body.quantity
  const description = req.body.description
  const strap = req.body.strap
  const waterproof = req.body.waterproof
  let isupdated = req.body.isupdated
  let isupdatedid = req.body.isupdatedid
  if(!id){
    res.json({ isSuccess: false, message:"required ID"})
    return
  }
  if(!name){
    res.json({ isSuccess: false, message:"required Name"})
    return
  }
  if(!cateid){
    res.json({ isSuccess: false, message:"required Category"})
    return
  }
  if(!brandid){
    res.json({ isSuccess: false, message:"required Brand"})
    return
  }
  if (file) {
  
    var img = '/' +file.path;
    
    let query = `insert into public.product (id,name,cateid,brandid,price,quantity,image,description,strap,waterproof) values('${id}','${name}','${cateid}',${brandid},${price},${quantity},'${img}','${description}','${strap}','${waterproof}');`
    if (isupdatedid) {
      query = query + `delete from public.product where id ='${req.body.oldid}'`
    } else if (isupdated == true) {
      query = `update public.product set name='${name}',cateid = '${cateid}',brandid = ${brandid} ,price=${price},quantity=${quantity},image='${result.url}',description = '${description}',strap = '${strap}',waterproof ='${waterproof}' where id='${id}'`
    }
    let resultquery = await connect(query)
    checkissuccess(resultquery, res, req,query.includes("insert")?"Add new ":"Update")
    

  } else {

    let query = `insert into public.product (id,name,cateid,brandid,price,quantity,image,description,strap,waterproof) values('${id}','${name}','${cateid}',${brandid},${price},${quantity},'${req.body.image}','${description}','${strap}','${waterproof}');`
    if (isupdatedid) {
      query = query + `delete from public.product where id ='${req.body.oldid}'`
    } else if (isupdated) {
      query = `update public.product set name='${name}',cateid = '${cateid}',brandid = ${brandid} , price=${price},quantity=${quantity},description = '${description}',strap = '${strap}',waterproof='${waterproof}' where id='${id}'`
    }
    let resultquery = await connect(query)
    checkissuccess(resultquery, res, req,query.includes("insert")?"Add new ":"update")
  }

}

module.exports = addproduct
