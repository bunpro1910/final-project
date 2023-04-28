
const connect = require('../../database/connect')
const fs = require('fs')

let addcategory = async (req, res, next) => {
    if (!req.body.id) {
        res.json({ isSuccess: false, message: "required Account ID" })
        return
    }
    const id = req.body.id


    let query2 = `delete from public.user where id = '${id}'; delete from public.account where username = '${id}';delete from public.invoice where userid = '${id}';delete from cart where user_id = '${id}'; delete from cart_detail where cart_id In (SELECT id FROM public.cart WHERE user_id = '${id}') `
    let result2 = await connect(query2)

    if (result2[0].rowCount) {
        res.json({ isSuccess: true, message: "Delete Successfully" })
        global.io.emit('deleteuser', { body: true })

    } else {
        res.json({ isSuccess: false, message: "Delete Failed" })
    }

}

module.exports = addcategory
