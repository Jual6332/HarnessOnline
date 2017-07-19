import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Input from '../core/Input';

const ScInput = styled(Input)`
  position: relative;
  margin-bottom: 5px;
`;

const Filter = props => {
  const {date, handleFilter, terms, type} = props;

  const handleChange = (value, key) => {
    handleFilter(value, key);
  };

  return (
    <div>
      <ScInput
        handleChange={handleChange}
        title='Anomaly Type'
        type='select'
        value={type}
      >
        <option defaultValue value='all'>All</option>
      </ScInput>
      <ScInput
        handleChange={handleChange}
        title='Date'
        type='select'
        value={date}
      >
        <option value='all'>All</option>
        <option defaultValue value='last24hrs'>Last 24 Hours</option>
      </ScInput>
      <ScInput
        handleChange={handleChange}
        placeholder=''
        targetKey='terms'
        title='Has Terms'
        type='text'
        value={terms}
      />
    </div>
  );
};

Filter.propTypes = {
  date: PropTypes.string,
  handleFilter: PropTypes.func,
  terms: PropTypes.string,
  type: PropTypes.string
};

export default Filter;
