
const path = require('path')
const nodemailer = require("nodemailer");
const connect = require('../../database/connect')
let login = async (req, res) => {
  if (!req.body.form.username) {
    res.json({ isSuccess: false, message: "need user name" })
    return
  }
  let query = `select * from account where lower(username) = '${req.body.form.username}'`
  let result = await connect(query)
  if (result.rowCount > 0) {

    var randomstring = require("randomstring");

    let newpass = randomstring.generate(7);
    let acceptcode = randomstring.generate(7);
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
        user: 'gokuhieu20@gmail.com',
        pass: 'zkebzsornfordonc',
      },
    });
    let info = transporter.sendMail({
      from: '"There is new password" <gokuhieu20@gmail.com>', // sender address
      to: `${req.body.form.username}`, // list of receivers
      subject: `please confirm your new password is ${newpass}`,
      secure: false, // Subject line
      text: "There is form reset password",
      html: `here is link to accept <a href ="http://localhost:3000/verify"> Verify your new password  </a> Code is ${acceptcode}`,
    });
    info.then(result => {
      req.session.password = {
        newpass: newpass,
        acceptcode: acceptcode,
        username: req.body.form.username
      }
      res.json({ isSuccess: true, message: "your new password is send to yourmail" })
    })
  } else {
    res.json({ isSuccess: false, message: "username not found" })
  }
}

module.exports = login