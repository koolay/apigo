import { createAction, handleActions } from 'redux-actions'
import { CALL_API } from 'redux-api-middleware'

import getApiPath from '../../../../helpers/getApiPath';
import getFetchOptions from '../../../../helpers/getFetchOptions';

// ------------------------------------
// Constants (Action Types)
// ------------------------------------
const FETCH_INDICATOR_LIST_REQUEST = 'FETCH_INDICATOR_LIST_REQUEST'
const FETCH_INDICATOR_LIST_SUCCESS = 'FETCH_INDICATOR_LIST_SUCCESS'
const FETCH_INDICATOR_LIST_FAILURE = 'FETCH_INDICATOR_LIST_FAILURE'

// ------------------------------------
// Actions (Action Creator)
// ------------------------------------
export const fetchList = (currentPage) => {
  
  let fetchOptions = getFetchOptions(getApiPath('api/indicator/list?page=' + currentPage))
  return {
    [CALL_API]: {
      ...fetchOptions,
      types: [
        FETCH_INDICATOR_LIST_REQUEST,
        {
          type: FETCH_INDICATOR_LIST_SUCCESS,
          payload: (action, state, json) => Object.assign(json.data, {page: currentPage})
        }, 
        FETCH_INDICATOR_LIST_FAILURE
      ]
    }
  }
}

/**
 * 暴露actions到外面，方便使用react-redux connect绑定到Container Component
 */
export const actions = {
  fetchList
}


// ------------------------------------
// Reducers
// ------------------------------------

const initialState = {
  list: [],
  total: 0,
  currentPage: 1,
  /**
   * 页面数据加载状态，由于页面在初始化完成后就立即加载数据，所以这里默认设为true
   */
  pending: true
}


export default handleActions({

  [FETCH_INDICATOR_LIST_REQUEST] (state, { payload }) {
    return {...state, pending: true}
  },

  [FETCH_INDICATOR_LIST_SUCCESS] (state, { payload }) {
    return {...state, list: payload.items, total: +payload.total, currentPage: payload.page, pending: false}
  },

  [FETCH_INDICATOR_LIST_FAILURE] (state, { payload }) {
    return {...state, pending: false}
  }

}, initialState)
