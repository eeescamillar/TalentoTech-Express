const request = require('supertest'); // Libreria para probar APIs
const app = require('../index.js'); // importando todas las rutas

const objectToTest = {
  "address": "Tranversal 46 TEST",
  "city": "Bucaramanga",
  "state": "Santander",
  "size": 66,
  "type": "House",
  "zip_code": "434567",
  "rooms": 2,
  "bathrooms": 2,
  "parking": false,
  "price": 999999,
  "code": "ABUY2855",
}

let houseId;
/*
describe('GET /house', () => {
  it('responds with status 200', async () => {
    const response = await request(app).get('/house');
    expect(response.status).toBe(200);
  })

  it('responds with an array Object that contains an specific user', async () => {
    const response = await request(app).get('/house');
    expect(Array.isArray(response.body)).toBe(true);
  })
})
*/
describe('POST /house', () => {
  it('create a new house in the DB and response with the data', async () => {
    const response = await request(app).post('/house').send(objectToTest)
    houseId = response.body._id;

    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('_id')
    expect(response.body.address).toBe(objectToTest.address)
    expect(response.body.city).toBe(objectToTest.city)
    expect(response.body.state).toBe(objectToTest.state)
    expect(response.body.size).toBe(objectToTest.size)
    expect(response.body.type).toBe(objectToTest.type)
    expect(response.body.zip_code).toBe(objectToTest.zip_code)
    expect(response.body.rooms).toBe(objectToTest.rooms)
    expect(response.body.bathrooms).toBe(objectToTest.bathrooms)
    expect(response.body.parking).toBe(objectToTest.parking)
    expect(response.body.price).toBe(objectToTest.price)
    expect(response.body.code).toBe(objectToTest.code)
  })

  it('Error creating house', async () => {
    let jsonError = delete objectToTest.address;

    const response = await request(app).post('/house').send(jsonError)
    expect(response.statusCode).toBe(400);
    expect(response.body.status).toBe('error');
  })
})

describe('GET /house/:id', () => {

  it('responds with an Object that contains an specific house', async () => {
    const response = await request(app).get('/house/' + houseId);
    expect(response.status).toBe(200);
    expect(typeof response.body === "object").toBe(true);
    expect(response.body).toHaveProperty('_id')
    expect(response.body.address).toBe(objectToTest.address)
    expect(response.body.city).toBe(objectToTest.city)
    expect(response.body.state).toBe(objectToTest.state)
    expect(response.body.size).toBe(objectToTest.size)
    expect(response.body.type).toBe(objectToTest.type)
    expect(response.body.zip_code).toBe(objectToTest.zip_code)
    expect(response.body.rooms).toBe(objectToTest.rooms)
    expect(response.body.bathrooms).toBe(objectToTest.bathrooms)
    expect(response.body.parking).toBe(objectToTest.parking)
    expect(response.body.price).toBe(objectToTest.price)
    expect(response.body.code).toBe(objectToTest.code)
  })

  it('wrong id house', async () => {
    const response = await request(app).get('/house/' + houseId + 'aw3s4ed5rf6tgy');
    expect(response.statusCode).toBe(404)
    expect(response.body.status).toBe("error")
  })
})

describe('PATCH /house/:id', () => {
  it('responds with a specific object to update ', async () => {
    const updateObjectTest = {
      type: 'Chalet',
      rooms: 5,
      bathrooms: 6,
    }

    const response = await request(app).patch('/house/' + houseId).send(updateObjectTest)
    expect(response.status).toBe(200);
    expect(typeof response.body === "object").toBe(true);
    expect(response.body.result.type).toBe(updateObjectTest.type)
    expect(response.body.result.rooms).toBe(updateObjectTest.rooms)
    expect(response.body.result.bathrooms).toBe(updateObjectTest.bathrooms)
  })

  it('reponds with wrong update object', async () => {
    const updateWrongObjectTest = {
      parking: 'verdadero',
      price: 'dos millones de pesos'
    }
    const response = await request(app).patch('/house/' + houseId).send(updateWrongObjectTest)
    expect(response.statusCode).toBe(400)
    expect(response.body.status).toBe("error")
  })
})

describe('DELETE /house/:id', () => {

  it('responds with an Object that contains an specific house', async () => {
    const response = await request(app).get('/house/' + houseId);
    expect(response.status).toBe(200);
    expect(response.body.status).toBe("success")
  })

  it('wrong id house', async () => {
    const response = await request(app).get('/house/' + houseId + 'aw3s4ed5rf6tgy');
    expect(response.statusCode).toBe(404)
    expect(response.body.status).toBe("error")
  })
})

