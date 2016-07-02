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

const FETCH_BIN_LIST_REQUEST = 'FETCH_BIN_LIST_REQUEST'
const FETCH_BIN_LIST_SUCCESS = 'FETCH_BIN_LIST_SUCCESS'
const FETCH_BIN_LIST_FAILURE = 'FETCH_BIN_LIST_FAILURE'

const DO_TEST_BINS_REQUEST = 'DO_TEST_BINS_REQUEST'
const DO_TEST_BINS_SUCCESS = 'DO_TEST_BINS_SUCCESS'
const DO_TEST_BINS_FAILURE = 'DO_TEST_BINS_FAILURE'


// ------------------------------------
// Actions (Action Creator)
// ------------------------------------
export const fetchBinList = (data) => {
  let fetchOptions = getFetchOptions(getApiPath('api/apis'))

  return {
    [CALL_API]: {
      ...fetchOptions,
      types: [
        FETCH_BIN_LIST_REQUEST,
        {
          type: FETCH_BIN_LIST_SUCCESS,
          payload: (action, state, json) => json.data
        }, 
        FETCH_BIN_LIST_FAILURE
      ]
    }
  }
}

export const doTestBins = (data) => {
  let fetchOptions = getFetchOptions(getApiPath('api/test/selection'), 'POST', {
    body: JSON.stringify( data )
  })

  return {
    [CALL_API]: {
      ...fetchOptions,
      types: [
        DO_TEST_BINS_REQUEST,
        {
          type: DO_TEST_BINS_SUCCESS,
          payload: (action, state, json) => json.data
          ,meta: {
            transition: function(state, { payload }) {
              return {
                path: getBasePath() + '/bin/test-result'
              }
            }
          }
        }, 
        DO_TEST_BINS_FAILURE
      ]
    }
  }
}


/**
 * 暴露actions到外面，方便使用react-redux connect绑定到Container Component
 */
export const actions = {
  fetchBinList,
  doTestBins
}


// ------------------------------------
// Reducers
// ------------------------------------

const initialState = {
  list: null,
  pending: true,
  errors: null
}


export default handleActions({

  [FETCH_BIN_LIST_REQUEST] (state) {
    return {...state, pending: true, errors: null}
  },

  [FETCH_BIN_LIST_SUCCESS] (state, { payload }) {
    return {...state, list: payload, false}
  },

  [FETCH_BIN_LIST_FAILURE] (state, { payload }) {
    return {...state, pending: false, errors: payload}
  },

  [DO_TEST_BINS_REQUEST] (state) {
    return {...state, errors: null}
  },

  [DO_TEST_BINS_FAILURE] (state, { payload }) {
    return {...state, errors: payload}
  }

}, initialState)
