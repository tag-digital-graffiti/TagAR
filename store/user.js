import Axios from 'axios';
import { AsyncStorage } from 'react-native';
const GET_USER = 'GET_USER';
let server = 'http://192.168.1.4:8080';

const initalState = {
  user: {},
};

const getUser = user => ({ type: GET_USER, user });

const getLogInUser = userSignUpInfo => {
  return async dispatch => {
    try {
      let { data } = await Axios.post(`${server}/api/user`, userSignUpInfo);
      dispatch(getUser(data));
    } catch (error) {
      console.log(error);
    }
  };
};
