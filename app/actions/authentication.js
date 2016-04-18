import React, {
    fetch
} from 'react-native';
import getBaseRef from '../env';
import type {
    Action,
    FBResponse,
    ThunkAction,
    User
} from './types';

const fbAuthErrors = {
    AUTHENTICATION_DISABLED: 'No momento o banco de dados está indisponível.',
    EMAIL_TAKEN: 'Este email já está sendo usado.',
    INVALID_ARGUMENTS: 'Argumentos inválidos.',
    INVALID_CREDENTIALS: 'Suas credenciais são inválidas.',
    INVALID_EMAIL: 'Este email não é válido',
    INVALID_PASSWORD: 'Sua senha está incorreta.',
    INVALID_USER: 'O usuário não existe.'
}

const baseRef = getBaseRef();

function authRequest(type: string) {
    return (user: User) => ({
        type,
        payload: user
    })
}

function authResponse(type: string) {
    return (session: FBResponse) => {
        return {
            type,
            payload: {
                session,
                lastLogin: Date.now()
            }
        };
    };
}

function authError(type: string) {
    return (error) => ({
        type,
        payload: fbAuthErrors[error.code] || 'Erro desconhecido.',
        error: true
    });
}

export function signIn(user) {
    return dispatch => {
        const request = authRequest('SIGNIN_REQUEST');
        const response = authResponse('SIGNIN_RESPONSE');
        const error = authError('SIGNIN_ERROR');
        dispatch(request(user));
        baseRef.authWithPassword(user)
            .then((json) => dispatch(response(json)))
            .catch((err) => dispatch(error(err)));
    }
}

export function signUp(user) {
    return dispatch => {
        const request = authRequest('SIGNUP_REQUEST');
        const response = authResponse('SIGNUP_RESPONSE');
        const error = authError('SIGNUP_ERROR');
        dispatch(request(user));
        baseRef.createUser(user)
            .then((json) => dispatch(response(json)))
            .catch((err) => dispatch(error(err)));
    }
}

export function resetAuth() {
    return {
        type: 'RESET_AUTH'
    };
}
