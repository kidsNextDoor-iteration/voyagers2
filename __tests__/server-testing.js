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

    describe('Internal Routing Testing', () => {

        describe("test: app.get('/')", () => {

            let readableHTML;
            beforeAll(() => {
                //read html file into buffer
                readableHTML = fs.readFileSync(htmlfile);
            });
            
            it('should have the correct headers and status code', async () => {
                return request(server)
                    .get('/')
                    .expect('Content-Type', /text\/html/)
                    .expect(200)
            })
            //TODO: currently this test confirms that the response file contains the same data as the site's served html file, but it doesn't confirm that they are identical
            //The response file could contain additional data
            it('should return the site\'s main html file', async () => {
                const response = await request(server).get('/').responseType('blob');
                
                const responseBuffer = new Int8Array(response.body);
                const htmlFileBuffer = new Int8Array(readableHTML);

                for (let i = 0; i < responseBuffer.length; i++) {
                    expect(htmlFileBuffer.includes(responseBuffer[i]));
                }
                
            })
        
        })


    });

        describe("test: app.post('/internal/signin')", () => {

            const failData = JSON.stringify({ email: 'hello@test.com', password: 'password' })


            it('should fail based on invalid user', () => {


               
            })




        });

        describe("test: app.post('/internal/signup')", () => {


        });

        describe("test: app.get('/internal/signout')", () => {


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

