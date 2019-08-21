const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const connctedUsers = {};

io.on('connection', socket => {
  const { user } = socket.handshake.query;

  console.log(user, socket.id);

  connctedUsers[user] = socket.id;
});

mongoose.connect('mongodb+srv://chenrique:caio123456@cluster0-gpja5.mongodb.net/omnistack8?retryWrites=true&w=majority', {
  useNewUrlParser: true
});

app.use((req, res, next) => {
  req.io = io;
  req.connectedUsers = connctedUsers;

  return next();
});

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333);