import type {Action} from '../actions/types';

type State = {
  isFetching: boolean,
  message: string
}

const initialState = {
  isFetching: false,
  message: ''
}

export default function fetchData(state: State = initialState, action: Action): State {
  switch (action.type) {
    case 'FETCHING':
      return {
        isFetching: true,
        message: action.payload
      };
    case 'FETCHED':
      return initialState;
    default:
      return state;
  }
}
