import {expect} from 'chai';

import buildRequest from '../../../src/common/utilities/buildRequest';

describe('Function buildRequest', () => {

  it('should output default url', () => {
    const {url} = buildRequest();

    expect(url).to.equal('http://localhost/');
  });

  it('should output a completely custom url', () => {
    const customQuery = {
      hello: 'world'
    };
    const reqObj = {
      protocol: 'https',
      hostname: 'cool.com',
      port: '8080',
      path: ['one', 'two'],
      query: customQuery
    };
    const {url, query} = buildRequest(reqObj);

    expect(url).to.equal('https://cool.com:8080/one/two?&hello=world');
    expect(query).to.deep.equal(customQuery);
  });

  it('should return a relative url', () => {
    const customQuery = {
      hello: 'world'
    };
    const reqObj = {
      protocol: '',
      hostname: '',
      path: ['one', 'two'],
      query: customQuery
    };
    const {url, query} = buildRequest(reqObj);

    expect(url).to.equal('/one/two?&hello=world');
    expect(query).to.deep.equal(customQuery);
  });
});
