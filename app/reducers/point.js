import type {Point, Action} from '../actions/types';
import Immutable from 'immutable';

type OfficeHour = {
  date: string,
  points: Array<Point>
}

const initialState = {};

export default function officeHours(state: List = initialState, action: Action) {
  switch (action.type) {
    case 'REGISTER_POINT':
      let date = action.payload.date;
      let newState = Immutable.fromJS(state);
      if (newState.has(date)) {

        let points = newState.get(date).get('points').push(action.payload).toArray();
        return newState.set(
          date,
          {
            points: points
          }
        ).toObject();
      }
      return newState.set(date, {points: [action.payload]}).toObject();
      //return state.set(date, List.of(action.point));
    default:
      return state;
  }
}
