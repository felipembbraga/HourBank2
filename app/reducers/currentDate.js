import moment from 'moment';

const initialState = moment().format('DD/MM/YYYY');

export default function currentDate(state = initialState, action) {
  switch (action.type) {
    case 'SET_CURRENT_DATE':
      return action.payload;
    default:
      return state;
  }
}
