const GET_CURRENT_LOCATION = 'GET_CURRENT_LOCATION';

const initialState = {
  currentLocation: [],
};

export const getCurrentLocation = location => ({
  type: GET_CURRENT_LOCATION,
  location,
});

export default function (state = initialState, action) {
  let stateCopy = { ...state };
  switch (action.type) {
    case GET_CURRENT_LOCATION:
      stateCopy.currentLocation = action.location;
      return stateCopy;
    default:
      return state;
  }
}
