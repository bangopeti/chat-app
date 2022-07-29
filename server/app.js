const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const usersRoute = require('./routes/users');
const authRoute = require('./routes/auth');

const app = express();
const httpServer = http.createServer(app);
const options = { cors: { origin: '*' } };
const PORT = 8080;
const io = new Server(httpServer, options);

dotenv.config();

app.use(cors());
app.use(helmet());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL, () => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err));

io.on('connection', (socket) => {
  console.log(`${socket.id} has connected`);

  socket.on('send_message', (message) => {
    io.emit('receive_message', `${message.text}`);
  });
});

app.use('/users', usersRoute);
app.use('/auth', authRoute);

httpServer.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});
