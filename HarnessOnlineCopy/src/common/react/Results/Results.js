import _ from 'lodash';
import queryString from 'query-string';
import React, {Component} from 'react';
import styled from 'styled-components';

import AdvancedSearch from '../core/AdvancedSearch';
import SearchResultsItem from '../core/SearchResultsItem';
import {
  $GreyDark,
  $GreyLight,
  $SecondaryColor
} from '../core/Variables';
import {searchCategories} from '../../utilities/constants';
import {bindMethods} from '../../utilities/reactHelpers';

const results = {
  queryTime: '1.067 seconds',
  resultsNumber: 2,
  items: [
    {
      id: '0',
      type: 'satellite',
      date: 'Jan 1 2018',
      scid: 'OW0002',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent condimentum massa et urna commodo, ut feugiat odio hendrerit. Pellentesque dapibus velit sed finibus sodales. Nullam sapien augue, convallis nec justo nec, tempus ultrices ex. Praesent quis felis lobortis, dictum dui eget, accumsan turpis.',
      title: 'Satellite OW0002'
    },
    {
      id: '1',
      type: 'satellite',
      date: 'Jan 2 2018',
      scid: 'OW0005',
      text: 'Fusce consequat et augue sit amet feugiat. Sed egestas venenatis nisi eget consectetur. Vivamus maximus turpis vel sem porta feugiat. Praesent facilisis porta turpis et lacinia. Vivamus mattis ex at feugiat tristique. Ut justo turpis, gravida vel ex id, maximus ultrices nunc. Mauris ut velit metus. Maecenas porta est augue. Mauris rutrum risus sem, nec vulputate quam iaculis pellentesque.',
      title: 'Satellite OW0005'
    }
  ]
};

const $sideWith = 350;
const TRUNCATE_RESULT = false;

const Div = styled.div`
  margin-top: 5px;
  border-top: 1px solid ${$GreyLight};
  text-align: left;
`;

const Header = styled.div`
  padding-bottom: 5px;
  color: ${$GreyLight};
`;

const Main = styled.div`
  margin-left: ${$sideWith}px;
  margin-right: 100px;
`;

const Side = styled.div`
  display: inline-block;
  float: left;
  width: ${$sideWith}px;
`;

const SearchTabs = styled.div`
  padding-left: ${$sideWith}px;
`;

const Tab = styled.p`
  display: inline-block;
  padding: 15px 50px;
  border-top: 5px solid white;
  color: ${$GreyDark};
  cursor: pointer;

  ${props => props.selected && `
    border-color: ${$SecondaryColor};
    color: ${$SecondaryColor};
  ` }
`;

class Results extends Component {
  static propTypes = {
  };

  constructor (props) {
    super(props);

    const parseQString = queryString.parse(_.get(props, 'location.search', ''));

    this.state = {
      ...parseQString
    };

    bindMethods(this, [
      'handleSearch'
    ]);
  }

  handleSearch (category) {
    console.log('new search', 'query', this.state.query, 'category', category);

    this.setState({category});
  }

  render () {
    const {category} = this.state;

    // console.log('Results this.props');
    // console.log(this.props);
    // console.log('Results this.state');
    // console.log(this.state);

    return (
      <Div>
        <Side>
          <AdvancedSearch/>
        </Side>
        <SearchTabs>
          { searchCategories.map(searchCategory => {
            return (
              <Tab
                key={searchCategory.value}
                onClick={_.partial(this.handleSearch, searchCategory.value)}
                selected={
                  (category && searchCategory.value === category)
                  || (!category && searchCategory.value === 'all')
                }
              >{searchCategory.label}</Tab>
            );
          }) }
        </SearchTabs>
        <Main>
          <Header>{results.resultsNumber} Results ({results.queryTime})</Header>
          { results.items.map(item => {
            return (
              <SearchResultsItem
                key={item.id}
                truncate={TRUNCATE_RESULT}
                {...item}
              />
            );
          }) }
        </Main>
      </Div>
    );
  }
}

export default Results;
