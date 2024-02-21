const express = require('express');

const router = express.Router();
const bcrypt = require('bcrypt')
const multer = require('multer')
const UserSchema = require('../models/User.js')
const UserController = require('../controllers/UserController')
const userController = new UserController();
//prueba  
router.get('/name', (req, res) => {
  // recibiendo informacion como parametro
  res.send(req.query.name)
}) // http://localhost:3000/name?name=juan

//prueba  
router.get('/userw/:name', (req, res) => {
  // recibiendo informacion como parametro
  console.log(req.params.name)
  res.send(req.params.name)
}) // http://localhost:3000/name?name=juan

router.post('/userw', (req, res) => {
  //informacion a modificar
  var user = {
    "Username": req.body.name,
    "lastname": req.body.lastname,
    "age": req.body.name,
  } 
  res.send(user)
})

router.get('/prueba', (req, res) => {
  //informacion a modificar
  res.send("me ejecute por GET")
})

router.get('/prueba/id', (req, res) => {
  //informacion a modificar
  res.send("me ejecute por GET pasando el ID: " + req.params.id)
})

router.post('/user', async (req, res) => {
  //informacion a modificar
  console.log(req.body.password)
  const hashedPassword = await bcrypt.hash(req.body.password, 10)
  console.log(hashedPassword)

  let user = UserSchema({
    id: req.body.id,
    name: req.body.name,
    lastname: req.body.lastname,
    email: req.body.email,
    password: hashedPassword
  })

  user.save().then((result) => {
    res.send(result)
  }).catch((err) => {
    if (err.code == 11000) {
      res.send({ "status": "error", "message": "El correo ya fue registrado" })
    } else if (err.errors.email.message != null) {
      res.send({ "status": "error", "message": err.errors.email.message })
    } else {
      res.send({ "status": "error", "message": "Error almacenando la informacion" })
    }
  })

})

//router.get('/user', userController.validateToken, async (req, res) => {
router.get('/user',  async (req, res) => {
  //Traer todos los usuarios
  let users = await UserSchema.find();
  //console.log(users)
  res.json(users)
})


router.get('/user/:id', async (req, res) => {
  // Traer un usuario especifico id
  //Traer un usuario especifico pasando el ID
  try {
    var id = req.params.id
    let user = await UserSchema.findById(id);
    res.json(user)
  }
  catch (error) {
    res.send('Usuario no encontrado')
  }
  //Traer un usuario pasandole el email
  // const query = UserSchema.where({ email: email });
  // const user = await query.findOne()
})

router.patch('/user/:id', (req, res) => {
  // Informacion a modificar
  // Cuando viene por la URL del servicio web params
  try {
    var id = req.params.id;

    // Check if req.body exists and has the expected properties
    var updateUser = {
      name: req.body.name,
      lastname: req.body.lastname,
      email: req.body.email,
      id: req.body.id
    };

    // Cuando viene por el body se usa body
    UserSchema.findByIdAndUpdate(id, updateUser, { new: true })
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        console.log(error);
        res.send("Error actualizando el registro");
      });
  } catch (err) {
    res.send(err)
  }
});


router.delete('/user/:id', (req, res) => {
  //informacion a modificar
  var id = req.params.id

  UserSchema.deleteOne({ _id: id }).then(() => {
    res.json({ "status": "success", "message": "User deleted successfully" })
  }).catch((error) => {
    console.log(error)
    res.json({ "status": "failed", "message": "Error deleting user" })
  })
})

router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  userController.login(email, password).then((result) => {
    res.send(result)
  })
})

// configuracion de la libreria multer

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'upload/user')
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true)
  } else {
    cb(new Error('El archivo no es una imagen'))
  }
}

const upload = multer({ storage: storage, fileFilter: fileFilter })
// servicio web para el almacenamiento archivos
router.post('/upload/:id/user', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send({ 'status': 'error', 'message': 'no se proporciono ningun archivo' })
  }

  var id = req.params.id

  var updateUser = {
    avatar: req.file.path
  }

  UserSchema.findByIdAndUpdate(id, updateUser, { new: true }).then((result) => {
    res.send({ "status": "success", "message": "Archivo subido correctamente" })
  }).catch((error) => {
    console.log(error);
    res.send({ "status": "error", "message": "Error actualizando registro" })
  });

})

module.exports = router
