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

const Issue = props => {
  const {
    // ack,
    // assignee,
    // component,
    created,
    // description,
    // element,
    // event_links,
    // event_time,
    // event_type,
    // id,
    // issue_type,
    logmessage,
    origin_rule,
    reporter,
    resolution,
    // severity,
    spacecraft,
    status,
    ticketKey,
    updated
  } = props;

  if (_.isEmpty(props)) {
    return <p>No report selected.</p>;
  }

  return (
    <div>
      <Id>Ticket: {ticketKey}</Id>
      <Status>Status: <span>{status}</span></Status>
      <Status>Resolution: <span>{resolution}</span></Status>
      <table>
        <tbody>
          <tr>
            <td>Vehicle:</td>
            <td>{spacecraft}</td>
          </tr>
          <tr>
            <td>Created:</td>
            <td>{created}</td>
          </tr>
          <tr>
            <td>Updated:</td>
            <td>{updated}</td>
          </tr>
          <tr>
            <td>Assignee:</td>
            <td>{reporter}</td>
          </tr>
          <tr>
            <td>Origin Rule:</td>
            <td>{origin_rule}</td>
          </tr>
        </tbody>
      </table>
      <Message>
        <p>Message: </p>
        <p>{logmessage}</p>
      </Message>
    </div>
  );
};

Issue.propTypes = {
  ack: PropTypes.string,
  assignee: PropTypes.string,
  component: PropTypes.string,
  created: PropTypes.string,
  description: PropTypes.string,
  element: PropTypes.string,
  event_links: PropTypes.object,
  event_time: PropTypes.string,
  event_type: PropTypes.array,
  id: PropTypes.string,
  issue_type: PropTypes.string,
  logmessage: PropTypes.string,
  origin_rule: PropTypes.string,
  reporter: PropTypes.string,
  resolution: PropTypes.string,
  severity: PropTypes.number,
  spacecraft: PropTypes.string,
  status: PropTypes.string,
  ticketKey: PropTypes.string,
  updated: PropTypes.string
};

export default Issue;
