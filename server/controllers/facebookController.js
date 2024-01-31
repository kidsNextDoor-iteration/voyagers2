const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const db = require('../model.js');

require('dotenv').config();

const facebookController = {}

// facebookController.newStrategy = async (req, res, next) => {
//     try {
//     passport.use(new FacebookStrategy({
//         clientID: process.env.FACEBOOK_CLIENT_ID,
//         clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
//         callbackURL: process.env.FACEBOOK_REDIRECT_URL,
//     },
//     async function(accessToken, refreshToken, profile, cb) {
//         console.log('profile returned from facebook: ', profile);
//         const returned = await db.query(`SELECT * FROM users WHERE email = '${profile.email}'`)

//         let queryValues;
//         let queryText;

//         if (returned.rows.length > 0) {
//             await db.query(`UPDATE users SET facebook = true WHERE email = '${profile.email}'`);
//         } else {
//             queryValues = [profile.displayName, profile.displayName, profile.email, true];
//             queryText = 'INSERT INTO users (firstname, lastname, email, facebook) VALUES ($1, $2, $3, $4) RETURNING userid';
//             const insertedUserId = await db.query(queryText, queryValues);
//         }
//         // const userid = await db.query(`SELECT userid FROM users WHERE email = '${profile.email}'`);
//         // console.log("userid: ", userid.rows[0].userid);
//         // res.locals.userid = userid.rows[0].userid;
//         cb(null, insertedUserId.rows[0].userid);
//     }))
//     return next()
//     }
//     catch (error) {

//     }

//     return next(error)
// }

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: process.env.FACEBOOK_REDIRECT_URL,
},
async function(accessToken, refreshToken, profile, cb) {
    console.log('profile returned from facebook: ', profile);
    profile.email = 'im.darren93@gmail.com';
    const returned = await db.query(`SELECT * FROM users WHERE email = '${profile.email}'`)


    let queryValues;
    let queryText;
    let insertedUserId;
    if (returned.rows.length > 0) {
        await db.query(`UPDATE users SET facebook = true WHERE email = '${profile.email}'`);
    } else {
        queryValues = [profile.displayName, profile.displayName, profile.email, true];
        queryText = 'INSERT INTO users (firstname, lastname, email, facebook) VALUES ($1, $2, $3, $4) RETURNING userid';
        insertedUserId = await db.query(queryText, queryValues);
        console.log("inserteduserid", insertedUserId);
    }
    // const userid = await db.query(`SELECT userid FROM users WHERE email = '${profile.email}'`);
    // console.log("userid: ", userid.rows[0].userid);
    // res.locals.userid = userid.rows[0].userid;
    cb(null, insertedUserId.rows[0].userid);
}))

// module.exports = facebookController;
module.exports = passport;



// profile returned from facebook:  {
//     [1]   id: '10161444043737472',
//     [1]   username: undefined,
//     [1]   displayName: 'Darren Im',
//     [1]   name: {
//     [1]     familyName: undefined,
//     [1]     givenName: undefined,
//     [1]     middleName: undefined
//     [1]   },
//     [1]   gender: undefined,
//     [1]   profileUrl: undefined,
//     [1]   provider: 'facebook',
//     [1]   _raw: '{"name":"Darren Im","id":"10161444043737472"}',
//     [1]   _json: { name: 'Darren Im', id: '10161444043737472' }
//     [1] }