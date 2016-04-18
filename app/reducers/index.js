import {combineReducers} from 'redux';
import user from './user';
import navigation from './navigation';

const reducers = combineReducers({
  user: user,
  navigation: navigation
});

export default reducers;
