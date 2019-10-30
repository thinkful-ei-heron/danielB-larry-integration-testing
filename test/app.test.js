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
})

describe('GET /app GENRE tests', () => {
  it('should fail when given a wrong param', () => {
    return supertest(app)
      .get('/apps')
      .query({ genre: 'happy' })
      .expect(404, "Invalid genre")
  })
  it('should return return query even if capitalization is wrong', () => {
    return supertest(app)
      .get('/apps')
      .query({ genre: "AcTIon" })
      .then(res => {
        expect(res.body).to.be.an('array')
        res.body.forEach(obj => {
          expect(obj).to.have.any.keys('Genres')
          expect(obj["Genres"]).to.equal('Action')
        })
      })
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
  it('should return an array of puzzle // genre=puzzle', () => {
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

describe('GET /app SORT tests', () => {
  it('should fail when giving a wrong param', () => {
    return supertest(app)
      .get('/apps')
      .query({ sort: 'name' })
      .expect(400, 'Choose to sort by "Rating" or "App"')
  })
  it('should sort by app', () => {
    const results = []
    return supertest(app)
      .get('/apps')
      .query({ sort: "App" })
      .then(res => {
        res.body.forEach(obj => {
          results.unshift(obj["App"])
        })
        let compareTo = [...results].sort()
        expect(results).to.deep.eql(compareTo);
      })
  })
  it('should sort by rating', () => {
    const results = []
    return supertest(app)
      .get('/apps')
      .query({ sort: "Rating" })
      .then(res => {
        res.body.forEach(obj => {
          results.unshift(obj["Rating"])
        })
        let compareTo = [...results].sort()
        expect(results).to.deep.eql(compareTo);
      })
  })
  it('should return query even if capitalization is wrong', () => {
    return supertest(app)
      .get('/apps')
      .query({ sort: "rAtInG" })
      .then(res => {
        expect(res.body).to.be.an('array')
        res.body.forEach(obj => {
          expect(obj).to.have.any.keys('Rating')
        })
      })
  })
})








