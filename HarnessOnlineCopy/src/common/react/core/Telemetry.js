import _ from 'lodash';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import styled from 'styled-components';

import {ModalForm, ModalHeader} from './Elements';
import CloseCircleX from './Svgs/CloseCircleX';
import Gauge from './Svgs/Gauge';
import {$SecondaryColorLight} from '../core/Variables';
import config from '../../config/config';
import {closeModal} from '../../redux/App';
import {get} from '../../utilities/fetch';
import logger from '../../utilities/logger';
import {bindMethods} from '../../utilities/reactHelpers';

const conf = config();
const {endpoints} = conf;
const {linkerd, tlmSnapshot: tlmSnapshotEP} = endpoints;

const Time = styled.p`
  display: inline-block;
  padding: 15px;
`;

const FetchLabel = styled.div`
  display: inline-block;
  color: ${$SecondaryColorLight};

  p {
    display: inline-block;
  }

  svg {
    height: 25px;
    width: 25px;
    vertical-align: middle;
    fill: ${$SecondaryColorLight};
  }
`;

class Telemetry extends Component {
  static propTypes = {
    handleModalClose: PropTypes.func,
    match: PropTypes.object
  };

  constructor (props) {
    super(props);

    const scid = _.get(props, 'match.params.scid', '');

    this.state = {
      currentIndex: 0,
      initialTelem: {},
      scid,
      telemData: []
    };

    this.telemEndpoint = {
      ...linkerd,
      path: [
        tlmSnapshotEP.linkerdId, ...tlmSnapshotEP.latestPath, 'OW005'
      ]
    };

    this.endpoints = [
      {
        ...this.telemEndpoint,
        dataLocation: 'initialTelem'
      }
    ];

    bindMethods(this, [
      'requestTelem'
    ]);
  }

  componentDidMount () {
    const newState = {};

    Promise.all(
      _.map(this.endpoints, endpoint => {
        return get(endpoint);
      })
    )
      .then(data => {
        _.map(this.endpoints, (endpoint, index) => {
          newState[endpoint.dataLocation] = data[index];
        });

        this.setState({...this.state, ...newState});
      })
      .catch(err => {
        logger.error('err', err);

        this.setState({error: true});
      });
  }

  requestTelem (time, beforeAfter = 'before', currentIndex) {
    let telemData = [];
    let newIndex = beforeAfter === 'before' ? currentIndex - 1 : currentIndex + 1;

    // console.log('requestTelem requestTelem requestTelem');
    // console.log('this.state.telemData');
    // console.log(this.state.telemData);
    // console.log('newIndex');
    // console.log(newIndex);
    // console.log('_.get(this.state.telemData, `[${newIndex}]`, null)');
    // console.log(_.get(this.state.telemData, `[${newIndex}]`, null));

    if (_.get(this.state.telemData, `[${newIndex}]`, null)) {
      this.setState({currentIndex: newIndex});
    } else {
      const endpoint = {
        ...this.telemEndpoint,
        query: {
          [beforeAfter]: time
        }
      };

      get(endpoint)
        .then(data => {
          if (_.isEmpty(this.state.telemData)) {
            telemData = [this.state.initialTelem];
          } else {
            telemData = this.state.telemData;
          }

          if (beforeAfter === 'before') {
            telemData = [data, ...this.state.telemData];
            newIndex = currentIndex === 0 ? currentIndex : currentIndex - 1;
          } else {
            telemData = [...this.state.telemData, data];
            newIndex = currentIndex + 1;
          }

          this.setState({currentIndex: newIndex, telemData});
        })
        .catch(err => {
          logger.error('err', err);
          this.setState({error: true});
        });
    }
  }

  render () {
    const {handleModalClose} = this.props;
    const {currentIndex, error, initialTelem, telemData} = this.state;
    // eslint-disable-next-line no-unused-vars
    const {_id, snapshotDateTime, ...telemPoints}
      = telemData[currentIndex] || initialTelem;
    const snapShotTime = snapshotDateTime && snapshotDateTime.$date;
    const readableTime = snapShotTime ?
      moment(snapshotDateTime.$date).format('MM/DD/YYYY, HH:mm:ss') : '';

    // console.log('--- ---');
    // console.log('Telemetry this.props');
    // console.log(this.props);
    // console.log('Telemetry this.state');
    // console.log(this.state);
    // console.log('telemData', telemData);
    // console.log('currentIndex', currentIndex);
    // console.log('telemData[currentIndex]', telemData[currentIndex]);
    // console.log('initialTelem', initialTelem);

    return (
      <ModalForm>
        <ModalHeader>
          <span onClick={handleModalClose}>
            <CloseCircleX/>
          </span>
          <span>
            <Gauge/>
          </span>
          <p>Telemetry Snapshot</p>
        </ModalHeader>
        { error && (
          <div>
            <p>There was an error fetching telem data.</p>
          </div>
        ) }
        {
          _.map(telemPoints, (value, key) => {
            return <p key={`${key}-${value}`}>{key}: {value}</p>;
          })
        }
        <FetchLabel
          onClick={_.partial(this.requestTelem, snapShotTime, 'before', currentIndex)}
        >
          <p>Previous</p>
        </FetchLabel>
        <Time>{readableTime}</Time>
        <FetchLabel
          onClick={_.partial(this.requestTelem, snapShotTime, 'after', currentIndex)}
        >
          <p>Future</p>
        </FetchLabel>
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

const ConnectedTelemetry = connect(null, mapDispatchToProps)(Telemetry);

export default withRouter(ConnectedTelemetry);
