import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

import Input from './Input';
import {$GreyLight} from './Variables';
import {setInput} from '../../redux/Search';
import {searchCategories} from '../../utilities/constants';

const Div = styled.div`
  width: 300px;
  margin: 15px auto 0px auto;
  position: relative;
`;

const ScInput = styled(Input)`
  position: relative;
  margin-bottom: 5px;
`;

const Title = styled.p`
  color: ${$GreyLight};
  text-transform: uppercase;
`;

const AdvancedSearch = props => {
  const {handleInput, input} = props;
  const {dataSource, date, term, type} = input;

  const handleChange = (value, key) => {
    handleInput(key, value);
  };

  return (
    <Div>
      <Title>Advanced Search</Title>
      <ScInput
        handleChange={handleChange}
        title='Type'
        type='select'
        value={type}
      >
        { searchCategories.map(searchCategory => {
          return (
            <option
              key={searchCategory.value}
              value={searchCategory.value}
            >{searchCategory.label}</option>
          );
        }) }
      </ScInput>
      <ScInput
        handleChange={handleChange}
        title='Date'
        type='select'
        value={date}
      >
        { searchCategories.map(searchCategory => {
          return (
            <option
              key={searchCategory.value}
              value={searchCategory.value}
            >{searchCategory.label}</option>
          );
        }) }
      </ScInput>
      <ScInput
        handleChange={handleChange}
        placeholder='Enter search terms'
        targetKey='term'
        title='Has Terms'
        type='text'
        value={term}
      />
      <ScInput
        handleChange={handleChange}
        title='Data Source'
        type='select'
        value={dataSource}
      >
        { searchCategories.map(searchCategory => {
          return (
            <option
              key={searchCategory.value}
              value={searchCategory.value}
            >{searchCategory.label}</option>
          );
        }) }
      </ScInput>
    </Div>
  );
};

AdvancedSearch.propTypes = {
  handleInput: PropTypes.func,
  input: PropTypes.object
};

const mapStateToProps = state => {
  const {SearchStore} = state;
  const {input} = SearchStore;

  return {input};
};

const mapDispatchToProps = dispatch => {
  return {
    handleInput: (category, value) => {
      dispatch(setInput(category, value));
    }
  };
};

const ConnectedAdvancedSearch
  = connect(mapStateToProps, mapDispatchToProps)(AdvancedSearch);

export default ConnectedAdvancedSearch;
