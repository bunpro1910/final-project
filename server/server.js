const express =require('express');
const app = express();
const url  =require('url');
const cors =require("cors")
const port = process.env.PORT || 3001;

const Main_Routes = require('./Routes/Main')
const Admin_Routes = require('./Routes/Admin')
const User_Routes = require('./Routes/User')
const {isuser,isadmin, ismanager} =require('./Models/check')
const ejs =require('ejs') 
var cookieSession = require('cookie-session')
const morgan =require('morgan')
const bodyParser = require('body-parser')
app.set('trust proxy', 1)
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);
const {Server} = require('socket.io');
const Manager_Routes = require('./Routes/Manager');
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true  }));
app.use(express.urlencoded({ extended: true })); 
app.use('/public',express.static((__dirname+ '/public')))
require('dotenv').config()
app.use(cookieSession({
    name: 'session',
    keys: ["phamlehaison"],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }))



app.use(morgan('dev'));
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', false);

    // Pass to next layer of middleware
    next();
});





app.use("/api/",Main_Routes)

app.use("/api/admin",isadmin,Admin_Routes)
app.use("/api/manager",ismanager,Manager_Routes)
app.use("/api/user",isuser,User_Routes)
var server = require('http').Server(app)
global.io = new Server(server,{cors: {
    origin: 'http://localhost:3000',
}});



io.on('connection', (socket) => {
  
});



server.listen(port, () => {
    console.log(`Application started and Listening on port ${port}`);
});

          
