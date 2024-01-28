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
                    .expect(200);
            });
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
                
            });
        });

    });

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

    let goodResponse;
    let goodDbResult;
    let testEmail;
    let testFirstName;
    let testLastName;
    beforeAll(async () => {
        goodResponse = await request(server).post('/internal/signup').send(passingBody);

        testEmail = passingBody.email;
        testFirstName = passingBody.firstname;
        testLastName = passingBody.lastname;
        let values = [testEmail];
        let queryString = `
        SELECT * FROM users WHERE email = $1;
        `;
        goodDbResult = await db.query(queryString, values);
    });

    afterAll(async () => {
        const values = [passingBody.email];
        const queryString = `
        DELETE FROM users WHERE email = $1;
        `;
        db.query(queryString, values)
        //close pool after
        .then(() => db.end());
    });

    describe('Internal Route Testing', () => {

        describe("test: app.post('/internal/signup')", () => {

            it('should throw a 400 error if user fields are missing', async () => {
                let badResponse = await request(server).post('/internal/signup').send(missingLastNameBody);
                expect(badResponse.status).toBe(400);
                badResponse = await request(server).post('/internal/signup').send(missingFirstNameBody);
                expect(badResponse.status).toBe(400);
            });

            it('should return a 302 status code for redirect to /signin', async () => {
                expect(goodResponse.status).toBe(302);
                expect(goodResponse.res.headers.location).toBe('/signin');
            });

            it('should add user to db', async () => {
                expect(goodDbResult.rows.length).toBe(1);
                expect(goodDbResult.rows[0].email).toBe(testEmail);
                expect(goodDbResult.rows[0].firstname).toBe(testFirstName);
                expect(goodDbResult.rows[0].lastname).toBe(testLastName);
            });


            it('should set cookie with userid, Path, and HttpOnly', async () => {
                expect(goodResponse.res.headers['set-cookie'][0]).toBe(`userid=${goodDbResult.rows[0].userid}; Path=/; HttpOnly`);                
            });

            it('should throw 400 error if email already exists in db', async () => {
                const badResponse = await request(server).post('/internal/signup').send(passingBody);
                expect(badResponse.status).toBe(400);
            });

        });

        describe("test: app.post('/internal/signin')", () => {

            let goodResult;
            beforeAll(async () => {
                goodResult = await request(server).post('/internal/signin').send(passingBody);
            });

            it('should not throw an error based on valid user', () => {
                expect(goodResult.error).toBe(false);
            });

            it('should return 302 status code', () => {
                expect(goodResult.statusCode).toBe(302);
            });
            
            it('should redirect to /trips', () => {
                expect(goodResult.res.headers.location).toBe('/trips');
            });

            it('should set cookie with userid, Path, and HttpOnly', async () => {
                expect(goodResult.res.headers['set-cookie'][0]).toBe(`userid=${goodDbResult.rows[0].userid}; Path=/; HttpOnly`);                
            });

            it('should return 500 status code and error based on invalid user', async () => {
                const invalidUser = {
                    firstname: 'invalidUserFirstName',
                    lastname: 'inValidUserLastName',
                    email: 'invalidUser@test.com',
                    password: 'invalidUserP@ssword1!' 
                };
                const invalidUserResponse = await request(server).post('/internal/signin').send(invalidUser);
                expect(invalidUserResponse.statusCode).toBe(500);
                expect(invalidUserResponse.serverError).toBe(true);
            });


        });



        describe("test: app.get('/internal/signout')", () => {

            let goodResult;
            beforeAll(async () => {
                goodResult = await request(server).get('/internal/signout');
            });

            it('should return 302 status code', () => {
                expect(goodResult.statusCode).toBe(302);
            });

            it('should redirect to /home', () => {
                expect(goodResult.res.headers.location).toBe('/home');
            });

            //TODO: look for a more durable way to test this
            it('should clear userid cookie', () => {
                const userIdCookie = goodResult.res.headers['set-cookie'][0].split(';');
                expect(userIdCookie[0]).toBe('userid=');                
            });

        });

    });


    describe('Trip Routing Testing', () => {

        const startDate = new Date();
        const endDate = new Date ();
        //make end date 1 month later
        endDate.setMonth(endDate.getMonth() + 1);

        const validTrip = {
            city: 'test city',
            brand: 'test brand',
            description: 'test description',
            startDate: startDate.toLocaleDateString(),
            endDate: endDate.toLocaleDateString(),
            idea: 'test idea'
        };

        let response;
        beforeAll(async () => {
            response = await request(server).post('/trip/addTrip').send(validTrip);
        });

        let deleteResponse;
        afterAll(async () => {
            const addedTripId = response.body[0].tripid;
            const values = [addedTripId];
            const queryString = `
            DELETE FROM trips WHERE tripid = $1
            `;
            deleteResponse = await db.query(queryString, values);
        });

        describe("test: app.post('/addTrip')", () => {

            it('should return 200 status code', () => {
                expect(response.status).toBe(200);
            });

            it('should return added trip', () => {
                //date comes back from db as Z strings, so convert back to same format as input. this will maintain the actual date for valid comparison
                const responseStartDate = new Date(response.body[0].startdate);
                const responseEndDate = new Date(response.body[0].enddate);
                const validResponse = {...response.body[0], startdate: responseStartDate.toLocaleDateString(), enddate: responseEndDate.toLocaleDateString()};
                //passing in startDate and endDate in camel case, but db returns without camel case. removing camel case from input keys to match db structure.
                const validInput = {
                    city: validTrip.city,
                    brand: validTrip.brand,
                    description: validTrip.description,
                    startdate: validTrip.startDate,
                    enddate: validTrip.endDate,
                    idea: validTrip.idea
                };
                console.log('testing: ', expect.objectContaining(validInput));
                expect(validResponse).toEqual(expect.objectContaining(validInput));
            });

            it('should only return one added trip', () => {
                expect(response.body.length).toBe(1);
            });
            

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

