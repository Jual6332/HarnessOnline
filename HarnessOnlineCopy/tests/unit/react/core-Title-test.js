import {expect} from 'chai';
import {mount} from 'enzyme';
import jsdomify from 'jsdomify';
import proxyquire from 'proxyquire';
import React from 'react';

import Title from '../../../src/common/react/core/Title';

proxyquire.noPreserveCache();

describe('<Title/>', () => {
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
    it('should render a paragraph tag', () => {
      const element = <Title text='Hello World'/>;
      const wrapper = mount(element);

      expect(wrapper.find('p')).to.have.length(1);
    });
  });
});
