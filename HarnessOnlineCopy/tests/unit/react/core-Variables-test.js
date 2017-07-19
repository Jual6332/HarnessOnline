import {expect} from 'chai';

import * as variables from '../../../src/common/react/core/Variables';

describe('Global variables', () => {
  it('should check that the values haven\'t changed', () => {
    expect(variables).to.deep.equal({
      $AnimationSpeed: '0.25s',
      $AnimationType: 'ease-in-out',
      $Background: '#F5F8FA',
      $PrimaryColor: '#0DA548',
      $PrimaryColorDark: '#085025',
      $PrimaryColorLight: '#85D2A2',
      $SecondaryColor: '#1B5675',
      $SecondaryColorDark: '#0C2939',
      $SecondaryColorLight: '#60899F',
      $TransitionSpeedType: '0.25s ease-in-out'
    });
  });
});
