import {combineReducers} from 'redux';
import fetchData from './fetchData';
import navigation from './navigation';
import officeHours from './point';
import user from './user';


const reducers = combineReducers({
  fetchData: fetchData,
  navigation: navigation,
  officeHours: officeHours,
  user: user
});

export default reducers;
