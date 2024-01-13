const express = require("express");
const app = express();
const path = require('path');
const PORT = 3000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const sharp = require('sharp');


const userController = require('./controllers/userController.js')

require('dotenv').config();

const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

// const dotenv = require('dotenv');
// dotenv.config();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

console.log('bucketname: ',bucketName)

const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
  region: bucketRegion
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});



// ------------- INTERNAL ROUTING ---------------- //
app.post('/signin', userController.verifyUser,
  // add middleware here,
  (req, res) => {
    res.status(200).send('request to signin successful')
  }
)
app.post('/signup', userController.addUser, 
  // add middleware here,
  (req, res) => {
    console.log('in /signup');
    res.status(200).send('request to signup successful')
  }
)

// ------------------- UPLOAD IMAGE ------------------ //
app.post('/api/uploadimage', 
  upload.single('image'),
  async (req, res) => {
  console.log("req.body: ", req.body)
  console.log('req.file: ', req.file)

  // RESIZE IMAGE //
  const buffer = await sharp(req.file.buffer).resize({height: 800, width: 800, fit: "cover"}).toBuffer()

  const params = {
    Bucket: bucketName,
    Key: req.file.originalname,
    Body: buffer,
    ContentType: req.file.mimetype,
  }
  const command = new PutObjectCommand(params)

  await s3.send(command)

  

  res.send(post)
})





// ----------- DB ROUTING ------------------- //



// ------------- CLIENT ROUTING FOR REACT ROUTER -------------- //
app.get('/home', (req, res) => {
  console.log('reroute to dist')
  res.sendFile(path.join(__dirname, '../dist/index.html'))
});

app.get('/signin', (req, res) => {
  console.log('reroute to dist')
  res.sendFile(path.join(__dirname, '../dist/index.html'))
});

app.get('/signup', (req, res) => {
  console.log('reroute to dist')
  res.sendFile(path.join(__dirname, '../dist/index.html'))
});

app.get('/addtrip', (req, res) => {
  console.log('reroute to dist')
  res.sendFile(path.join(__dirname, '../dist/index.html'))
});

app.get('/imageDemo', (req, res) => {
  console.log('reroute to dist')
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})





app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`);
});

