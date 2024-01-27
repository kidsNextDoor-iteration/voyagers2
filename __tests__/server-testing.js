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

    describe('Root path fetch', () => {

        describe("test: app.get('/')", () => {
            
            it('should have the correct headers and status code', async () => {
                return request(server)
                    .get('/')
                    .expect('Content-Type', /text\/html/)
                    .expect(200)
            })
            //TODO: currently this test confirms that the response file contains the same data as the site's served html file, but it doesn't confirm that they are identical
            //The response file could contain additional data
            it('should return the site\'s main html file', async () => {
                //read html file into buffer
                const readableHTML = fs.readFileSync(htmlfile);

                const response = await request(server).get('/').responseType('blob');
                
                const responseBuffer = new Int8Array(response.body);
                const htmlFileBuffer = new Int8Array(readableHTML);

                for (let i = 0; i < responseBuffer.length; i++) {
                    expect(htmlFileBuffer.includes(responseBuffer[i]));
                }
                
            })
        })

    });

    describe('Internal Routing Testing', () => {

        const passingBody = {
            firstname: 'testUser',
            lastname: 'testUserLastName',
            email: 'testUserEmail@test.com',
            password: 'P@ssword1!' 
        };
        const missingFirstNameBody = {
            lastname: 'testUserLastName',
            email: 'testUserEmail@test.com',
            password: 'P@ssword1!' 
        };
        const missingLastNameBody = {
            firstname: 'testUser',
            email: 'testUserEmail@test.com',
            password: 'P@ssword1!' 
        };


        afterAll(async () => {
            const values = [passingBody.email];
            const queryString = `
            DELETE FROM users WHERE email = $1
            `;
            db.query(queryString, values)
            //close pool after
            .then(() => db.end());
        });

        describe("test: app.post('/internal/signup')", () => {

            it('should throw a 400 error if user fields are missing', async () => {
                let badResponse = await request(server).post('/internal/signup').send(missingLastNameBody);
                // console.log('badResponse1:', badResponse)
                expect(badResponse.status).toBe(400);
                badResponse = await request(server).post('/internal/signup').send(missingFirstNameBody);
                // console.log('badResponse2:', badResponse)
                expect(badResponse.status).toBe(400);
  
                
            })

            it('should return a 302 status code for redirect to /signin', async () => {
                let goodResponse = await request(server).post('/internal/signup').send(passingBody);
                expect(goodResponse.status).toBe(302);
            })

            it('should not throw a 500 error', async () => {
                // let goodResponse = await request(server).post('/internal/signup').send(passingBody);
                // expect(goodResponse.status).not.toBe(500);
                // expect(goodResponse.status).toBe(200);
                // console.log('goodResponse: ', goodResponse);
                
            })

          //should throw error and return status 400 if email already exists in db
          //should redirect to '/signin'
          //should add cookie (key = userid) with created userId


        });

        describe("test: app.post('/internal/signin')", () => {
  
            const failData = JSON.stringify({ email: 'hello@test.com', password: 'password' })
        

            it('should fail based on invalid user', () => {


               
            })




        });



        describe("test: app.get('/internal/signout')", () => {


        });

    })





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

