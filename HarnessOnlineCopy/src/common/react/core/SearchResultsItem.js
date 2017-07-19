import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

import Alert from './Svgs/Alert';
import File from './Svgs/File';
import Satellite from './Svgs/Satellite';
import Tags from './Svgs/Tags';
import {$GreyDark, $GreyLight, $SecondaryColorLight} from './Variables';

const DivLink = styled(Link)`
  display: inline-block;
  box-sizing: border-box;
  padding: 10px 0;
  width: 100%;
  text-decoration: none;
  color: black;
  border-top: 1px solid ${$GreyLight};

  ${props => props.to.state.truncate && `
    padding: 10px;
    border: none;

    &:hover {
      background: ${$GreyDark};
    }
  ` }
`;

const IconWrap = styled.div`
  position: absolute;
  display: inline-block;

  svg {
    height: 30px;
    width: 30px;
    fill: ${$GreyLight};
  }
`;

const ResultInfo = styled.p`
  margin-bottom: 5px;
  color: ${$GreyLight};
`;

const Information = styled.div`
  padding-left: 50px;
  display: inline-block;
`;

const Title = styled.p`
  margin-bottom: 5px;
  font-size: 22px;
  color: ${$SecondaryColorLight};

  ${props => {
    return props.truncate && 'color: black;';
  }}
`;

const Text = styled.p`
  line-height: 22px;
`;

const SearchResultsItem = props => {
  const {date, handleClick, scid, text, title, truncate, type} = props;
  const itemInfo = {
    anomReport: {
      icon: Alert,
      link: '/reports'
    },
    procedures: {
      icon: File,
      link: '/procedures'
    },
    satellite: {
      icon: Satellite,
      link: `/scid/${scid}`
    },
    ticket: {
      icon: Tags,
      link: '/'
    }
  }[type] || {};
  const Icon = itemInfo.icon || File;
  const LinkInfo = `${itemInfo.link} | ${date}`;

  if (_.isEmpty(itemInfo)) {
    return null;
  }

  return (
    <DivLink
      onClick={handleClick}
      to={{
        pathname: itemInfo.link,
        state: {truncate}
      }}
    >
      <IconWrap><Icon/></IconWrap>
      <Information>
        <Title truncate={truncate}>{title}</Title>
        {!truncate && <ResultInfo>{LinkInfo}</ResultInfo>}
        {!truncate && <Text>{text}</Text>}
      </Information>
    </DivLink>
  );
};

SearchResultsItem.propTypes = {
  date: PropTypes.string,
  handleClick: PropTypes.func,
  scid: PropTypes.string,
  truncate: PropTypes.bool,
  text: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.string
};

export default SearchResultsItem;
