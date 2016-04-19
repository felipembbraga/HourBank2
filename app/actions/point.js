
function fetchingGeoPoint() {
  return {
    type: 'FETCHING_GEO'
  }
}

function errorGeoPoint(error) {
  return {
    type: 'ERROR_GEO',
    payload: error
  }
}

export function cleanErrorState() {
  return {
    type: 'CLEAN_ERROR_STATE'
  }
}

function registerPoint(geolocation, kind) {
  return {
    type: 'REGISTER_POINT',
    payload: {
      hour: new Date(),
      geolocation,
      kind
    }
  }
}

export function hitInPoint() {
  return dispatch => {
    dispatch(fetchingGeoPoint());
    navigator.geolocation.getCurrentPosition(
      (position) => { dispatch(registerPoint(position, 'getIn')) },
      (error) => { dispatch(errorGeoPoint(error.message)) }
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
