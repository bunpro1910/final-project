const Connection =require('pg');
var connection = Connection.Pool

// const myconect = new connection({
//     user: 'sqerguwe',
//     host: 'mouse.db.elephantsql.com',
//     database: 'sqerguwe',
//     password: '9zr3CHkRWZ-wmJt6c-c9hwZm49pFHZUH',
//     port: 5432,
//     ssl: {rejectUnauthorized: false},
//     });

const myconect = new connection({
    user: 'phone_sale_web_user',
    host: 'dpg-cfspv1qrrk0c832s6bg0-a.singapore-postgres.render.com',
    database: 'phone_sale_web',
    password: '3iq7tpz4SvL4J3FI4I3YXmlK1yxT5Hpn',
    port: 5432,
    ssl: {rejectUnauthorized: false},
    });
    
let connect = async(query)=>{
    try{
        let result = await myconect.query(query)
        return result
    }catch(e){
        console.log(e)
        return e
        
    }
    
}


module.exports = connect