import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const Id = styled.p`

`;

const Message = styled.div`

`;

const Status = styled.p`
  span {
    color: red;
  }
`;

const Report = props => {
  const {
    creator,
    _id,
    lastEdited,
    problemDescription,
    status,
    systemsAffected,
    timeCreated,
    title
  } = props;

  if (_.isEmpty(props)) {
    return <p>No report selected.</p>;
  }

  return (
    <div>
      <Id>Report ID: {_id}</Id>
      <Status>Status: <span>{status}</span></Status>
      <table>
        <tbody>
          <tr>
            <td>Anomaly:</td>
            <td>{title}</td>
          </tr>
          <tr>
            <td>Vehicle:</td>
            <td>{systemsAffected && systemsAffected.join(', ')}</td>
          </tr>
          <tr>
            <td>Created:</td>
            <td>{timeCreated}</td>
          </tr>
          <tr>
            <td>Updated:</td>
            <td>{lastEdited}</td>
          </tr>
          <tr>
            <td>Assignee:</td>
            <td>{creator}</td>
          </tr>
        </tbody>
      </table>
      <Message>
        <p>Message: </p>
        <p>{problemDescription}</p>
      </Message>
    </div>
  );
};

Report.propTypes = {
  creator: PropTypes.string,
  _id: PropTypes.string,
  lastEdited: PropTypes.string,
  problemDescription: PropTypes.string,
  status: PropTypes.string,
  systemsAffected: PropTypes.array,
  timeCreated: PropTypes.string,
  title: PropTypes.string
};

export default Report;
