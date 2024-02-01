const passport = require('passport');
const FacebookStrategy = require('passport-facebook')
const db = require('../model.js');

require('dotenv').config();

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: process.env.FACEBOOK_REDIRECT_URL,
},
async function(accessToken, refreshToken, profile, cb) {
    console.log('profile returned from facebook: ', profile);
    const returned = await db.query(`SELECT * FROM users WHERE email = '${profile.email}'`)

    let queryValues;
    let queryText;
    let user;
    if (returned.rows.length > 0) {
        user = await db.query(`UPDATE users SET facebook = true WHERE email = '${profile.email}' RETURNING userid`);
    } else {
        queryValues = [profile.displayName, profile.displayName, profile.email, true];
        queryText = 'INSERT INTO users (firstname, lastname, email, facebook) VALUES ($1, $2, $3, $4) RETURNING userid';
        user = await db.query(queryText, queryValues);
        console.log("inserteduserid or updateduserid", user);
    }
    cb(null, user.rows[0].userid);
}))

module.exports = passport;
