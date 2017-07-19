import {expect} from 'chai';

import ErrorStore from '../../../src/common/redux/Error';

describe('Redux Error reducer', () => {
  it('should return default state with no action or state', () => {
    expect(ErrorStore()).to.deep.equal({});
  });

  it('should the same state with no action', () => {
    const state = {hello: 'world'};

    expect(ErrorStore(state)).to.deep.equal(state);
  });
});
