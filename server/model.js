const { Pool } = require('pg');

const PG_URI = 'postgres://bxhpbwzb:Sm0XtTCpUif03wv57fdYmLt1Z-GQyTX_@batyr.db.elephantsql.com/bxhpbwzb';

const pool = new Pool({
  connectionString: PG_URI
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};

// const mongoose = require('mongoose');

// const MONGO_URI = 'mongodb+srv://yeticrab:yeticrab@mycluster1.utmjhjz.mongodb.net/?retryWrites=true&w=majority';

// mongoose.connect(MONGO_URI, {
//   // options for the connect method to parse the URI
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   // sets the name of the DB that our collections are part of
//   dbName: 'myCluster1'
// })
//   .then(() => console.log('Connected to Mongo DB.'))
//   .catch(err => console.log(err));

// const Schema = mongoose.Schema;

// const userSchema = new Schema({
//   // firstName: String,
//   // lastName: String,
//   // userName: {type: String, required: true, unique: true},
//   // email:
//   // password:
//   // trips: {
//   //   date:
    
//   // }
// });

// module.exports = {
//   User
// };

