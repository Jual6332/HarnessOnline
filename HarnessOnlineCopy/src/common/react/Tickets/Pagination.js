import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import ArrowLeft from '../core/Svgs/ArrowLeft';
import ArrowRight from '../core/Svgs/ArrowRight';
import {$GreyLight, $SecondaryColor} from '../core/Variables';

const ArrowWrap = styled.div`
  display: inline-block;
  cursor: pointer;
  vertical-align: middle;

  &:nth-of-type(1) {
    margin-right: 15px;
  }

  &:nth-of-type(2) {
    margin-left: 15px;
  }

  &:hover {
    svg {
      fill: ${$SecondaryColor};
    }
  }

  svg {
    height: 25px;
    width: 25px;
    fill: ${$GreyLight};
  }

  ${props => props.disabled && `
    pointer-events: none;

    &:hover {
      svg {
        fill: ${$GreyLight};
      }
    }
  ` }
`;

const Div = styled.div`
  text-align: center;
`;

const PageNumber = styled.p`
  display: inline-block;
  padding: 10px;
  color: ${$GreyLight};
  cursor: pointer;

  &:hover {
    color: ${$SecondaryColor};
  }

  ${props => props.selected && `
    color: ${$SecondaryColor};
    pointer-events: none;
  ` }
`;

const Pagination = props => {
  const {currentPage, handleClick, totalPages} = props;
  const pageNumbers = [];
  const clickableNext = currentPage !== totalPages;
  const clickablePrev = currentPage !== 1;

  for (let index = 1; index <= totalPages; index++) {
    pageNumbers.push(
      <PageNumber
        key={index}
        onClick={_.partial(handleClick, index, 'page')}
        selected={index === currentPage}
      >{index}</PageNumber>
    );
  }

  return (
    <Div>
      { totalPages && totalPages > 1 && (
        <ArrowWrap
          disabled={!clickablePrev}
          onClick={clickablePrev && _.partial(handleClick, currentPage - 1, 'page')}
        >
          <ArrowLeft/>
        </ArrowWrap>
      ) }
      {pageNumbers}
      { totalPages && totalPages > 1 && (
        <ArrowWrap
          disabled={!clickableNext}
          onClick={clickableNext && _.partial(handleClick, currentPage + 1, 'page')}
        >
          <ArrowRight/>
        </ArrowWrap>
      ) }
    </Div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number,
  handleClick: PropTypes.func,
  totalPages: PropTypes.number
};

export default Pagination;
