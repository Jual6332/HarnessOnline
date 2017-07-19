import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styled from 'styled-components';

import {$GreyLight} from './Variables';
import AdvancedSearch from '../core/AdvancedSearch';
import BaseballCard from '../core/BaseballCard';
import SearchResultsItem from './SearchResultsItem';
import {bindMethods} from '../../utilities/reactHelpers';

const TRUNCATE_RESULT = true;

const results = [
  {
    id: '0',
    type: 'satellite',
    date: '2018-01-01',
    scid: 'OW0002',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent condimentum massa et urna commodo, ut feugiat odio hendrerit. Pellentesque dapibus velit sed finibus sodales. Nullam sapien augue, convallis nec justo nec, tempus ultrices ex. Praesent quis felis lobortis, dictum dui eget, accumsan turpis.',
    title: 'Satellite OW0002'
  },
  {
    id: '1',
    type: 'satellite',
    date: '2018-02-01',
    scid: 'OW0005',
    text: 'Fusce consequat et augue sit amet feugiat. Sed egestas venenatis nisi eget consectetur. Vivamus maximus turpis vel sem porta feugiat. Praesent facilisis porta turpis et lacinia. Vivamus mattis ex at feugiat tristique. Ut justo turpis, gravida vel ex id, maximus ultrices nunc. Mauris ut velit metus. Maecenas porta est augue. Mauris rutrum risus sem, nec vulputate quam iaculis pellentesque.',
    title: 'Satellite OW0005'
  }
];

const Div = styled.div`
  position: absolute;
  display: flex;
  z-index: 21;
  width: 98%;
  padding: 10px;
  box-sizing: border-box;
  background: white;
`;

const Section = styled.div`
  box-sizing: border-box;
  display: inline-block;
  vertical-align: top;

  &:nth-of-type(1) {
    width: 70%;
  }

  &:nth-of-type(2) {
    width: 5%;
    align-items: stretch;
    border-left: 1px solid ${$GreyLight};
  }

  &:nth-of-type(3) {
    width: 20%;
  }
`;

class TypeAhead extends Component {
  static propTypes = {
    handleResultClick: PropTypes.func
  }

  constructor (props) {
    super(props);

    this.state = {
    };

    bindMethods(this, [
    ]);
  }

  render () {
    const {handleResultClick} = this.props;

    return (
      <Div>
        <Section>
          { results.map(item => {
            return (
              <SearchResultsItem
                key={item.id}
                handleClick={handleResultClick}
                truncate={TRUNCATE_RESULT}
                {...item}
              />
            );
          }) }
        </Section>
        <Section>
          <BaseballCard/>
        </Section>
        <Section>
          <AdvancedSearch/>
        </Section>
      </Div>
    );
  }
}

export default TypeAhead;
