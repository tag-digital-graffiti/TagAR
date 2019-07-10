import axios from 'axios';
const { SERVER_URL } = require('../constants')

const GET_USER = 'GET_USER'

const initialState = {}

const getUser = user => ({ type: GET_USER, user })

export const auth = (username, password) => async dispatch => {
  try {
    let { data } = await axios.post(`${SERVER_URL}/auth/login`, { username, password })
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
    let { data } = await axios.get(`${SERVER_URL}/api/user/${userId}`)
    dispatch(getUser(data))
  } catch (error) {
    console.error(error)
  }
}

export const signUpUser = (username, password) => async dispatch => {
  try {
    let { data } = await axios.post(`${SERVER_URL}/auth/signup`, { username, password })
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
