// install dependencies
const { execSync } = require('child_process');
execSync('npm install');
execSync('npm run seed');

const request = require("supertest");
const { db } = require('./db/connection');
const { Musician } = require('./models/index')
const app = require('./src/app');
const seedMusician = require("./seedData");


describe('./musicians endpoint', ()=>{
    // Write your tests here
    test('Testing musicians endpoint', async()=>{
        const response = await request(app).get('/musicians');
        expect(response.statusCode).toBe(200);
    });
    test('receiving data from musicians endpoint', async(res,req)=>{
        const response = await request(app).get('/musicians');
        const responseData = JSON.parse(response.txt);
        expect(responseData).toBeInstanceOf(Array);
        expect(responseData.length).toBeGreaterThan(0);
        responseData.array.forEach(musician => {
            expect(musician).toHaveProperty('id');
            expect(musician).toHaveProperty('name');
            expect(musician).toHaveProperty('instrument');
        });
});
});
    


describe('./band endpoint', () => {
    // Write your tests here
    test('Testing band endpoint', async()=>{
        const response = await request(app).get('/band');
        expect(response.statusCode).toBe(200);
    });
    test('receiving data from band endpoint', async(res,req)=>{
        const response = await request(app).get('/band');
        const responseData = JSON.parse(response.txt);
        expect(responseData).toBeInstanceOf(Array);
        expect(responseData.length).toBeGreaterThan(0);
        responseData.array.forEach(band => {
            expect(band).toHaveProperty('name');
            expect(musician).toHaveProperty('genre');
        });
    
    });

});