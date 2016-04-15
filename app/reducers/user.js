import {Action} from '../actions';

export type State = {
  isLoggedIn: boolean,
  isFetching: boolean,
  didInvalidate: boolean,
  erro: ?string,
  id: ?string,
  email: ?string
};



const initialState = {
  isLoggedIn: false,
  isFetching: false,
  didInvalidate: false,
  error: null,
  id: null,
  email: null,
};

export default function user(state: State = initialState, action) {
  return state;
}
