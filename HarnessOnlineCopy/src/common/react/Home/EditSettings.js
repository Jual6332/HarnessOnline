import _ from 'lodash';
import React, {Component} from 'react';
import styled from 'styled-components';

import NotificationBar from '../core/NotificationBar';
import ConfigSettingsTable from './ConfigSettingsTable';
import {$HarnessConfigSettings} from '../core/HarnessConfigSettings';
import FormRender from './Forms/FormRender';
import config from '../../config/config';
import {get} from '../../utilities/fetch';
import logger from '../../utilities/logger';


const Div = styled.div`
  padding: 10px;
  text-align: center;
  margin-right: 1%;
  width: 99%;
`;

class EditSettings extends Component {
  constructor (props) {
    super(props);

    this.state = {
      reports: [],
      resolvedTickets: [],
      unresolvedTickets: [],
      settings: $HarnessConfigSettings,
      name: "Frarthur"
    };

    this.changeName = this.changeName.bind(this);
  }



  changeName(newName){
    this.setState({
      reports: [],
      resolvedTickets: [],
      unresolvedTickets: [],
      settings: $HarnessConfigSettings,
      name: newName
    });
    console.log("changeName called!");
  }

  render () {
    const {reports, resolvedTickets, unresolvedTickets, settings} = this.state;
    const showBar = false;
    const unResTickets = _.get(unresolvedTickets, 'issues', []);
    const resTickets = _.get(resolvedTickets, 'issues', []);

    return (
      <div>
        { showBar && (
          <NotificationBar
            color='orange'
            svg='alert'
            title='URGENT Satellite OW0002 has heater failure'
          />
        ) }
        <div>
          <Div>
          <ConfigSettingsTable
            reports={settings.slice(0, 14)}
            totalNumber={settings.length}
          />
          </Div>
        </div>
      </div>
    );
  }
}

export default EditSettings;
