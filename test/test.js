const request = require('supertest')
const app = require('../index.js')

const objectToTest = {
      "_id": "65cfd9f6df9a62d18fb22830",
      "id": 94321,
      "name": "Cristiano",
      "lastname": "Ronaldo",
      "email": "cr7siuuu@gmail.com",
      "password": "$2b$10$oIjPeaMZCbiLrZl3Ahz4tu4b1aihtRewCNSm.apBgwAIuRE/0vG2S",
      "__v": 0,
      "avatar": "upload/1708391102711-salah.jpeg"
    }

let userId;
let token; 

 /*
describe('GET /', () => {
  it('responds with status 200', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
  })

  it('reponds hello world', async () => {
    const res = await request(app).get('/');
    expect(res.text).toBe('Hello world');
  })
})
*/

/* METODO GET TRAER USUARIOS */
/*
describe('GET /user', () => {
  it('responds with status 200', async () => {
    const res = await request(app).get('/user');
    expect(res.status).toBe(200)
  })

  it('responds with an array Object that contains an users', async () => {
    const res = await request(app).get('/user');

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toEqual(expect.arrayContaining([objectToTest]))
  })
})
*/


/* METODO GET, TRAER USUARIO ESPECIFICO */
/*
describe('GET /user/:id', () => {
  it('responds with an Objectthat contains an specific user', async () => {
    const res = await request(app).get('/user/' + userId);
    expect(res.status).toBe(200);
    expect(typeof res.body === "object").toBe(true);
    expect(res.body).toStrictEqual(objectToTest)
  })
})
*/


/* METODO POST, INSERTAR USUARIO */

describe('POST /user', () => {
  it('create a new user in tje DB and response with the data', async () => {

    const res = await request(app).post('/user').send(objectToTest)

    userId = res.body._id;
    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty('_id')
    expect(res.body.name).toBe(objectToTest.name)
    expect(res.body.lastname).toBe(objectToTest.lastname)
    expect(res.body.email).toBe(objectToTest.email)
  })
})

describe('POST /login', () => {
    it('Success login with email and password', async () => {        

        const response = await request(app).post('/login').send(objectToTest)

        token = response.body.token;
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('token')
        expect(response.body.status).toBe("success")
    })

    it('Error login with email and password', async () => {
        const user = {
            "email": "lucia-pardo10@correo.com",
            "password": "UsuarioDePrueba1111"
        }

        const response = await request(app).post('/login').send(user)

        expect(response.statusCode).toBe(401)
        expect(response.body).not.toHaveProperty('token')
        expect(response.body.status).toBe("error")
    })
})


describe('POST /delete', () => {
    it('Success delete with _id', async () => {        
        const response = await request(app).delete('/user/'+ userId)
                                        .set('Authorization', 'Bearer ' + token)
        expect(response.statusCode).toBe(200)
        expect(response.body.status).toBe("success")
    })
})
