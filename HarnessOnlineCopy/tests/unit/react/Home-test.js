import {expect} from 'chai';
import {mount, render, shallow} from 'enzyme';
import jsdomify from 'jsdomify';
import proxyquire from 'proxyquire';
import React from 'react';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';

import Home from '../../../src/common/react/Home';
import reducers from '../../../src/common/redux/reducers';

proxyquire.noPreserveCache();

describe('<Home/>', () => {
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
    it('should render 3 buttons', () => {
      const state = {};
      const reduxStore = createStore(
        reducers,
        state,
        applyMiddleware(thunk)
      );
      const element = <Home store={reduxStore}/>;
      const wrapper = render(element);

      expect(wrapper.find('button')).to.have.length(3);
    });
  });

  describe('button functionality', () => {
    it('first button should increment count', () => {
      // const state = {};
      // const reduxStore = createStore(
      //   combinedReducers,
      //   state,
      //   applyMiddleware(thunk)
      // );
      // const element = <Home store={reduxStore}/>;
      // const wrapper = render(element);
      //
      // wrapper.find('button').get(0).simulate('click');
    });

    it('second button should decrement count', () => {
      // const state = {};
      // const reduxStore = createStore(
      //   combinedReducers,
      //   state,
      //   applyMiddleware(thunk)
      // );
      // const element = <Home store={reduxStore}/>;
      // const wrapper = render(element);
      //
      // wrapper.find('button').get(1).simulate('click');
    });

    it('third button should toggle count', () => {
      // const state = {};
      // const reduxStore = createStore(
      //   combinedReducers,
      //   state,
      //   applyMiddleware(thunk)
      // );
      // const element = <Home store={reduxStore}/>;
      // const wrapper = render(element);
      //
      // wrapper.find('button').get(2).simulate('click');
    });
  });
});
