const { expect } = require('chai')
const app = require('../app')
const supertest = require('supertest')


describe('GET /apps', () => {
  it('should return 200', () => {
    return supertest(app)
      .get('/apps')
      .expect(200)
  })
  it('should return an array with 20 items', () => {
    return supertest(app)
      .get('/apps')
      .then(res => {
        expect(res.body).to.be.an('array')
        expect(res.body).to.have.lengthOf(20)
      })
  })
  it('should error if choosing incorrect genre', () => {
    return supertest(app)
      .get('/apps')
      .query({genre: 'fantasy'})
      .expect(404, 'Invalid genre')
  })
  it('should return an array of action items when looking for genre=action', () => {
    return supertest(app)
      .get('/apps')
      .query({ genre: "Action" })
      .then(res => {
        expect(res.body).to.be.an('array')
        res.body.forEach(obj => {
          expect(obj).to.have.any.keys('Genres')
          expect(obj["Genres"]).to.equal('Action')
        })
      })
  })
  it('should resturn an array of puzzle // genre=puzzle', () => {
    return supertest(app)
      .get('/apps')
      .query({ genre: "Puzzle" })
      .then(res => {
        res.body.forEach(obj => {
          expect(obj).to.have.any.keys("Genres")
          expect(obj["Genres"]).to.equal('Puzzle')
        })
      })
  })

})
