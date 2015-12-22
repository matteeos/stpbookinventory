var request = require('supertest');
var assert = require('assert');
var DBClient = require('./db');
var app = require('../app')(DBClient);

describe('POST /stock', function(){
  it('Respond with json', function(done){
    request(app)
      .post('/stock')
      .set('Accept', 'application/json')
      .send({ "isbn": "1", "count": "2" })
      .expect('Content-Type', /json/)
      .expect(function(res) {
        assert.equal(res.body.isbn,'1');
        assert.equal(res.body.count,'2');
      })
      .expect(200, done);
    });
})

describe('GET /stock/1', function(){
  it('Respond with json', function(done){
    request(app)
      .get('/stock/1')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, res){
        assert.equal(res.body.isbn,'1');
        assert.equal(res.body.count,'2');
        done();
      });
  });
});
