const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const app = require('./app'); 

describe('API Unit Tests', () => {
  it('should fetch data', (done) => {
    request(app)
      .get('/api/data')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Data Fetched Successfully!');
        expect(res.body.status).to.equal('ok');
        expect(res.body.data).to.be.an('array');
        done();
      });
  });

  it('should create data', (done) => {
    request(app)
      .post('/api/upload-data')
      .send({
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone: '9037002597',
        city: 'New York',
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Record created successfully');
        expect(res.body.status).to.equal('ok');
        done();
      });
  });

  it('should update data', (done) => {
    request(app)
      .put('/api/data/1') 
      .send({
        name: 'Updated Name',
        email: 'updated@example.com',
        phone: '9037002597',
        city: 'Updated City',
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Record updated successfully');
        expect(res.body.status).to.equal('ok');
        done();
      });
  });

  it('should delete data', (done) => {
    request(app)
      .delete('/api/data/1') 
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Record deleted successfully');
        expect(res.body.status).to.equal('ok');
        done();
      });
  });
});
