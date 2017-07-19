import _ from 'lodash';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

import {ModalForm, ModalHeader} from './Elements';
import Input from './Input';
import CloseCircleX from './Svgs/CloseCircleX';
import Tags from './Svgs/Tags';
import {$GreyLight, $PrimaryColor} from './Variables';
import config from '../../config/config';
import {closeModal} from '../../redux/App';
import {post} from '../../utilities/fetch';
import logger from '../../utilities/logger';
import {bindMethods} from '../../utilities/reactHelpers';

const conf = config();
const {endpoints} = conf;
const {linkerd, ticketer: ticketerEP} = endpoints;

const Button = styled.p`
  display: inline-block;
  width: 70%;
  padding: 10px;
  margin-top: 15px;
  box-sizing: border-box;
  border-radius: 3px;
  text-align: center;
  border: 1px solid ${$PrimaryColor};
  border-radius: 3px;
  background: ${$PrimaryColor};
  text-align: center;
  color: white;
  font-weight: 600;
  text-transform: uppercase;
  cursor: pointer;

  ${props => props && props.cancel && `
    width: 29%;
    margin-right: 1%;
    box-sizing: border-box;
    background: white;
    border-color: ${$GreyLight};
    color: ${$GreyLight};
  ` }
`;

const ScInput = styled(Input)`
  position: relative;
  margin-bottom: 5px;
`;

class TicketForm extends Component {
  static propTypes = {
    handleModalClose: PropTypes.func
  }

  constructor (props) {
    super(props);

    this.state = {
      error: false,
      eventTime: '',
      reporter: '',
      severity: '',
      summary: '',
      vehicleId: ''
    };

    this.telemEndpoint = {
      ...linkerd,
      path: [
        ticketerEP.linkerdId, ...ticketerEP.issuesPath
      ]
    };

    bindMethods(this, [
      'handleCancel',
      'handleInputChange',
      'handleSave'
    ]);
  }

  handleCancel () {
    this.props.handleModalClose();
  }

  handleInputChange (value, key) {
    this.setState({[key]: value});
  }

  handleSave () {
    const {
      assignee,
      description,
      eventTime,
      logMessage,
      reporter,
      severity,
      vehicleId
    } = this.state;
    const body = {
      ack: 'unack',
      assignee: assignee || '',
      description: description || '',
      event_time: eventTime || '1996-12-19T16:39:57-08:00',
      event_type: [],
      issue_type: 'Task',
      logmessage: logMessage || '',
      origin_rule: '',
      reporter: reporter || 'IBIS',
      resolution: 'Unresolved',
      severity: severity && _.isNumber(parseInt(severity, 10)) ?
        parseInt(severity, 10) : 1,
      spacecraft: vehicleId || 'OW????',
      status: 'Open'
    };

    post({...this.telemEndpoint}, body)
      .then(response => {
        if (response && response.id && response.updated) {
          this.props.handleModalClose();
        }
      })
      .catch(err => {
        logger.log(err);

        this.setState({error: true});
      });
  }

  render () {
    const {handleModalClose} = this.props;
    const {
      assignee,
      description,
      error,
      eventTime,
      logMessage,
      reporter,
      severity,
      vehicleId
    } = this.state;

    // console.log('Ticket Form props');
    // console.log(this.props);
    // console.log('Ticket Form state');
    // console.log(this.state);

    return (
      <ModalForm>
        <ModalHeader>
          <span onClick={handleModalClose}>
            <CloseCircleX/>
          </span>
          <span>
            <Tags/>
          </span>
          <p>Create Ticket</p>
        </ModalHeader>
        {error && <p>There was an error saving your ticket.</p>}
        <ScInput
          handleChange={this.handleInputChange}
          placeholder='Enter a title'
          targetKey='description'
          title='Title'
          type='text'
          value={description}
        />
        <ScInput
          handleChange={this.handleInputChange}
          placeholder='Enter Vehicle ID'
          targetKey='vehicleId'
          title='Vehicle ID'
          type='text'
          value={vehicleId}
        />
        <ScInput
          handleChange={this.handleInputChange}
          placeholder='Enter a time'
          targetKey='eventTime'
          title='Event Time'
          type='text'
          value={eventTime}
        />
        <ScInput
          handleChange={this.handleInputChange}
          placeholder='Enter a number between 0-100'
          targetKey='severity'
          title='Severity'
          type='text'
          value={severity}
        />
        <ScInput
          handleChange={this.handleInputChange}
          placeholder='Enter a reporter for this ticket'
          targetKey='reporter'
          title='Reporter'
          type='text'
          value={reporter}
        />
        <ScInput
          handleChange={this.handleInputChange}
          placeholder='Enter an assignee for this ticket'
          targetKey='assignee'
          title='Assignee'
          type='text'
          value={assignee}
        />
        <ScInput
          handleChange={this.handleInputChange}
          placeholder=''
          targetKey='logMessage'
          title='Description'
          type='textArea'
          value={logMessage}
        />
        <Button cancel onClick={this.handleCancel}>Cancel</Button>
        <Button onClick={this.handleSave}>Save Ticket</Button>
      </ModalForm>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleModalClose: () => {
      dispatch(closeModal());
    }
  };
};

const ConnectedTicketForm = connect(null, mapDispatchToProps)(TicketForm);

export default ConnectedTicketForm;
