/* eslint-disable
  no-unused-expressions,
  react/no-multi-comp
*/
import React from 'react';
import {expect} from 'chai';
import {mount, shallow} from 'enzyme';
import jsdomify from 'jsdomify';
import proxyquire from 'proxyquire';
import {StaticRouter} from 'react-router';
import {Route, Switch} from 'react-router-dom';

const FakeErrorPage = () => {
  return <p>Err</p>;
};
const FakeHomePage = () => {
  return <p>Home</p>;
};
const MockReactRoutes = proxyquire
  .noCallThru()
  .load('../../../src/common/react/routes', {
    './Error': FakeErrorPage,
    './Home': FakeHomePage
  }).ReactRoutes;

proxyquire.noPreserveCache();

describe('<ReactRoutes/>', () => {
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
    it('should render <Switch/>', () => {
      const element = <MockReactRoutes/>;
      const wrapper = shallow(element);

      expect(wrapper.find(Switch)).to.have.length(1);
    });

    it('should map the config and correctly render <Route/>\'s', () => {
      const element = <MockReactRoutes/>;
      const wrapper = shallow(element);

      expect(wrapper.find(Route)).to.have.length(2);
    });

    it('bad route, should contain the ErrorPage', () => {
      const context = {};
      const element = (
        <StaticRouter context={context} location={'/hello'}>
          <MockReactRoutes/>
        </StaticRouter>
      );
      const wrapper = mount(element);

      expect(wrapper.find(FakeErrorPage)).to.have.length(1);
    });

    it('route /, should return the HomePage', () => {
      const context = {};
      const element = (
        <StaticRouter context={context} location={'/'}>
          <MockReactRoutes/>
        </StaticRouter>
      );
      const wrapper = mount(element);

      expect(wrapper.find(FakeHomePage)).to.have.length(1);
    });
  });
});
