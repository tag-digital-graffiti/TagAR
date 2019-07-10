import axios from 'axios';
const { SERVER_URL } = require('../constants')

const GET_USER = 'GET_USER'
const GET_ERROR = 'GET_ERROR'

const initialState = {
  currentUser: {},
  error: ''
}

const getUser = user => ({ type: GET_USER, user })
const gotError = error => ({ type: GET_ERROR, error })

export const auth = (username, password) => async dispatch => {
  try {
    let { data } = await axios.post(`${SERVER_URL}/auth/login`, { username, password })
    console.log(data)
    if (typeof data == 'object') {
      try {
        dispatch(getUser(data))
      } catch (error) {
        console.error(error)
      }
    } else {
      dispatch(gotError(data))
    }
  } catch (error) {
    console.error(error)
  }
}

export const setUser = (userId) => async dispatch => {
  try {
    let { data } = await axios.get(`${SERVER_URL}/api/user/${userId}`)
    dispatch(getUser(data))
  } catch (error) {
    console.error(error)
  }
}

export const signUpUser = (username, password) => async dispatch => {
  try {
    let { data } = await axios.post(`${SERVER_URL}/auth/signup`, { username, password })
    console.log(data)
    if (typeof data == 'object') {
      try {
        dispatch(getUser(data))
      } catch (error) {
        console.error(error)
      }
    } else {
      dispatch(gotError(data))
    }
  } catch (error) {
    console.error(error)
  }
}
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return { ...state, currentUser: action.user };
    case GET_ERROR:
      return { ...state, error: action.error }
    default:
      return state;
  }
}
