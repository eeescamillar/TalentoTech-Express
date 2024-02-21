const express = require('express') // importar libreria
const app = express() // inicializacion de la variable que usara la libreria
const router = express.Router(); // enrutar los servicios web
const port = 3000; // Escuchar el servidor
require('dotenv').config() //Obtendremos las variables de entorno

const DB_URL = process.env.DB_URL || '';

const mongoose = require('mongoose')
mongoose.connect(DB_URL)

const userRoutes = require('./routes/UserRoutes')
const houseRoutes = require('./routes/HouseRoutes')
app.use(express.urlencoded({ extended: true })) // Acceder a la informacion de las urls
app.use(express.json()) // Analizar informacion en formato JSON

// Metodo [GET, POST, PUT, PATCH, DELETE]
// NOMBRE DEL SERVICIO [/]      *NUNCA LLEVAN ESPACIOS
//
router.get('/', (req, res) => {
  // informacion a modificar
  res.send("Hello world")
})


// ejecutar servidor
app.use(router);
app.use('/upload', express.static('upload'))
app.use('/', userRoutes)
app.use('/', houseRoutes)
app.listen(port, () => {
  console.log('listen on ' + port)
})
