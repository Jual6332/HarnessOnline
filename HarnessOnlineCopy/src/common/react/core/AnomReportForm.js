import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

import {ModalForm, ModalHeader} from './Elements';
import Input from './Input';
import Alert from './Svgs/Alert';
import CloseCircleX from './Svgs/CloseCircleX';
import {$GreyLight, $PrimaryColor} from './Variables';
import config from '../../config/config';
import {closeModal} from '../../redux/App';
import {post} from '../../utilities/fetch';
import isProd from '../../utilities/isProd';
import logger from '../../utilities/logger';
import {bindMethods} from '../../utilities/reactHelpers';

const conf = config();
const {endpoints} = conf;
const {anomalyReport: anomalyReportEP, linkerd} = endpoints;

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

class AnomReportForm extends Component {
  static propTypes = {
    handleModalClose: PropTypes.func
  }

  constructor (props) {
    super(props);

    this.state = {
      assignee: '',
      description: '',
      impact: '',
      status: 'OPEN',
      type: '',
      vehicleId: ''
    };

    this.anomEndpoint = {
      ...linkerd,
      path: [
        anomalyReportEP.linkerdId, ...anomalyReportEP.reportsPath
      ]
    };

    this.apiEndpoint = isProd() ? {
      ...conf.endpoints.linkerd,
      path: [
        conf.endpoints.server.linkerdId, ...conf.endpoints.server.path
      ]
    } : {...conf.endpoints.server};

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
      assignee, description, impact, reporter, status, title, vehicleId
    } = this.state;
    const body = {
      assignedTo: assignee || '',
      impactToService: impact || '',
      // numEdits: 0,
      problemDescription: description || '',
      reporter: reporter || 'IBIS',
      status: status || '',
      systemsAffected: [vehicleId],
      // timeCreated: moment().format('YYYY-MM-DDTHH:mm:ss'),
      title: title || ''
    };

    post(
      {...this.apiEndpoint},
      {method: 'post', endpoint: {...this.anomEndpoint}, body}
    )
      .then(response => {
        if (response && response.result === 'success') {
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
      assignee, description, impact, reporter, status, title, vehicleId
    } = this.state;

    // console.log('Report Form props');
    // console.log(this.props);
    // console.log('Report Form state');
    // console.log(this.state);

    return (
      <ModalForm>
        <ModalHeader>
          <span onClick={handleModalClose}>
            <CloseCircleX/>
          </span>
          <span>
            <Alert/>
          </span>
          <p>Create Anomaly Report</p>
        </ModalHeader>
        <ScInput
          handleChange={this.handleInputChange}
          placeholder='Enter a title'
          targetKey='title'
          title='Title'
          type='text'
          value={title}
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
          targetKey='status'
          title='Status'
          type='select'
          value={status}
        >
          <option value='OPEN'>Open</option>
          <option value='RESOLVED'>Resolved</option>
        </ScInput>
        <ScInput
          handleChange={this.handleInputChange}
          placeholder='Enter the service impact'
          targetKey='impact'
          title='Impact To Service'
          type='text'
          value={impact}
        />
        <ScInput
          handleChange={this.handleInputChange}
          placeholder=''
          targetKey='description'
          title='Description'
          type='textArea'
          value={description}
        />
        <ScInput
          handleChange={this.handleInputChange}
          placeholder='Enter a person to assign the report to'
          targetKey='assignee'
          title='Assign To'
          type='text'
          value={assignee}
        />
        <ScInput
          handleChange={this.handleInputChange}
          placeholder='Enter a reporter for this ticket'
          targetKey='reporter'
          title='Reporter'
          type='text'
          value={reporter}
        />
        <Button cancel onClick={this.handleCancel}>Cancel</Button>
        <Button onClick={this.handleSave}>Save Anomaly Report</Button>
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

const ConnectedAnomReportForm = connect(null, mapDispatchToProps)(AnomReportForm);

export default ConnectedAnomReportForm;
