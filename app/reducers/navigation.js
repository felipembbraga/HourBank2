import type {Action} from '../actions/types';

export type Tab =
    'home'
  | 'my-schedule'
  | 'map'
  | 'notifications'
  | 'info';
type State = {
  tab: Tab;
};
const initialState: State = {
  tab: 'home'
}

export default function navigation(
  state: State = initialState,
  action: Action
): State {
  switch (action.type) {
    case 'SWITCH_TAB':
      return { tab: action.payload };
    case 'RESET_AUTH':
      return initialState;
    default:
      return state;
  }
}
