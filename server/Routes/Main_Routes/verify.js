
const path = require('path')
const nodemailer = require("nodemailer");
const connect = require('../../database/connect')
const bcrypt = require('bcrypt')
let login = async (req, res) => {
    if (!req.body.form.code) {
        res.json({ isSuccess: false, err: "need Code" })
        return
    }
    if(!req.session.password){
        res.json({ isSuccess: false, err: "you need input information in forget password" })
        return
    }
    let hash = await bcrypt.genSalt(10)
    let password = await bcrypt.hash(req.session.password.newpass,hash)
    
    if(req.body.form.code != req.session.password.acceptcode){
        res.json({ isSuccess: false, err: "Code is not same" })
        return
    }
    const query =`update  public.account set password = '${password}'  where lower(username) = '${ req.session.password.username}'`
    let result = await connect(query)
    if(result.rowCount>0){
        res.json({isSuccess: true,message:"your password is reset successfully"})
        req.session.password = null
    }else{
        res.json({isSuccess: false,err:"your password is reset failed"})
    }
    
}

module.exports = login