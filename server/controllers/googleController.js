
const qs = require('qs');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const db = require('../model.js');


require('dotenv').config();


const googleController = {};

googleController.getTokens = async (req, res, next) => {
    try {


        console.log('inside oauth controller')

        //get the code from queryString returned from logging in via google

        //http://localhost:3000/google/sessions?code=4%2F0AfJohXnCmYCqhdj76Kz1e3Y_6L6Zyw0yrT868hiHK3p4PI2yl0z1h344twLqWWaghcFVQg&scope=email+profile+openid+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&authuser=0&hd=fastcasual.co&prompt=consent

        const code = req.query.code;
        const url = 'https://oauth2.googleapis.com/token';
        const values = { code: code, client_id: process.env.GOOGLE_CLIENT_ID, client_secret: process.env.GOOGLE_CLIENT_SECRET, redirect_uri: process.env.GOOGLE_REDIRECT_URL, grant_type: 'authorization_code' };

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: qs.stringify(values)
        }



        //fetch tokens from google

        const response = await fetch(url, requestOptions);
        const data = await response.json();

        const { id_token, access_token } = data;

        res.locals.id_token = id_token;
        res.locals.access_token = access_token;


        // .then(response => response.json())
        // .then(data => {


        //     // res.locals.id_token = 1;
        //     // res.locals.access_token = 2;

        //     console.log('response: ', data)

        //     const { id_token, access_token } = data;

        //     //decode the recieved id_token to get user info encrypted in token
        //     const googleUser = jwt.decode(id_token);

        //     console.log('google user/id token decoded: ', googleUser);

        //     const { given_name, family_name, email, picture } = googleUser;


        //     //-------ADJUST PASSWORD TO REMOVE 'NOT NULL' IN DATABASE, ADD COLUMN 'AUTH'
        //     const dbValues = [given_name, family_name, email, 'google']
        //     const dbText = 'INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4)'

        //     db.query(dbText, dbValues)
        //         .then(
        //             console.log('done')



        //         )






        //     //session?


        // })



        // const { id_token, access_token } = response.data;

        // console.log('tokens: ', id_token, access_token)

        //get user with tokens

        //upsert the user

        //create a session

        //create acccess & refresh tokens

        //set cookies

        //redirect back to client



        return next()
    } catch (error) {
        return next(error)
    }
}

googleController.storeUser = async (req, res, next) => {
    try {

        const id_token = res.locals.id_token;
        const access_token = res.locals.access_token;

        const googleUser = jwt.decode(id_token);

        console.log('google user/id token decoded: ', googleUser);

        const { given_name, family_name, email, picture } = googleUser;

        const returned = await db.query(`SELECT * FROM users WHERE email = '${email}'`)

        let queryValues;
        let queryText;

        if (returned.rows.length > 0) {

            await db.query(`UPDATE users SET google = true WHERE email = '${email}'`);
        } else {

            queryValues = [given_name, family_name, email, true];
            queryText = 'INSERT INTO users (firstname, lastname, email, google) VALUES ($1, $2, $3, $4)';
            await db.query(queryText, queryValues);
        }

        const userid = await db.query(`SELECT userid FROM users WHERE email = '${email}'`);

        console.log("userid: ", userid.rows[0].userid);

        res.locals.userid = userid.rows[0].userid;




        return next()
    } catch (error) {

    }

    return next(error)

}


module.exports = googleController;