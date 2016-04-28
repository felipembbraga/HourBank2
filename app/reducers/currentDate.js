import moment from 'moment';

const initialState = moment().format('YYYY/MM/DD');

export default function currentDate(state = initialState, action) {
  switch (action.type) {
    case 'SET_CURRENT_DATE':
      return action.payload;
    case 'SET_TODAY':
      return initialState;
    default:
      return state;
  }
}
