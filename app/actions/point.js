import React, { ToastAndroid } from 'react-native';
import moment from 'moment';
import {initFetch, finishFetch} from './fetchData';
import {getTime} from '../resource/timezonedb';
import getBaseRef from '../env';
import type { Action, ImageData, Point, PointType, ThunkAction } from './types'

const fbase = getBaseRef();

function registerPoint(point: Point): Action {
  return {
    type: 'REGISTER_POINT',
    payload: point
  }
}

export function hitPoint(pointType: PointType, picture: ImageData, userId: string): ThunkAction {
  return dispatch => {
    dispatch(initFetch('Buscando Geolocalização...'));
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        let {latitude, longitude} = position.coords;
        try {
          dispatch(initFetch('Buscando a hora da rede...'));
          let timezone = await getTime({latitude, longitude});
          console.log('aqui');
          // converte o timestamp
          let time = moment.unix(timezone.timestamp).add(3, 'hour');
          let date = time.format('DD/MM/YYYY');
          let pointRef = fbase.child('points').push();
          let point = {
            key: pointRef.key(),
            pointType,
            location: {latitude, longitude},
            date,
            hour: time.hour(),
            minute: time.minute(),
            picture,
            userId
          };
          try {
            dispatch(initFetch('Salvando os dados...'));
            await pointRef.set(point);
            console.log(point);
            dispatch(registerPoint(point));
            ToastAndroid.show('Ponto batido!', ToastAndroid.SHORT);
          } catch (e) {
            ToastAndroid.show('Erro ao salvar os dados.', ToastAndroid.SHORT);
          }
        } catch (e) {
          ToastAndroid.show('Erro ao receber a hora da rede.', ToastAndroid.SHORT);
        } finally {
          dispatch(finishFetch());
        }
      },
      (error) => {
        ToastAndroid.show('Erro em receber a sua localização.', ToastAndroid.SHORT);
        dispatch(finishFetch());
      }
    );
  }
}

export function hitOutPoint() {
  return dispatch => {
    dispatch(fetchingGeoPoint());
    navigator.geolocation.getCurrentPosition(
      (position) => { dispatch(registerPoint(position, 'getOut')) },
      (error) => { dispatch(errorGeoPoint(error.message)) }
    );
  }
}
