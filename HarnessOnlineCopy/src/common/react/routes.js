import _ from 'lodash';
import React from 'react';
import {Route, Switch} from 'react-router-dom';

import AnomReports from './AnomReports/AnomReports';
import EditSettings from './Home/EditSettings';
import ViewLogs from './Home/ViewLogs';
import ContactScheduling from './Home/ContactScheduling';
import ErrorPage from './Error';
import Home from './Home/Home';
import Procedures from './Procedures/Procedures';
import Results from './Results/Results';
import Satellite from './Satellite/Satellite';
import Tickets from './Tickets/Tickets';
import Visibilities from './Home/Visibilities';

const routesConfig = [
  {
    path: '/',
    exact: true,
    component: Home
  },
  {
    path: '/search',
    exact: true,
    component: Results
  },
  {
    path: '/scid/:scid',
    exact: true,
    component: Satellite
  },
  {
    path: '/scheduling',
    exact: true,
    component: ContactScheduling
  },
  {
    path: '/visibilities',
    exact: true,
    component: Visibilities
  },
  {
    path: '/logs',
    exact: true,
    component: ViewLogs
  }
];

const ReactRoutes = () => {
  return (
    <Switch>
      {
        _.map(routesConfig, (value, key) => {
          return <Route key={key} {...value} />;
        })
      }
      <Route component={ErrorPage}/>
    </Switch>
  );
};

export {
  ReactRoutes
};

export default routesConfig;
