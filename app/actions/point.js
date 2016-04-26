import React, { ToastAndroid } from 'react-native';
import moment from 'moment';
import {initFetch, finishFetch} from './fetchData';
import {getTime} from '../resource/timezonedb';
import type { Action, ImageData, Point, PointType, ThunkAction } from './types'


function registerPoint(point: Point): Action {
  return {
    type: 'REGISTER_POINT',
    payload: point
  }
}

export function hitPoint(pointType: PointType, picture: ImageData): ThunkAction {
  return dispatch => {
    dispatch(initFetch('Buscando Geolocalização...'));
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          dispatch(initFetch('Buscando a hora da rede...'));

          let timezone = await getTime(position);
          console.log('aqui');
          // converte o timestamp
          let time = moment.unix(timezone.timestamp).add(3, 'hour');

          let date = time.format('DD/MM/YYYY');

          let point = {
            pointType,
            location: position,
            date,
            hour: time.hour(),
            minute: time.minute(),
            picture
          };

          dispatch(registerPoint(point));
          ToastAndroid.show('Ponto batido!', ToastAndroid.SHORT);
        } catch (e) {
          ToastAndroid.show('Erro em receber a hora da rede.', ToastAndroid.SHORT);
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
