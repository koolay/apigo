import { createAction, handleActions } from 'redux-actions'
import { CALL_API, getJSON, ApiError } from 'redux-api-middleware'

import getApiPath from '../../../../helpers/getApiPath';
import getFetchOptions from '../../../../helpers/getFetchOptions';

// ------------------------------------
// Constants (Action Types)
// ------------------------------------
const FETCH_POPULATOIN_TAG_LIST_REQUEST = 'FETCH_POPULATOIN_TAG_LIST_REQUEST'
const FETCH_POPULATOIN_TAG_LIST_SUCCESS = 'FETCH_POPULATOIN_TAG_LIST_SUCCESS'
const FETCH_POPULATOIN_TAG_LIST_FAILURE = 'FETCH_POPULATOIN_TAG_LIST_FAILURE'

const DEL_POPULATION_TAG_REQUEST = 'DEL_POPULATION_TAG_REQUEST'
const DEL_POPULATION_TAG_SUCCESS = 'DEL_POPULATION_TAG_SUCCESS'
const DEL_POPULATION_TAG_FAILURE = 'DEL_POPULATION_TAG_FAILURE'

// ------------------------------------
// Actions (Action Creator)
// ------------------------------------
export const fetchList = (currentPage) => {
  
  let fetchOptions = getFetchOptions(getApiPath('api/tag/list?page=' + currentPage))
  return {
    [CALL_API]: {
      ...fetchOptions,
      types: [
        FETCH_POPULATOIN_TAG_LIST_REQUEST,
        {
          type: FETCH_POPULATOIN_TAG_LIST_SUCCESS,
          payload: (action, state, json) => Object.assign(json.data, {page: currentPage})
        }, 
        FETCH_POPULATOIN_TAG_LIST_FAILURE
      ]
    }
  }
}

export const deleteItem = (params) => {
  let fetchOptions = getFetchOptions(getApiPath('api/tag/delete'), 'POST', {
      body: JSON.stringify( params )
    })

  return {
    [CALL_API]: {
      ...fetchOptions,
      types: [
        DEL_POPULATION_TAG_REQUEST,
        {
          type: DEL_POPULATION_TAG_SUCCESS,
          payload: (action, state, json) => params.id //删除成功后，这里直接返回ID值，以便reducer更新数据
        }, 
        DEL_POPULATION_TAG_FAILURE
      ]
    }
  }
}

/**
 * 暴露actions到外面，方便使用react-redux connect绑定到Container Component
 */
export const actions = {
  fetchList,
  deleteItem
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
  pending: true,
  /**
   * 用来标识是否成功删除了数据，因为列表需要在删除数据后进行更新
   */
  deleted: false
}


export default handleActions({

  [FETCH_POPULATOIN_TAG_LIST_REQUEST] (state, { payload }) {
    return {...state, pending: true}
  },

  [FETCH_POPULATOIN_TAG_LIST_SUCCESS] (state, { payload }) {
    return {...state, list: payload.items, total: +payload.total, currentPage: payload.page, pending: false}
  },

  [FETCH_POPULATOIN_TAG_LIST_FAILURE] (state, { payload }) {
    return {...state, pending: false}
  },

  [DEL_POPULATION_TAG_REQUEST] (state, { payload }) {
    return {...state, pending: true, deleted: false}
  },
  
  [DEL_POPULATION_TAG_SUCCESS] (state, { payload }) {
    // 这里不把pending设为false，是因为在删除数据后，需要重新加载列表数据，那时pending的值会重新设为true, 这样会导致loading效果有闪现的问题
    return {...state, deleted: true}
  },

  [DEL_POPULATION_TAG_FAILURE] (state, { payload }) {
    return {...state, pending: false, deleted: false}
  }

}, initialState)
