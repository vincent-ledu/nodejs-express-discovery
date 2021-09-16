const expect = require('chai').expect;
const request = require('supertest')
const app = require('../app')

describe('users endpoints', () => {
  it('should create a new user', async () => {
    const res = await request(app)
      .post('/users').send({username: "bob" })
    expect(res.statusCode).to.be.equals(201)
    expect(res.body).to.have.property('username')
  })
  it('should get the user created', async () => {
    await request(app)
      .post('/users')
      .send({
        username: "bob"
      })

    const res = await request(app)
      .get('/users')
    expect(res.statusCode).to.be.equals(200)
    expect(res.body).to.include.members(["bob"])
  })
})

describe('secret endpoints', () => {
  it("should not access to this endpoint", async () => {
    const res = await request(app)
      .get('/secret')
    expect(res.statusCode).to.be.equals(403)
  })
  it("should not access to this endpoint", async () => {
    const res = await request(app)
      .get('/secret')
      .set('secret', 'OK')

    expect(res.statusCode).to.be.equals(200)
  })
})

describe('delete a user', () => {
  it('should return 200 if user deleted exists', async ()=> {
    await request(app)
      .post('/users')
      .send({
        username: "bob"
      })
    const res = await request(app).delete('/users/1')

    expect(res.statusCode).to.be.equals(200)
  })
  it('should return 204 if deleted user doesnt exists', async () => {
    const res = await request(app).delete('/users/4233234234')

    expect(res.statusCode).to.be.equals(204)
  })
})