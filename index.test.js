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
            name: 'Richard',
            instrument: 'Voice'
        });
        expect(response.body[(response.body.length) - 1]).toEqual(expect.objectContaining({
            name: 'Richard',
            instrument: 'Voice'
          }));
        expect(response.body.length).toEqual(musicianCount + 1);
    });
//....................................................................
    test('PUT /musicians/:id updates array with provided value',async()=>{
        const response = 
        await request(app).put('/musicians/1').send({
            instrument: 'Piano'
        });
        const foundmusician = await Musician.findByPk(1);
        expect(response.body[0]).toEqual(expect.objectContaining({
            "instrument": "Piano"
          }));
        expect(foundmusician.instrument).toBe('Piano');
    });
//...................................................................................
    test('DELETE /musicians/:id deletes musician with the provided id',async()=>{
        const response = 
        await request(app).delete('/musicians/2');
        const foundmusician = await Musician.findByPk(2);
        expect(response.body.length).toBe(musicianCount - 1);
        expect(foundmusician).toBeNull();
    });

    test('POST returns error when name is empty', async()=>{
        const response = await request(app).post('/musicians')
        .send({name: '',
            instrument: 'Piano'
        });
        expect(response.statusCode).toBe(400);
        // expect(response.body.error).toHaveLength(1);
        //we cannot keep this expect condition because
        //response.body.error length will be 2 now
        //since we added another condition to post
        //where length has to be min2 and max 20
        //so it will return another error object for
        //both conditions not being fulfilled.
    });

    test('POST returns error when instrument is empty', async()=>{
        const response = await request(app).post('/musicians')
        .send({name: 'Herbie Hancock',
            instrument: ''
        });
        expect(response.statusCode).toBe(400);
        // expect(response.body.error).toHaveLength(1);
    });

    test('POST returns error when name is too short', async()=>{
        const response = await request(app).post('/musicians')
        .send({name: 'H',
            instrument: 'Bass guitar'
        });
        expect(response.statusCode).toBe(400);
    });

    test('POST returns error when name is too long', async()=>{
        const response = await request(app).post('/musicians')
        .send({name: 'Herberthannnnnnnnnnnnnn',
            instrument: 'Bass guitar'
        });
        expect(response.statusCode).toBe(400);
    });

    test('POST returns error when instrument is too short', async()=>{
        const response = await request(app).post('/musicians')
        .send({name: 'Herbie',
            instrument: 'B'
        });
        expect(response.statusCode).toBe(400);
    });

    test('POST returns error when instrument is too long', async()=>{
        const response = await request(app).post('/musicians')
        .send({name: 'Herbert',
            instrument: 'Bass guitar and percussions and voice etc'
        });
        expect(response.statusCode).toBe(400);
    });

    
    test('PUT /:id returns error when name is too short', async()=>{
        const response = await request(app).put('/musicians/2')
        .send({name: 'H',
            instrument: 'Bass guitar'
        });
        expect(response.statusCode).toBe(400);
    });

    test('PUT /:id returns error when name is too long', async()=>{
        const response = await request(app).put('/musicians/2')
        .send({name: 'Herberthannnnnnnnnnnnnn',
            instrument: 'Bass guitar'
        });
        expect(response.statusCode).toBe(400);
    });

    test('PUT /:id returns error when instrument is too short', async()=>{
        const response = await request(app).put('/musicians/2')
        .send({name: 'Herbie',
            instrument: 'B'
        });
        expect(response.statusCode).toBe(400);
    });

    test('PUT /:id returns error when instrument is too long', async()=>{
        const response = await request(app).put('/musicians/2')
        .send({name: 'Herbert',
            instrument: 'Bass guitar and percussions and voice etc'
        });
        expect(response.statusCode).toBe(400);
    });

});
