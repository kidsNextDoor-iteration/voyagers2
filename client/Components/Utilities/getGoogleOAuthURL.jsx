import React from 'react';

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

    const queryString = new URLSearchParams(options)

    return `${rootURL}?${queryString.toString()}`

}