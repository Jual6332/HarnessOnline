import _ from 'lodash';
import HttpStatus from 'http-status-codes';
import proxyquire from 'proxyquire';
import request from 'supertest';
import express from 'express';

import healthController from '../../../src/server/controllers/healthController';

proxyquire.noCallThru();

const testServer = express();

testServer.get('/', healthController);

describe('Function healthController', () => {
  it('should send information about the app', done => {
    request(testServer)
      .get('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(body => {
        return _.isNil(body.env) && _.isNil(body.version);
      })
      .expect(HttpStatus.OK, done);
  });
});
