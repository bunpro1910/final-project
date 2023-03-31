const { json } = require("body-parser")
const cloudinary = require("../../database/cloudinary")
const connect = require('../../database/connect')
const fs = require('fs')
function checkissuccess(resultquery, res, req) {
  if (resultquery.rowCount > 0) {
    let message = "Add new Product Sucessfully"
    if (req.body.isupdated) {
      message = "Update Product Sucessfully"
    }
    global.io.emit('reloadproduct', { body: true })
    res.json({ isSuccess: true, message: message })
  } else {
    let message = "Product ID not same"
    if (req.body.isupdated) {
      message = "Update Product Failed"
    }
    if (resultquery[0] || resultquery[1]) {
      if (resultquery[0].rowCount > 0) {
        message = `update Product sucessfully`
        global.io.emit('reloadproduct', { body: true })
        res.json({ isSuccess: true, message: message })
        return
      }
    }

    res.json({ isSuccess: false, message: message })
  }
}
let addcategory = async (req, res, next) => {
  let err = ''
  console.log(req)
  const file = req.file
  const id = req.body.id
  const name = req.body.name
  const cateid = req.body.cateid
  const brandid = req.body.brandid
  const price = req.body.price
  const quantity = req.body.quantity
  const description = req.body.description
  let isupdated = req.body.isupdated
  let isupdatedid = req.body.isupdatedid
  if (file) {
    console.log(1)
    var img = '/' +file.path;
    
    let query = `insert into public.product (id,name,cateid,brandid,price,quantity,image,description) values('${id}','${name}','${cateid}',${brandid},${price},${quantity},'${img}','${description}');`
    if (isupdatedid) {
      query = query + `delete from public.product where id ='${req.body.oldid}'`
    } else if (isupdated == true) {
      query = `update public.product set name='${name}',cateid = '${cateid}',brandid = ${brandid} ,price=${price},quantity=${quantity},image='${result.url}',description = '${description}' where id='${id}'`
    }
    let resultquery = await connect(query)
    checkissuccess(resultquery, res, req)
    console.log(query)

  } else {
    console.log(2)
    let query = `insert into public.product (id,name,cateid,brandid,price,quantity,image,description) values('${id}','${name}','${cateid}',${brandid},${price},${quantity},'${req.body.image}','${description}');`
    console.log(isupdated)
    if (isupdatedid) {
      query = query + `delete from public.product where id ='${req.body.oldid}'`
    } else if (isupdated) {
      query = `update public.product set name='${name}',cateid = '${cateid}',brandid = ${brandid} , price=${price},quantity=${quantity},description = '${description}' where id='${id}'`
    }
    let resultquery = await connect(query)
    checkissuccess(resultquery, res, req)
    console.log(query)
  }

}

module.exports = addcategory
