const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://yeticrab:yeticrab@mycluster1.utmjhjz.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI, {
  // options for the connect method to parse the URI
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // sets the name of the DB that our collections are part of
  dbName: 'myCluster1'
})
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));

const Schema = mongoose.Schema;

const userSchema = new Schema({
  // firstName: String,
  // lastName: String,
  // userName: {type: String, required: true, unique: true},
  // email:
  // password:
  // trips: {
  //   date:
    
  // }
});

module.exports = {
  User
};