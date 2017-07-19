import _ from 'lodash';
import {expect} from 'chai';

import {
  DECREMENT,
  INCREMENT
} from '../../../src/common/redux/Home';

const actionTypes = [
  DECREMENT,
  INCREMENT
];

describe('actionTypes', () => {
  it('should all be unique', () => {
    const dict = {};
    const dupeActions = _
      .chain(_.values(actionTypes))
      .map(value => {
        if (dict[value]) {
          dict[value]++;
        } else {
          dict[value] = 1;
        }

        return value;
      })
      .filter(value => {
        return dict[value] !== 1;
      })
      .value();

    expect(dupeActions).to.deep.equal([]);
  });
});
