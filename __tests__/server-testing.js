const request = require('supertest');
const fs = require('fs');
const path = require('path');
const db = require('../server/model.js');
const express = require('express');
const testJsonFile = path.resolve('./test.json');

const htmlfile = path.resolve('./client/index.html');

const app = express();

const server = 'http://localhost:3000';



describe('Server Route Testing via Supertest', () => {


    // it('should pass a basic test', ()=>{
    //     return request(server)
    //     .get('/')
    //     .expect('Content-Type', /application\/json/)
    //     .expect(200)

    // })
    describe('Internal Routing Testing', () => {

        describe("test: app.get('/')", () => {

            const readableHTML = fs.readFileSync(htmlfile).toString();

            it('should return a basic html file', () => {
                return request(server)
                    .get('/')
                    .expect('Content-Type', /text\/html/)
                    .expect(200)
                    .then(



                        response => {
                            console.log('response text, ', response.text)
                            console.log('html text, ', readableHTML)
                            expect(response.text).toContain(readableHTML)
                        })
            })


        });

        describe("test: app.post('/signin')", () => {

            const failData = JSON.stringify({ email: 'hello@test.com', password: 'password' })


            it('should fail based on invalid user', () => {


                .post()
            })




        });

        describe("test: app.post('/signup')", () => {


        });

        describe("test: app.get('/signout')", () => {


        });



    });

    describe('Trip Routing Testing', () => {

        describe("test: app.post('/addTrips')", () => {


        });

        describe("test: app.get('/getTrips')", () => {


        });

        describe("test: app.patch('/editTrip')", () => {


        });

        describe("test: app.get('/getTripDetails')", () => {


        });

        describe("test: app.delete('/deleteTrip')", () => {


        });



    })

    describe('Image API Route Testing', () => {


        describe("test: app.get('/api/getImages')", () => {


        });

        describe("test: app.post('/api/uploadimage')", () => {


        });

        describe("test: app.delete('/api/deleteImage')", () => {


        });





    })


    describe('Client React Router Route Testing', () => {


        describe("test: app.get('/home')", () => {


        });


        describe("test: app.get('/signin')", () => {


        });

        describe("test: app.get('/signup')", () => {


        });

        describe("test: app.get('/addtrip')", () => {


        });

        describe("test: app.get('/imageDemo')", () => {


        });

        describe("test: app.get('/trips')", () => {


        });

        describe("test: app.get('/moodboard')", () => {


        });

        describe("test: app.get('/collaborations')", () => {


        });


    })




})

