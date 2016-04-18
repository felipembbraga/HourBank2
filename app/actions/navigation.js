import type { Action } from './types';

type Tab = 'home' | 'my-schedule' | 'map' | 'notifications' | 'info';

export function switchTab(tab: Tab): Action {
  return {
    type: 'SWITCH_TAB',
    payload: tab
  }
}
