const passport = require('passport');
const FacebookStrategy = require('passport-facebook')
const db = require('../model.js');

require('dotenv').config();

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: process.env.FACEBOOK_REDIRECT_URL,
    profileFields: ['id', 'displayName', 'name',  'emails']
},
async function(accessToken, refreshToken, profile, cb) {
    // console.log('profile returned from facebook: ', profile);
    let email = profile.emails[0].value;
    const returned = await db.query(`SELECT * FROM users WHERE email = '${email}'`)

    

    let queryValues;
    let queryText;
    let user;
    let firstName;
    let lastName;
    if (returned.rows.length > 0) {
        user = await db.query(`UPDATE users SET facebook = true WHERE email = '${email}' RETURNING userid`);
    } else {
        firstName = profile.name.givenName;
        lastName = profile.name.familyName;
        if (!firstName && !lastName) firstName = lastName = profile.displayName;
        queryValues = [firstName, lastName, email, true];
        queryText = 'INSERT INTO users (firstname, lastname, email, facebook) VALUES ($1, $2, $3, $4) RETURNING userid';
        user = await db.query(queryText, queryValues);
        // console.log("inserteduserid or updateduserid", user);
    }
    cb(null, user.rows[0].userid);
}))

module.exports = passport;
