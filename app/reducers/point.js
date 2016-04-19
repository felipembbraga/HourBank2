

const initialState = {
    points: [],
};

export function point(state: initialState, action) {
  switch (action.type) {
    case 'REGISTER_POINT':
      return {
        ...state,
        points: [
          ...state.points,
          action.payload
        ]
      };
    default:
      return state;
  }
}
