import {expect} from 'chai';
import {shallow} from 'enzyme';
import jsdomify from 'jsdomify';
import proxyquire from 'proxyquire';
import React from 'react';

import Error from '../../../src/common/react/Error';

proxyquire.noPreserveCache();

describe('<Error/>', () => {
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
    it('should render a title tag', () => {
      const element = <Error/>;
      const wrapper = shallow(element);

      expect(wrapper.find('title')).to.have.length(1);
    });
  });
});
