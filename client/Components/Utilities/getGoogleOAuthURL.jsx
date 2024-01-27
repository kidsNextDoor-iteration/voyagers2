import React from 'react';


// import dotenv from 'dotenv'

// dotenv.config();



export default function getGoogleOAuthURL() {




    const rootURL = 'https://accounts.google.com/o/oauth2/v2/auth';

    const options = {
        redirect_uri: 'http://localhost:3000/google/sessions',
        client_id: '659978239798-3983e15hiqvc96ip75uqbkqkeuo9o7ec.apps.googleusercontent.com',
        access_type: 'offline',
        response_type: 'code',
        prompt: 'consent',
        scope: 'https://www.googleapis.com/auth/userinfo.profile' + ' ' + 'https://www.googleapis.com/auth/userinfo.email'
    }

    console.log('Google URL Options: ', options)

    const queryString = new URLSearchParams(options)

    console.log('Google URL Query String: ', queryString)

    return `${rootURL}?${queryString.toString()}`








}