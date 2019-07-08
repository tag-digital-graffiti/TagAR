import Axios from 'axios';
import { AsyncStorage } from 'react-native';

let server = 'http://172.16.27.142:8080';

const GET_USER = 'GET_USER';
const initialState = {};

const getUser = user => ({ type: GET_USER, user });

export const getLogInUser = userSignUpInfo => {
  return async dispatch => {
    try {
      const { data } = await Axios.post(`${server}/api/user`, userSignUpInfo);
      dispatch(getUser(data));
    } catch (error) {
      console.log(error);
    }
  };
};
export const loginUser = () => async dispatch => {
  try {
    const { data } = await Axios.get(`${server}/api/user`);
    dispatch(getUser(data));
  } catch (error) {
    console.log(error);
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    default:
      return state;
  }
}
