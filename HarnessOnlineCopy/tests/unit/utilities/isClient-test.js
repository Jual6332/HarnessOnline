import {expect} from 'chai';

import isClient from '../../../src/common/utilities/isClient';

describe('Function isClient', () => {

  it('should return false', () => {
    const result = isClient();

    expect(result).to.deep.equal(false);
  });
});
