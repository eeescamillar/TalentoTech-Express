const mongoose = require('mongoose') //importando libreria

// creando el modelo user
const UserSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(v) {
        // Expresión regular para validar el formato del correo electrónico
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: props => `${props.value} no es un correo electrónico válido!`
    }
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('user', UserSchema)