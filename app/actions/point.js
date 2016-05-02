import React, { ToastAndroid, TimePickerAndroid } from 'react-native';
import moment from 'moment';
import Immutable from 'immutable';
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


export function loadPoints(date, userId) {
  return async dispatch => {
    dispatch(initFetch('Carregando seus dados...'));
    try {
      let path = `points/${userId}/${date}`
      let snapshot = await fbase.child(path)
        .once('value');
      console.log(path);
      if(snapshot.exists()) {
        let points = snapshot.val();
        for(let key in points) {
          dispatch(registerPoint(points[key]));
        }
      };
    } catch (e) {
      console.log(e.message);
    } finally {
      dispatch(finishFetch());
    }
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
          // converte o timestamp
          let time = moment.unix(timezone.timestamp).add(3, 'hour');
          let date = time.format('YYYY/MM/DD');

          // firebase
          let path = `points/${userId}/${date}`
          let pointRef = fbase.child(path).push();


          let point = {
            key: pointRef.key(),
            pointType,
            location: {latitude, longitude},
            date,
            hour: time.hour(),
            minute: time.minute(),
            createdAt: time.toISOString(),
            picture
          };

          try {
            dispatch(initFetch('Salvando os dados...'));
            await pointRef.set(point);
            dispatch(registerPoint(point));
            ToastAndroid.show('Ponto batido!', ToastAndroid.SHORT);
          } catch (e) {
            ToastAndroid.show('Erro ao salvar os dados.', ToastAndroid.SHORT);
          }
        } catch (e) {
          console.log(e.message);
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

export function editPoint(selectedPoint, observation, userId) {
  return async (dispatch, getState) => {
    try {

      // TODO: verificar os pontos anterior e posterior para não alterar
      // fora da range entre um e outro
      // let currentState = Immutable.fromJS(getState().officeHours);
      // let points  = currentState.get(selectedPoint.date).get('points');
      // let index = points.findIndex(point => point.get('key') === selectedPoint.key);
      // let indexBefore = index > 0 ? index - 1 : undefined;
      // let indexAfter = index < points.size -1 ? index + 1 : undefined;
      //
      // let pointBefore = !isNaN(indexBefore) ? points.get(indexBefore).toJS() : null;
      // let pointAfter = !isNaN(indexAfter) ? points.get(indexAfter).toJS() : null;


      const {action, hour, minute} = await TimePickerAndroid.open({
        hour: selectedPoint.hour,
        minute: selectedPoint.minute,
        is24Hour: true, // Will display '2 PM'
      });
      if (action !== TimePickerAndroid.dismissedAction) {

        let time = moment();
        let path = `points/${userId}/${selectedPoint.date}/${selectedPoint.key}`;
        let pointRef = fbase.child(path);
        let point = {
          ...selectedPoint,
          hour,
          minute,
          edited: true,
          observation,
          updatedAt: time.toISOString()
        };
        try {
          dispatch(initFetch('Salvando os dados...'));
          let error = await pointRef.update(point);
          if (error) {
            throw "Erro ao salvar seu ponto";
          }
          dispatch(registerPoint(point));
          ToastAndroid.show('Ponto Alterado.', ToastAndroid.SHORT);
        } catch (e) {
          ToastAndroid.show('Erro ao salvar os dados.', ToastAndroid.SHORT);
        } finally {
          dispatch(finishFetch());
        }

      } else {
        ToastAndroid.show('Cancelado.', ToastAndroid.SHORT);
      }

    } catch (e) {
      ToastAndroid.show('Erro ao pegar a hora.', ToastAndroid.SHORT);
      console.log(e.message);
    }
  }
}
