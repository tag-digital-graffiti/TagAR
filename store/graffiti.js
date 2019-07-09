import axios from 'axios';

// const server = 'http://tag-sever-ar.herokuapp.com';
const server = 'http://172.16.26.218:8080';

const GET_NEARBY_TAGS = 'GET_NEARBY_TAG';
const GET_ALL_TAGS = 'GET_ALL_TAGS';
const GET_SELECTED_TAG = 'GET_SELECTED_TAG';

const initialState = {
  nearByTags: [],
  selectedTag: {},
  allTags: []
};

const gotNearbyTags = tags => ({
  type: GET_NEARBY_TAGS,
  tags
});

const gotAllTags = tags => ({
  type: GET_ALL_TAGS,
  tags
});

const gotSelectedTag = tag => ({
  type: GET_SELECTED_TAG,
  tag
});

export const getNearbyTags = (lat, long) => {
  return async dispatch => {
    try {
      let { data } = await axios.get(
        `${server}/api/tags/?lat=${lat}&long=${long}`
      );
      const reversedTags = data.reverse();
      dispatch(gotNearbyTags(reversedTags));
    } catch (error) {
      console.warn(error);
    }
  };
};

export const getAllTags = () => {
  return async dispatch => {
    try {
      console.log('hello')
      let { data } = await axios.get(`${server}/api/tags/tags`);
      dispatch(gotAllTags(data));
    } catch (error) {
      console.warn(error);
    }
  };
};

export const getSelectedTag = id => {
  return async dispatch => {
    try {
      let { data } = await axios.get(`${server}/api/tags/${id}`);
      dispatch(gotSelectedTag(data));
    } catch (error) {
      console.warn(error);
    }
  };
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_NEARBY_TAGS:
      return { ...state, nearByTags: action.tags };
    case GET_ALL_TAGS:
      return { ...state, allTags: action.tags };
    case GET_SELECTED_TAG:
      return { ...state, selectedTag: action.tag };
    default:
      return state;
  }
}
