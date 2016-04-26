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

      // pega a data do ponto
      let date = action.payload.date;

      // cria um novo state
      let newState = Immutable.fromJS(state);

      // se existe uma data mapeada no state (state['DD/MM/YYYY']), insere o
      // ponto na lista de pontos dessa data
      if (newState.has(date)) {
        return newState.set(
          date,
          {
            points: newState.get(date).get('points').push(action.payload).toJS()
          }
        ).toObject();
      }

      // cria uma nova data e insere a lista com o primeiro ponto do dia
      return newState.set(date, {points: [action.payload]}).toObject();
    default:
      return state;
  }
}
