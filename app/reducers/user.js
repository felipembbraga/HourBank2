

export type State = {
    isLoggedIn: boolean,
    isFetching: boolean,
    didInvalidate: boolean,
    error: ? string,
    id: ? string,
    email: ? string,
    registered: boolean
};



const initialState = {
    isLoggedIn: false,
    isFetching: false,
    didInvalidate: false,
    error: null,
    id: null,
    email: null,
    isRegistered: false
};

export default function user(state: State = initialState, action) {
    switch (action.type) {
        case 'SIGNIN_REQUEST':
            return {
                ...state,
                isFetching: true,
                didInvalidate: false,
                error: null
            };
        case 'SIGNIN_RESPONSE':
            return {
                ...state,
                id: action.payload.session.uid,
                email: action.payload.session.password.email,
                isLoggedIn: true,
                isFetching: false
            };
        case 'SIGNIN_ERROR':
            return {
                ...state,
                isFetching: false,
                didInvalidate: true,
                error: action.payload
            };
        case 'SIGNUP_REQUEST':
            return {
                ...state,
                isFetching: true,
                didInvalidate: false,
                error: null
            };
        case 'SIGNUP_RESPONSE':
            return {
                ...state,
                isFetching: false,
                isRegistered: true
            };
        case 'SIGNUP_ERROR':
            return {
                ...state,
                isFetching: false,
                didInvalidate: true,
                error: action.payload
            };
        case 'RESET_AUTH':
            return initialState;
        default:
            return state;

    }
}
