

export type State = {
    isLoggedIn: boolean,
    didInvalidate: boolean,
    error: ? string,
    id: ? string,
    email: ? string,
    registered: boolean,
    name: ? String,
    image: ? String,
    key: ? String
};



const initialState = {
    isLoggedIn: false,
    didInvalidate: false,
    error: null,
    id: null,
    email: null,
    isRegistered: false,
    name: null,
    image: null,
    key: null
};

export default function user(state: State = initialState, action) {
    switch (action.type) {
        case 'SIGNIN':
            return {
                ...state,
                id: action.payload.session.user.uid,
                    key: action.payload.session.user.key,
                    email: action.payload.session.user.email,
                    name: action.payload.session.profile.name,
                    image: action.payload.session.profile.image,
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
        case 'CHANGE_PROFILE':
            console.log(action.payload.session);
            return {
              ...state,
              name: action.payload.session.name,
              image: action.payload.session.image
            };
        default:
            return state;

    }
}
