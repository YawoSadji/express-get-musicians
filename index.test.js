// install dependencies
// const { execSync } = require('child_process');
// execSync('npm install');
// execSync('npm run seed');

const request = require("supertest");
const Musician = require('./models/index')
const app = require('./src/app');
const syncSeed = require("./seed");
let musicianCount;

beforeEach(async()=>{
    await syncSeed();
    const allMusicos = await Musician.findAll();
    musicianCount = allMusicos.length;
});
    
describe('musicians tests', ()=>{

    test('GET /musicians returns status code 200', async()=>{
        const response = await request(app).get('/musicians');
        expect(response.statusCode).toBe(200);
    });
    test('GET /musicians returns array of musicians', async()=>{
        const response = await request(app).get('/musicians');
        expect(response.body).toBeInstanceOf(Array);
    });
    test('GET /musicians returns correct number of musicians', async()=>{
        const response = await request(app).get('/musicians');
        expect(response.body.length).toBe(musicianCount);
    });
    test('GET /musicians returns the correct musician data',async()=>{
        const response = await request(app).get('/musicians');
        expect(response.body[0]).toEqual(expect.objectContaining({
            name: 'Mick Jagger',
            instrument: 'Voice'
          }));
    });

    test('GET /musicians/:id returns the correct musician',async()=>{
        const response = await request(app).get('/musicians/1');
        expect(response.body).toEqual(expect.objectContaining({
            id: 1,
            name: 'Mick Jagger',
            instrument: 'Voice'
          }));
    });

    test('POST /musicians returns updated array with new value',async()=>{
        const response = 
        await request(app).post('/musicians').send({
            name: 'Richard Bona',
            instrument: 'Voice and Bass guitar'
        });
        expect(response.body[(response.body.length) - 1]).toEqual(expect.objectContaining({
            name: 'Richard Bona',
            instrument: 'Voice and Bass guitar'
          }));
        expect(response.body.length).toEqual(musicianCount + 1);
    });

    test('PUT /musicians/:id updates array with provided value',async()=>{
        const response = 
        await request(app).put('/musicians/2').send({
            instrument: 'Piano'
        });
        const foundmusician = await Musician.findByPk(2);
        expect(response.body[1]).toEqual(expect.objectContaining({
            instrument: 'Piano'
          }));
        expect(foundmusician.instrument).toBe('Piano');
    });

    test('DELETE /musicians/:id deletes musician with the provided id',async()=>{
        const response = 
        await request(app).delete('/musicians/2');
        const foundmusician = await Musician.findByPk(2);
        expect(response.body.length).toBe(musicianCount - 1);
        expect(foundmusician).toBeNull();
    });


});

// describe('./band endpoint', () => {
//     // Write your tests here
//     test('Testing band endpoint', async()=>{
//         const response = await request(app).get('/band');
//         expect(response.statusCode).toBe(200);
//     });
//     test('receiving data from band endpoint', async(req,res)=>{
//         const response = await request(app).get('/band');
//         const responseData = JSON.parse(response.txt);
//         expect(responseData).toBeInstanceOf(Array);
//         expect(responseData.length).toBeGreaterThan(0);
//         responseData.array.forEach(band => {
//             expect(band).toHaveProperty('name');
//             expect(musician).toHaveProperty('genre');
//         });
    
//     });

// });