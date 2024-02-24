const express = require('express') // importar libreria
const app = express() // inicializacion de la variable que usara la libreria
const router = express.Router(); // enrutar los servicios web
const port = 3000; // Escuchar el servidor
require('dotenv').config() //Obtendremos las variables de entorno
const socket = require('socket.io')
const http = require('http').Server(app)
const io = socket(http)

const DB_URL = process.env.DB_URL || '';

const mongoose = require('mongoose')
mongoose.connect(DB_URL)

const userRoutes = require('./routes/UserRoutes')
const houseRoutes = require('./routes/HouseRoutes')
const messageRoutes = require('./routes/MessageRoutes')

// Metodo [GET, POST, PUT, PATCH, DELETE]
// NOMBRE DEL SERVICIO [/]      *NUNCA LLEVAN ESPACIOS
//
router.get('/', (req, res) => {
  // informacion a modificar
  res.send("Hello world")
})

const MessageSchema = require('./models/Message')

/** Metodo websocket **/
io.on('connect', (socket) => {
  console.log('connected')
  //escuchando eventos desde el servidor
  socket.on('message', (data) => {
    // almacenando el mensaje en la base de datos
    var payload = JSON.parse(data)
    console.log(payload)
    MessageSchema(payload).save().then((result) => {
      /* Enviando mensaje a todos los clientes conectados al websocket */
      socket.broadcast.emit('message-receipt', payload)
      //emitimos mensaje hacia al cliente
    }).catch((err) => {
      console.log({ "status": "error", "message": err.message })
    })
  })

  socket.on('disconnect', (socket) => {
    console.log("disconected")
  })
})

app.use(express.urlencoded({ extended: true })) // Acceder a la informacion de las urls
app.use(express.json()) // Analizar informacion en formato JSON
app.use((req, res, next) => {
  res.io = io
  next()
})
// ejecutar servidor
app.use(router);
app.use('/upload', express.static('upload'))
app.use('/', userRoutes)
app.use('/', houseRoutes)
app.use('/', messageRoutes)

http.listen(port, () => {
  console.log('listen on ' + port)
})
