import axios from 'axios';

// const server = 'http://tag-sever-ar.herokuapp.com';
const server = 'http://172.16.25.113:8080';


const GET_USER = 'GET_USER'
const GET_ERROR = 'GET_ERROR'


const initialState = {}


const getUser = user => ({ type: GET_USER, user })



export const auth = (username, password) => async dispatch => {
  try {
    let { data } = await axios.post(`${server}/auth/login`, { username, password })
    if (typeof data == 'object') {
      try {
        dispatch(getUser(data))
      } catch (error) {
        console.error(error)
      }
    }
  } catch (error) {
    console.error(error)
  }
}

export const setUser = (userId) => async dispatch => {
  try {
    let { data } = await axios.get(`${server}/api/user/${userId}`)
    dispatch(getUser(data))
  } catch (error) {
    console.error(error)
  }
}

export const signUpUser = (username, password) => async dispatch => {
  try {
    let { data } = await axios.post(`${server}/auth/signup`, { username, password })
    if (typeof data == 'object') {
      try {
        dispatch(getUser(data))
      } catch (error) {
        console.error(error)
      }
    }
  } catch (error) {
    console.error(error)
  }
}
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    default:
      return state;
  }
}
