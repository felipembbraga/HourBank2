import React, {
    fetch
} from 'react-native';
import { initFetch, finishFetch } from './fetchData';
import getBaseRef from '../env';


import type {
    Action,
    FBResponse,
    ThunkAction,
    User
} from './types';

type AuthRequestAction = (user: User) => Action;
type AuthResponseAction = (session: FBResponse) => Action;
type AuthErrorAction = (error: string) => Action;

// Erros de autenticação/ registro de usuário do firebase
const fbAuthErrors = {
    AUTHENTICATION_DISABLED: 'No momento o banco de dados está indisponível.',
    EMAIL_TAKEN: 'Este email já está sendo usado.',
    INVALID_ARGUMENTS: 'Argumentos inválidos.',
    INVALID_CREDENTIALS: 'Suas credenciais são inválidas.',
    INVALID_EMAIL: 'Este email não é válido',
    INVALID_PASSWORD: 'Sua senha está incorreta.',
    INVALID_USER: 'O usuário não existe.'
}

// referencia do firebase
const baseRef = getBaseRef();


/**
 * função que cria uma action de request para o modulo auth
 * @param  {string} type -> tipo de action
 * @return {function} action
 */
function authRequest(type: string): AuthRequestAction {
    return (user) => ({
        type,
        payload: user
    })
}
/**
 * função que cria uma action de response para o modulo auth
 * @param  {string} type -> tipo de action
 * @return {function} action
 */
function authResponse(type: string): AuthResponseAction {
    return (session) => {
        return {
            type,
            payload: {
                session,
                lastLogin: Date.now()
            }
        };
    };
}

/**
 * função que cria uma action de erro na request para o modulo auth
 * @param  {string} type -> tipo de action
 * @return {function} action
 */
function authError(type: string): AuthErrorAction {
    return (error) => ({
        type,
        payload: fbAuthErrors[error.code] || 'Erro desconhecido.',
        error: true
    });
}

/**
 * action para login
 * @param  {User} user
 * @return {function} -> action que passa pela middleware redux-thunk
 */
export function signIn(user: User): ThunkAction {
  return async (dispatch) => {
    // cria as actions
    const signin = authResponse('SIGNIN');
    const error = authError('SIGNIN_ERROR');

    // dispara a action de request
    dispatch(initFetch('Conectando...'));
    dispatch(resetAuth());
    try {
      // faz o login no firebase e dispara a action de signin
      let authData = await baseRef.authWithPassword(user);

      console.log(user);
      console.log(authData.uid);

      let userRef = baseRef.child('profile').child(authData.uid);
      userRef.once("value", function(snapshot) {

        let mUser = {
          uid: authData.uid,
          email: authData.password.email
        }

        let mProfile = {
          name: snapshot.val().name,
          image: snapshot.val().image
        }

        let mData = {
          user: mUser,
          profile: mProfile
        }

        console.log(mData);

        dispatch(signin(mData));
        dispatch(finishFetch());

      }, function (errorObject) {
        dispatch(error(errorObject));
        dispatch(finishFetch());
      });

    } catch (err) {
      // Dispara o erro, caso não complete o login
      dispatch(error(err));
      dispatch(finishFetch());
    }


  }
}

/**
 * action para registro de usuário
 * @param  {User} user
 * @return {function} -> action que passa pela middleware redux-thunk
 */
export function signUp(user: User): ThunkAction {
    return async (dispatch) => {

        //cria as actions
        const signup = authResponse('SIGNUP');
        const error = authError('SIGNUP_ERROR');

        dispatch(initFetch('Registrando...'));
        dispatch(resetAuth());

        try {
          // faz o registro no firebase e dispara a action de signup
          let authData = await baseRef.createUser(user);

          // Cria o filho do tipo profile
          let userRef = baseRef.child('profile').child(authData.uid);

          // Define como sera o objeto profile a ser salvo
          let profile = {
            name: user.name
          };

          // Salva o profile
          await userRef.set(profile);

          dispatch(signup(authData));
        } catch (err) {
          // Dispara o erro, caso não complete o registro
          dispatch(error(err));
        } finally {
          // remove a tela de loading
          dispatch(finishFetch());
        }
    }
}

/**
 * action que reseta o state do user
 */
export function resetAuth(): Action {
    return {
        type: 'RESET_AUTH'
    };
}
