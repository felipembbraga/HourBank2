import type { Action } from './types';

type Tab = 'home' | 'points';

export function switchTab(tab: Tab): Action {
  return {
    type: 'SWITCH_TAB',
    payload: tab
  }
}
