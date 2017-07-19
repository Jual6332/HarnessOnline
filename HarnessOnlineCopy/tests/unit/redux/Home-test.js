import {expect} from 'chai';

import HomeStore from '../../../src/common/redux/Home';
import {
  DECREMENT,
  INCREMENT,
  decrementCount,
  incrementCount
} from '../../../src/common/redux/Home';

describe('Redux Home action creators', () => {
  it('decrementCount', () => {
    const actionObject = {type: DECREMENT};

    expect(decrementCount()).to.deep.equal(actionObject);
  });

  it('incrementCount', () => {
    const actionObject = {type: INCREMENT};

    expect(incrementCount()).to.deep.equal(actionObject);
  });
});

describe('Redux Home reducers', () => {
  it('should return default state with no action or state', () => {
    const state = {count: 0};

    expect(HomeStore()).to.deep.equal(state);
  });

  it('should the same state with no action', () => {
    const state = {hello: 'world'};

    expect(HomeStore(state)).to.deep.equal(state);
  });

  it('type INCREMENT, should increase the count by 1', () => {
    const actionObject = {type: INCREMENT};
    const beginState = {count: -1};
    const endState = {count: 0};

    expect(HomeStore(beginState, actionObject)).to.deep.equal(endState);
  });


  it('type DECREMENT, should decrease the count by 1', () => {
    const actionObject = {type: DECREMENT};
    const beginState = {count: 1};
    const endState = {count: 0};

    expect(HomeStore(beginState, actionObject)).to.deep.equal(endState);
  });
});
