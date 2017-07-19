import _ from 'lodash';
import HttpStatus from 'http-status-codes';
import request from 'supertest';
import express from 'express';

import removeTrailingSlash from '../../../src/server/middleware/removeTrailingSlash';

const testServer = express();
const body = {hello: 'goodbye'};

testServer.use(removeTrailingSlash);

testServer.get('/hello', (req, res) => {
  res.status(HttpStatus.OK).json(body);
});

describe('Function removeTrailingSlash', () => {
  it('should not strip the trailing slash', done => {
    request(testServer)
      .get('/hello')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(resBody => {
        return _.isEqual(resBody, body);
      })
      .expect(HttpStatus.OK, done);
  });

  it('should strip the trailing slash and redirect', done => {
    request(testServer)
      .get('/hello/')
      .expect(HttpStatus.MOVED_PERMANENTLY, done);
  });
});
