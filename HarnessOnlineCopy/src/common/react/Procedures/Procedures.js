import _ from 'lodash';
import React, {Component} from 'react';
import styled from 'styled-components';

import Procedure from './Procedure';
import ProcedureViewer from './ProcedureViewer';
import {$GreyLight} from '../core/Variables';
import {bindMethods} from '../../utilities/reactHelpers';

const proceds = [
  {
    uid: 0,
    lastUpdated: '04/12/2017, 03:30:18 PM',
    name: 'OW0101 Procedures Manual',
    size: '100mb'
  }, {
    uid: 1,
    lastUpdated: '04/12/2017, 02:1:49 PM',
    name: 'OW0102 Procedures Manual',
    size: '105mb'
  }, {
    uid: 2,
    lastUpdated: '04/11/2017, 21:39:10 PM',
    name: 'OW0103 Procedures Manual',
    size: '110mb'
  }
];

const Banner = styled.div`
  margin-top: 5px;
  width: 100%;
  border-top: 1px solid ${$GreyLight};
`;

const LeftCol = styled.div`
  display: inline-block;
  box-sizing: border-box;
  width: 35%;
  vertical-align: top;
`;

const RightCol = styled.div`
  display: inline-block;
  padding-right: 10px;
  box-sizing: border-box;
  height: 100vh;
  width: 65%;
  vertical-align: top;
  box-sizing: border-box;
  border-left: 1px solid ${$GreyLight};
`;

class Procedures extends Component {
  static propTypes = {
  };

  constructor (props) {
    super(props);

    this.state = {
      currentProc: null,
      procedures: proceds
    };

    bindMethods(this, [
      'selectProcedure'
    ]);
  }

  selectProcedure (uid) {
    this.setState({currentProc: uid});
  }

  render () {
    const {currentProc, procedures} = this.state;
    const selectedProc = _.find(procedures, ['uid', currentProc]) || {};

    // console.log('Procedures this.props');
    // console.log(this.props);
    // console.log('Procedures this.state');
    // console.log(this.state);

    return (
      <div>
        <Banner/>
        <LeftCol>
          { procedures.map((procedure, index) => {
            return (
              <Procedure
                key={index}
                handleClick={this.selectProcedure}
                selected={procedure.uid === currentProc}
                {...procedure}
              />
            );
          }) }
        </LeftCol>
        <RightCol>
          <ProcedureViewer {...selectedProc}/>
        </RightCol>
      </div>
    );
  }
}

export default Procedures;
