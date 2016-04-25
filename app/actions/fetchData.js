import type {Action} from './types';

export function initFetch(message: string): Action {
  return {
    type: 'FETCHING',
    payload: message
  }
}

export function finishFetch(message: string): Action {
  return {
    type: 'FETCHED'
  }
}
