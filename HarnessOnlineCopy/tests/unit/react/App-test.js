/* eslint-disable react/no-multi-comp */
import {expect} from 'chai';
import {mount} from 'enzyme';
import jsdomify from 'jsdomify';
import proxyquire from 'proxyquire';
import React from 'react';
import Helmet from 'react-helmet';

const FakeRoutes = () => {
  return <p>Routes</p>;
};

const MockApp = proxyquire
  .noCallThru()
  .load('../../../src/common/react/App', {
    './routes': {ReactRoutes: FakeRoutes},
    '../../assets/favicon.png': 'Favicon'
  }).default;

proxyquire.noPreserveCache();

describe('<App/>', () => {
  before(() => {
    jsdomify.create();
  });

  beforeEach(() => {
    jsdomify.clear();
  });

  after(() => {
    jsdomify.destroy();
  });

  describe('rendering', () => {
    it('should render <Helmet/>', () => {
      const element = <MockApp/>;
      const wrapper = mount(element);

      expect(wrapper.find(Helmet)).to.have.length(1);
    });

    it('should render <ReactRoutes/>', () => {
      const element = <MockApp/>;
      const wrapper = mount(element);

      expect(wrapper.find(FakeRoutes)).to.have.length(1);
    });
  });
});
