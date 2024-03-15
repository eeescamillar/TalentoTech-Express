const express = require('express')

const router = express.Router();
const multer = require('multer')
const HouseSchema = require('../models/House.js')

// create
router.post('/house', async (req, res) => {

  let house = HouseSchema({
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    size: req.body.size,
    type: req.body.type,
    zip_code: req.body.zip_code,
    rooms: req.body.rooms,
    bathrooms: req.body.bathrooms,
    parking: req.body.parking,
    price: req.body.price,
    code: req.body.code
  })

  house.save().then((result) => {
    res.send(result)
  }).catch((err) => {
    res.status(400).send({ "status": "error", "message": "Error almacenado la informacion", err })
  })
})

//read
router.get('/house', async (req, res) => {
  let houses = await HouseSchema.find();

  res.json(houses)
})

//read by id
router.get('/house/:id', async (req, res) => {
  try {
    var id = req.params.id
    let house = await HouseSchema.findById(id);
    res.json(house)
  } catch (error) {
    res.status(404).send('Casa o inmueble no encontrado')
  }
})


// update
router.patch('/house/:id', (req, res) => {
  try {
    var id = req.params.id;

    var updateHouse = {
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      size: req.body.size,
      type: req.body.type,
      zip_code: req.body.zip_code,
      rooms: req.body.rooms,
      bathrooms: req.body.bathrooms,
      parking: req.body.parking,
      price: req.body.price,
      code: req.body.code
    };

    HouseSchema.findByIdAndUpdate(id, updateHouse, { new: true }).then((result) => {
      res.send(result);
    }).catch((err) => {
      console.log(err);
      res.status(400).send("Error actualizando el registro")
    })
  } catch (error) {
    res.send(error)
  }
})

// update con imagen
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'upload/houses')
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

router.post('upload/:id/house', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send({ "status": "error", "message": "no se proporciono ningun archivo" })
  }

  var id = req.params.id

  var updateHouse = {
    image: req.file.path
  }

  HouseSchema.findByIdAndUpdate(id, updateHouse, { new: true }).then((result) => {
    res.send({ "status": "success", "message": "archivo subido correctamente" })
  }).catch((error) => {
    console.log(error);
    res.send({ "status": "error", "message": "Error actualizando registro" })
  });
})

//delete
router.delete('/house/:id', (req, res) => {
  var id = req.params.id

  HouseSchema.deleteOne({ _id: id }).then(() => {
    res.json({ "status": "success", "message": "House deleted successfully" })
  }).catch((error) => {
    console.log(error)
    res.status(404).json({ "status": "failed", "message": "Error deleting house" })
  })
})

module.exports = router
