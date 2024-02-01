const sharp = require('sharp');
const crypto = require('crypto');
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { S3Client, GetObjectCommand, PutObjectCommand } = require("@aws-sdk/client-s3");
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
const db = require('../model.js');

require('dotenv').config();


// CONTROLLER DECLERATION // 
const imageController = {};

// RANDOM IMAGE NAME GENERATOR // 
const randomImageName = (bytes = 32) => {
  return crypto.randomBytes(bytes).toString('hex');
}

// DOTENV VARIABLE DECLERATION // 
const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

// CREATE S3 CLIENT // 
const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
  region: bucketRegion
});


// --------- UPLOAD IMAGE ----------- //
imageController.uploadSingleImg = async (req, res, next) => {
  try {
    const buffer = await sharp(req.file.buffer).resize({ height: 800, width: 800, fit: "cover" }).toBuffer()

    const imgName = randomImageName();

    const params = {
      Bucket: bucketName,
      Key: imgName,
      Body: buffer,
      ContentType: req.file.mimetype,
    }

    const command = new PutObjectCommand(params)

    await s3.send(command)

    console.log('what is my cookie: ', req.cookies.tripId)
    const tripID = await req.cookies.tripId;

    const getObjectParams = {
      Bucket: bucketName,
      Key: imgName
    }

    const command2 = new GetObjectCommand(getObjectParams)
    const imgURL = await getSignedUrl(s3, command2, { expiresIn: 604750 })

    const querySTR = `INSERT INTO images (imageName, imageUrl, tripid) VALUES ('${req.body.caption}', '${imgURL}', '${tripID}');`

    await db.query(querySTR);

    return next();
  } catch (err) {
    console.log('error in imageController.uploadSingleImg', err);
    return next();
  }
}

// -------------- GET IMAGES ------------- //
imageController.getImages = async (req, res, next) => {
  try {
    // console.log('res.locals.tripId: ', res.locals.tripId)
    console.log('req.body: ', req.body)
    console.log('trip cookie: ', req.cookies.tripId)
    const tripID = await req.cookies.tripId;
    const querySTR = `SELECT * FROM images WHERE tripid = '${tripID}';`

    const imageQueryResults = await db.query(querySTR);
    res.locals.imageQueryResults = imageQueryResults.rows;


    return next();
  } catch (err) {
    console.log('error in imageController.getImages: ', err)
    return next();
  }
}


imageController.getCoverImage = async (req, res, next) => {
  try {

    const tripArray = res.locals.trips;

    const outputArr = [];

    for (let trip of tripArray) {
      const response = await db.query(`SELECT imageurl FROM images WHERE tripid = ${trip.tripid}`)
      outputArr.push({ ...trip, coverImage: response.rows[0] })
    }

    // const returnedArr = outputArr.map(trip => {
    //   return { ...trip, coverImage: coverImage.imageurl ? coverImage.url : 'none' }
    // })

    console.log('output arr: ', outputArr)

    res.locals.trips = outputArr;













    return next()
  } catch (error) {
    return next(error)
  }
}


// ---------------- DELETE IMAGES --------------- //
imageController.deleteImage = async (req, res, next) => {
  try {
    console.log(req.body.imgSrc)
    const imgURL = req.body.imgSrc;
    const querySTR = `DELETE FROM images WHERE imageUrl = '${imgURL}';`
    await db.query(querySTR);
    return next();
  } catch (err) {
    console.log('error in imageController.deleteImage', err)
    return next();
  }
}














module.exports = imageController;