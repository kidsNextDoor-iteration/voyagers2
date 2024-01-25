const express = require('express');

const imageController = require('../controllers/imageController');

const router = express.Router();

const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

router.get('/getImages', 
  // cookieController.setTripCookie,
  imageController.getImages,
  (req, res) => {
    res.status(200).json(res.locals.imageQueryResults)
  }
)

router.post('/uploadimage',
  upload.single('image'),
  imageController.uploadSingleImg,
  (req, res) => {
    res.status(200).send({status: 'upload complete'})
  }
)

router.delete('/deleteImage',
  imageController.deleteImage,
  (req, res) => {
    res.status(200).json({status: 'delete complete'})
  }
)

module.exports = router