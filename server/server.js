const express = require('express');
const app = express();
const url = require('url');
const cors = require("cors");
const port = process.env.PORT || 3001;

const Main_Routes = require('./Routes/Main');
const Admin_Routes = require('./Routes/Admin');
const User_Routes = require('./Routes/User');
const { isuser, isadmin } = require('./Models/check');

var cookieSession = require('cookie-session');
const morgan = require('morgan');
const bodyParser = require('body-parser');

app.set('trust proxy', 1);
app.set('view engine', 'html');

const { Server } = require('socket.io');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static((__dirname + '/public')));

app.use(cookieSession({
  name: 'session',
  keys: ["phamlehaison"],
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
  httpOnly: false
}));

app.use(morgan('dev'));
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'https://client-shop.onrender.com');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use("/api/", Main_Routes);

app.use("/api/admin", isadmin, Admin_Routes);
app.use("/api/user", isuser, User_Routes);

var server = require('https').Server(app);
global.io = new Server(server);

io.on('connection', (socket) => {

});

server.listen(port, () => {
  console.log(`Application started and Listening on port ${port}`);
});