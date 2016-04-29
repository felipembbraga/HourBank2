
// usuário
export type User = {
  email: string,
  password: string,
  image: ImageData
}

export type Profile = {
    name: string
}


export type PointType = 'in' | 'out';

export type ImageData = {
  uri: 'string',
  isStatic: boolean
}

export type Point = {
  let point = {
    pointType: PointType,
    location: Object,
    date: string,
    hour: number,
    minute: number,
    picture: ImageData
  };
}

// json resposta do firebase
export type FBResponse = Object;

// actions
export type Action = {
  type: 'SIGNIN',
  payload: {
    session: FBResponse,
    lastLogin: Date
  }
} | {
  type: 'SIGNIN_ERROR',
  payload: string,
  error: boolean
} | {
  type: 'SIGNUP',
  payload: {
    session: FBResponse,
    lastLogin: Date
  }
} | {
  type: 'SIGNUP_ERROR',
  payload: string,
  error: boolean
} | {
  type: 'RESET_AUTH'
} | {
  type: 'SWITCH_TAB',
  payload: string
} | {
  type: 'FETCHING',
  payload: string
} | {
  type: 'FETCHED'
} | {
  type: 'REGISTER_POINT',
  payload: Point
};

// state
export type GetState = () => Object;

// Action que passa pelo middleware redux-thunk
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;

// Action que passa pelo middleware redux-promise
export type PromiseAction = Promise<Action>;

// dispatch
export type Dispatch = (action: Action | ThunkAction | PromiseAction) => any;
