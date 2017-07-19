import _ from 'lodash';
import HttpStatus from 'http-status-codes';
import proxyquire from 'proxyquire';
import request from 'supertest';

proxyquire.noCallThru();
proxyquire.noPreserveCache();

const FakeRender = (req, res) => {
  return res.send({url: res.url});
};

const mockServer = proxyquire
  .noCallThru()
  .load('../../../src/server/server', {
    './middleware/renderReact': FakeRender
  }).default;

describe('server', () => {
  it('should call render function', done => {
    request(mockServer)
      .get('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(body => {
        return _.isNil(body.url) && body.url === '/';
      })
      .expect(HttpStatus.OK, done);
  });
});
