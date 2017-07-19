import _ from 'lodash';
import React, {Component} from 'react';
import styled from 'styled-components';

//import NotificationBar from '../core/NotificationBar';
import ViewLogsTable from './ViewLogsTable';
//import {$HarnessConfigSettings} from '../core/HarnessConfigSettings';
//import FormRender from './Forms/FormRender';
//import config from '../../config/config';
//import {get} from '../../utilities/fetch';
//import logger from '../../utilities/logger';

const Div = styled.div`
  padding: 10px;
  text-align: center;
  margin-right: 1%;
  width: 99%;
`;

class ViewLogs extends Component {
  constructor (props) {
    super(props);

    this.state = {
      logs: [],
      settings: []
    };

  }

  render () {
    const {logs, settings} = this.state;

    return (
      <div>
        <div>
          <Div>
          <ViewLogsTable 
            reports={settings.slice(0, 14)}
            totalNumber={settings.length}
          />
          </Div>
        </div>
      </div>
    );
  }
}

export default ViewLogs;
