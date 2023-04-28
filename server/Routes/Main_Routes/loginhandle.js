
const connect = require("../../database/connect")
const path = require('path')
const bcrypt = require('bcrypt')
let handlelogin = async (req, res) => {
    let query = `select * from public.account where lower (username) = lower('${req.body.username}')`


    let account = await connect(query)
    if (account.rowCount > 0) {
        let result = await bcrypt.compare(req.body.password, account.rows[0].password)
        if (!result) {
            res.json({ isSucess: false, message: "User ID or password not match" })
            return
        }
        //table user account role 
        let query1 = `select p.name as permission, u.account_id,u.fullname,a.password,u.gender,u.gmail,u.id,u.old,u.phone_number,a.roleid from public.user as u,public.role as r, public.permission as p,public.account as a where u.account_id = '${req.body.username}' and u.account_id = a.username and r.id= a.roleid and r.permission =p.id`
        let user = await connect(query1)

        if(user.rows[0].permission=="User"){
            user.rows[0] ={...user.rows[0],isUser:true}
        }
        if(user.rows[0].permission=="Admin"){
            user.rows[0] ={...user.rows[0],isAdmin:true}
            user.rows[0] ={...user.rows[0],isManager:true}
            user.rows[0] ={...user.rows[0],isUser:true}
        }
        if(user.rows[0].permission=="Manager"){
            user.rows[0] ={...user.rows[0],isManager:true}
            user.rows[0] ={...user.rows[0],isUser:true}
        }
        req.session = { user: user.rows[0] }
       


        res.json({ isSuccess: true, message: "Login Successfully" })

        return
    } else {
        res.json({ isSuccess: false, message: "User ID not match" })
    }







}

module.exports = handlelogin