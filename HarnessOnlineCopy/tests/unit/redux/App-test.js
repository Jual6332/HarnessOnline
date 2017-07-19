import {expect} from 'chai';

import AppStore from '../../../src/common/redux/App';

describe('Redux App reducer', () => {
  it('should return default state with no action or state', () => {
    expect(AppStore()).to.deep.equal({});
  });

  it('should the same state with no action', () => {
    const state = {hello: 'world'};

    expect(AppStore(state)).to.deep.equal(state);
  });
});
