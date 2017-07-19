import {expect} from 'chai';
import {mount} from 'enzyme';
import jsdomify from 'jsdomify';
import proxyquire from 'proxyquire';
import React from 'react';

import {Paragraph} from '../../../src/common/react/core/Elements';

proxyquire.noPreserveCache();

describe('Global elements', () => {
  before(() => {
    jsdomify.create();
  });

  beforeEach(() => {
    jsdomify.clear();
  });

  after(() => {
    jsdomify.destroy();
  });

  describe('<Paragraph/>', () => {
    it('should render a paragraph tag', () => {
      const element = <Paragraph>Hello</Paragraph>;
      const wrapper = mount(element);

      expect(wrapper.find('p')).to.have.length(1);
    });
  });
});
