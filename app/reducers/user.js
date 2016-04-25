

export type State = {
    isLoggedIn: boolean,
    didInvalidate: boolean,
    error: ? string,
    id: ? string,
    email: ? string,
    registered: boolean
};



const initialState = {
    isLoggedIn: false,
    didInvalidate: false,
    error: null,
    id: null,
    email: null,
    isRegistered: false
};

export default function user(state: State = initialState, action) {
    switch (action.type) {
        case 'SIGNIN':
            return {
                ...state,
                id: action.payload.session.uid,
                email: action.payload.session.password.email,
                isLoggedIn: true
            };
        case 'SIGNIN_ERROR':
            return {
                ...state,
                didInvalidate: true,
                error: action.payload
            };
        case 'SIGNUP':
            return {
                ...state,
                isRegistered: true
            };
        case 'SIGNUP_ERROR':
            return {
                ...state,
                didInvalidate: true,
                error: action.payload
            };
        case 'RESET_AUTH':
            return initialState;
        default:
            return state;

    }
}
