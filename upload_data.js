const xlsx = require('xlsx')
const UserSchema = require('./models/User')
require('dotenv').config() //Obtendremos las variables de entorno
const bcrypt = require('bcrypt')


const DB_URL = process.env.DB_URL || '';

const mongoose = require('mongoose')
mongoose.connect(DB_URL)
// importacion de librerias |

/* LEER EL ARCHIVO EXCEL */
const workbook = xlsx.readFile('datos.xlsx')// LEER LOS DATOS
const sheet_list = workbook.SheetNames //OBTENEMOS LA LISTA DE HOJAS DEL EXCEL
const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_list[0]])//CONVERTIMOS LA INFOMRACION EN JSON

/* HASHEAMOS LA CONTRASEÑA DE CADA USUARIO DEL EXCEL */
for(const user of data){
  // HASHEAMOS LA CLAVE
  const hashedPassword = bcrypt.hashSync(user.password, 10)
  // SETEAMOS LA CONTRASEÑA CON LA NUEVA CLAVE
  user.password = hashedPassword
}

/* SUBIR LA INFORMACION A LA BASE DE DATOS PASANDOLE EL ARRAY */
UserSchema.insertMany(data).then(() => {
  console.log("Informacion subida correctamente")
}).catch(err => console.log("Error subiendo la informacion", err))
