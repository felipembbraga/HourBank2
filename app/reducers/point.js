import type {Point, Action} from '../actions/types';
import Immutable from 'immutable';

type OfficeHour = {
  date: string,
  points: Array<Point>
}

const initialState = {};



export default function officeHours(state: List = initialState, action: Action) {
  // cria um novo state
  let newState = Immutable.fromJS(state);

  switch (action.type) {
    case 'REGISTER_POINT':

      // pega a data do ponto
      let date = action.payload.date;

      // se existe uma data mapeada no state (state['DD/MM/YYYY']), insere o
      // ponto na lista de pontos dessa data
      if (newState.has(date)) {
        let points = newState.get(date).get('points');
        let index = points.findIndex(point => point.get('key') === action.payload.key);

        if(index >= 0){
          return newState.set(action.payload.date, {
            points: points.set(index, action.payload).toJS()
          }).toJS();
        }
        return newState.set(
          date,
          {
            points: newState.get(date).get('points').push(action.payload).toJS()
          }
        ).toJS();
      }

      // cria uma nova data e insere a lista com o primeiro ponto do dia
      return newState.set(date, {points: [action.payload]}).toJS();

    case 'EDIT_POINT':
      let points = newState.get(action.payload.date).get('points');
      let index = points.findIndex(point => point.get('key') === action.payload.key);
      console.log("index", index);
      return newState.set(action.payload.date, {
        points: points.set(index, action.payload).toJS()
      }).toJS();
    case 'RESET_AUTH':
      return initialState;
    default:
      return state;
  }
}
