import { createAction, handleActions } from 'redux-actions'
import { CALL_API, getJSON, ApiError } from 'redux-api-middleware'

import getApiPath from '../../../helpers/getApiPath';
import getFetchOptions from '../../../helpers/getFetchOptions';
import getBasePath from '../../../helpers/getBasePath';

// ------------------------------------
// Constants (Action Types)
// ------------------------------------

/**
 * 这里需要使用Symbol类型，避免和其它模块的值相同
 */
const FETCH_REQUEST = Symbol('FETCH_REQUEST')
const FETCH_FAILURE = Symbol('FETCH_FAILURE')
const FETCH_PATH_SUCCESS = 'FETCH_PATH_SUCCESS';
const FETCH_MOCK_LIST_SUCCESS = 'FETCH_MOCK_LIST_SUCCESS';

// ------------------------------------
// Actions (Action Creator)
// ------------------------------------
export const fetchPath = (pathid,callback) => {
  let fetchOptions = getFetchOptions(getApiPath('api/apis/'+pathid))

  return {
    [CALL_API]: {
      ...fetchOptions,
      complete:callback,
      types: [
        FETCH_REQUEST,
        {
          type: FETCH_PATH_SUCCESS,
          payload: (action, state, json) => json.data
        }, 
        FETCH_FAILURE
      ]
    }
  }
}

export const fetchMocklist = (pathid,callback) => {
  let fetchOptions = getFetchOptions(getApiPath('api/mocks', {pathid: pathid}))

  return {
    [CALL_API]: {
      ...fetchOptions,
      complete:callback,
      types: [
        FETCH_REQUEST,
        {
          type: FETCH_MOCK_LIST_SUCCESS,
          payload: (action, state, json) => json.data
        }, 
        FETCH_FAILURE
      ]
    }
  }
}

export const removeMock = (mockid,callback) => {
  let fetchOptions = getFetchOptions(getApiPath('api/mock/remove', {mockid: mockid}))

  return {
    [CALL_API]: {
      ...fetchOptions,
      complete:callback,
      types: [
        FETCH_REQUEST,
        {
          type: 'REMOVE_MOCK_SUCCESS',
          payload: (action, state, json) => json.data
        }, 
        FETCH_FAILURE
      ]
    }
  }
}

/**
 * 暴露actions到外面，方便使用react-redux connect绑定到Container Component
 */
export const actions = {
  fetchPath,
  fetchMocklist,
  removeMock
}


// ------------------------------------
// Reducers
// ------------------------------------

const initialState = {
  pathname:'',
  pathid:'',
  mocks:[]
}


export default handleActions({
  [FETCH_PATH_SUCCESS] (state, {payload}){
    return {...state, pathname: payload.summary, pathid:payload.name}
  },

  [FETCH_MOCK_LIST_SUCCESS] (state, {payload}){
    return {...state, mocks: payload}
  }
}, initialState)
