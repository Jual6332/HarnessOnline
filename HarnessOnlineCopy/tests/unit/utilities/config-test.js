import {expect} from 'chai';

import config from '../../../src/common/config/config';

describe('Function config', () => {

  it('should default to dev config', () => {
    const result = config();

    expect(result.env).to.deep.equal('dev');
  });

  it('should accept a custom config', () => {
    const result = config({env: 'test'});

    expect(result.env).to.deep.equal('test');
  });

});
