import {expect} from 'chai';

import App from '../../../src/common/redux/App';
import Error from '../../../src/common/redux/Error';
import Home from '../../../src/common/redux/Home';
import reducers from '../../../src/common/redux/reducers';

describe('reducers', () => {
  it('should create a default store with correctly named and combined reducers', () => {
    const beginState = reducers();
    const endState = {
      AppStore: App(),
      ErrorStore: Error(),
      HomeStore: Home()
    };

    expect(beginState).to.deep.equal(endState);
  });
});
