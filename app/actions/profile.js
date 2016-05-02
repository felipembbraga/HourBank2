import React, { ToastAndroid } from 'react-native';
import {initFetch, finishFetch} from './fetchData';
import getBaseRef from '../env';
import type { Action, Profile, ImageData } from './types'

type AuthResponseAction = (session: FBResponse) => Action;

const fbase = getBaseRef();

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

// export function createProfile(profile: Profile): ThunkAction {
//   return async (dispatch) => {
//
//       // cria as actions
//       dispatch(initFetch('Aguarde...'));
//
//       try {
//
//         console.log(profile);
//
//         // Cria o filho do tipo profile
//         let userRef = fbase.child('profile').push();
//
//         // Salva o profile
//         await userRef.set(profile);
//         dispatch(finishFetch());
//
//       } catch (err) {
//         console.log(err);
//         // Dispara o erro, caso não complete o registro
//         dispatch(finishFetch());
//       }
//   }
// }

export function changeProfile(userId : string, profile: Profile): ThunkAction {

  return async (dispatch) => {

      // cria as actions
      const changeProfileReducer = authResponse('CHANGE_PROFILE');

      dispatch(initFetch('Aguarde...'));


      try {
        // altera os dados do profile no firebase
        let userRef = fbase.child('profile').child(userId);
        await userRef.update({name: profile.name});
        ToastAndroid.show('Alterado com sucesso!', ToastAndroid.SHORT);

        userRef.on("value", function(snapshot) {

        dispatch(changeProfileReducer(snapshot.val()));
        dispatch(finishFetch());

        }, function (errorObject) {
          dispatch(finishFetch());
          ToastAndroid.show('Ocorreu um erro.', ToastAndroid.SHORT);
        });

      } catch (err) {
        // Dispara o erro, caso não complete o registro
        dispatch(finishFetch());
        ToastAndroid.show('Ocorreu um erro.', ToastAndroid.SHORT);
      }
  }
}

export function changeImageUser(userId : string, picture: ImageData, profile: Profile): ThunkAction {
  return async (dispatch) => {

      // cria as actions
      const changeProfileReducer = authResponse('CHANGE_PROFILE');

      dispatch(initFetch('Aguarde...'));

      try {

        // altera os dados do profile no firebase
        let userRef = fbase.child('profile').child(userId);
        await userRef.update({image: picture});
        ToastAndroid.show('Alterado com sucesso!', ToastAndroid.SHORT);


        userRef.once("value", function(snapshot) {

        dispatch(changeProfileReducer(snapshot.val()));
        dispatch(finishFetch());

        }, function (errorObject) {
          dispatch(finishFetch());
          ToastAndroid.show('Ocorreu um erro.', ToastAndroid.SHORT);
        });

      } catch (err) {
        // Dispara o erro, caso não complete o registro
        dispatch(finishFetch());
        ToastAndroid.show('Ocorreu um erro.', ToastAndroid.SHORT);
      }
  }
}
