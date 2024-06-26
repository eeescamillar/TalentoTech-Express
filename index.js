const express = require('express') // importar libreria
const app = express() // inicializacion de la variable que usara la libreria
const router = express.Router(); // enrutar los servicios web
const port = 3000; // Escuchar el servidor
require('dotenv').config() //Obtendremos las variables de entorno
// const socket = require('socket.io')
const cors = require('cors')
app.use(cors());
const http = require('http').Server(app)
//!NOTE: disable websocket
// const io = socket(http)

const { createYoga } = require('graphql-yoga');
const schema = require('./graphsql/schema')

const DB_URL = process.env.DB_URL || '';

const mongoose = require('mongoose')
mongoose.connect(DB_URL)

const userRoutes = require('./routes/UserRoutes')
const houseRoutes = require('./routes/HouseRoutes')
const messageRoutes = require('./routes/MessageRoutes')
const deparmentRoutes = require('./read_file')

// Metodo [GET, POST, PUT, PATCH, DELETE]
// NOMBRE DEL SERVICIO [/]      *NUNCA LLEVAN ESPACIOS
//
router.get('/', (req, res) => {
  // informacion a modificar
  res.send("Hello world")
})

const MessageSchema = require('./models/Message')

//!NOTE: disable websocket
/** Metodo websocket **/
// io.on('connect', (socket) => {
  // console.log('connected')
  //escuchando eventos desde el servidor
  // socket.on('message', (data) => {
    // almacenando el mensaje en la base de datos
    // var payload = JSON.parse(data)
    // console.log(payload)
    // MessageSchema(payload).save().then((result) => {
      /* Enviando mensaje a todos los clientes conectados al websocket */
      // socket.broadcast.emit('message-receipt', result)
      //emitimos mensaje hacia al cliente
    // }).catch((err) => {
      // console.log({ "status": "error", "message": err.message })
    // })
  // })

  // socket.on('disconnect', (socket) => {
    // console.log("disconected")
  // })
// })

app.use(express.urlencoded({ extended: true })) // Acceder a la informacion de las urls
app.use(express.json()) // Analizar informacion en formato JSON

//!NOTE: disable websocket
// app.use((req, res, next) => {
  // res.io = io
  // next()
// })

const yoga = new createYoga({ schema });
app.use('/graphql', yoga);

// ejecutar servidor
app.use(router);
app.use('/upload', express.static('upload'))
app.use('/', userRoutes)
app.use('/', houseRoutes)
app.use('/', messageRoutes)
app.use('/', deparmentRoutes)

//!NOTE: disable websocket
// http.listen(port, () => {
  // console.log('listen on ' + port)
// })


 app.listen(port, () => {
   console.log('listen on ' + port)
 })


module.exports = http
