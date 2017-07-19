import {combineReducers} from 'redux';

import App from './App';
import Search from './Search';
import Error from './Error';

export default combineReducers({
  AppStore: App,
  SearchStore: Search,
  ErrorStore: Error
});
