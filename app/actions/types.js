export type User = {
  email: string,
  password: string
}

export type FBResponse = Object;

export type Action = {
  type: 'SIGNIN',
  payload: User
} | {
  type: 'SIGNUP',
  payload: User
} | {
  type: 'SIGNIN_RESPONSE',
  payload: {
    session: FBResponse,
    lastLogin: Date
  }
} | {
  type: 'SIGNIN_ERROR',
  payload: any,
  error: boolean
} | {
  type: 'SIGNUP_RESPONSE',
  payload: {
    session: FBResponse,
    lastLogin: Date
  }
} | {
  type: 'SIGNUP_ERROR',
  payload: any
} | {
  type: 'SWITCH_TAB',
  payload: string
};

export type Dispatch = (action: Action | ThunkAction | PromiseAction | Array<Action>) => any;
export type GetState = () => Object;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
export type PromiseAction = Promise<Action>;
