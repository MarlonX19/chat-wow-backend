const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.send({ response: 'Conectado com sucesso!' });
});

io.on('connection', (socket) => {
  io.emit('connected', socket.client.conn.server.clientsCount)

  socket.on('disconnect', (reason) => {
    io.emit('disconnect', socket.client.conn.server.clientsCount)
  });

  socket.on('msg', (data, name) => {
    io.emit('msg', data, name)
  })

  socket.on('types', () => {
    socket.broadcast.emit('types')
  })

  socket.on('blur', () => {
    socket.broadcast.emit('blur')
  })
});



http.listen(process.env.PORT || 3000, () => {
  console.log('listening on port');
});
