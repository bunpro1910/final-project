

const connect = require('../../database/connect')
let addtopic = async (req, res, next) => {

    let query = `select * from public.user as u inner join public.account as a on u.id = a.username`
    let result = await connect(query)

    res.json({ user:result.rows,quantity :result.rows.length })



}

module.exports = addtopic
