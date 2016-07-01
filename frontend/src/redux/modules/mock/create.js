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

const SAVE_BIN_DATAS_REQUEST = 'SAVE_BIN_DATAS_REQUEST'
const SAVE_BIN_DATAS_SUCCESS = 'SAVE_BIN_DATAS_SUCCESS'
const SAVE_BIN_DATAS_FAILURE = 'SAVE_BIN_DATAS_FAILURE'


// ------------------------------------
// Actions (Action Creator)
// ------------------------------------
export const saveDatas = (data) => {
  let fetchOptions = getFetchOptions(getApiPath('apis'), 'POST', {
      body: JSON.stringify( data )
    })

  return {
    [CALL_API]: {
      ...fetchOptions,
      types: [
        SAVE_BIN_DATAS_REQUEST,
        {
          type: SAVE_BIN_DATAS_SUCCESS,
          payload: (action, state, json) => json.data
          // ,meta: {
          //   transition: function(state, { payload }) {
          //     return {
          //       path: getBasePath() + '/examples/tag/list',
          //       state: { refresh: true }
          //     }
          //   }
          // }
        }, 
        SAVE_BIN_DATAS_FAILURE
      ]
    }
  }
}


/**
 * 暴露actions到外面，方便使用react-redux connect绑定到Container Component
 */
export const actions = {
  saveDatas
}


// ------------------------------------
// Reducers
// ------------------------------------

const initialState = {
  detail: null,
  saved: false
}


export default handleActions({

  [SAVE_BIN_DATAS_SUCCESS] (state, { payload }) {
    return {...state, saved: true}
  },

  [SAVE_BIN_DATAS_FAILURE] (state, { payload }) {
    return {...state, saved: false}
  }

}, initialState)
