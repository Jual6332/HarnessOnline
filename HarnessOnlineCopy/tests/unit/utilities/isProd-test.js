import {expect} from 'chai';

import isProd from '../../../src/common/utilities/isProd';

describe('Function isProd', () => {

  it('should return false', () => {
    const result = isProd();

    expect(result).to.deep.equal(false);
  });
});
