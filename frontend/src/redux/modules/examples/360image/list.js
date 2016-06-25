import { createAction, handleActions } from 'redux-actions'
import { CALL_API } from 'redux-api-middleware'

import getApiPath from '../../../../helpers/getApiPath';
import getFetchOptions from '../../../../helpers/getFetchOptions';

// ------------------------------------
// Constants (Action Types)
// ------------------------------------
const SEARCH_IMAGE_CUSTOMER_DATAS_REQUEST = 'SEARCH_IMAGE_CUSTOMER_DATAS_REQUEST'
const SEARCH_IMAGE_CUSTOMER_DATAS_SUCCESS = 'SEARCH_IMAGE_CUSTOMER_DATAS_SUCCESS'
const SEARCH_IMAGE_CUSTOMER_DATAS_FAILURE = 'SEARCH_IMAGE_CUSTOMER_DATAS_FAILURE'

// ------------------------------------
// Actions (Action Creator)
// ------------------------------------
export const searchDatas = (params) => {
  
  let fetchOptions = getFetchOptions(getApiPath('api/360image/list'), 'POST', {
      body: JSON.stringify( params )
    })

  return {
    [CALL_API]: {
      ...fetchOptions,
      types: [
        SEARCH_IMAGE_CUSTOMER_DATAS_REQUEST,
        {
          type: SEARCH_IMAGE_CUSTOMER_DATAS_SUCCESS,
          payload: (action, state, json) => Object.assign(json.data, {searchParams: params})
        }, 
        SEARCH_IMAGE_CUSTOMER_DATAS_FAILURE
      ]
    }
  }
}

/**
 * 暴露actions到外面，方便使用react-redux connect绑定到Container Component
 */
export const actions = {
  searchDatas
}


// ------------------------------------
// Reducers
// ------------------------------------

const initialState = {
  /**
   * 用于缓存页面查询参数结果
   */
  searchParams: null,
  /**
   * 页面列表数据
   */
  list: null,
  /**
   * 当前查询条件下，查询结果总数
   */
  total: 0,
  /**
   * 当前表格数据分页的页码
   */
  currentPage: 1,
  /**
   * 数据加态状态
   */
  pending: false
}


export default handleActions({

  [SEARCH_IMAGE_CUSTOMER_DATAS_REQUEST] (state, { payload }) {
    return {...state, pending: true}
  },

  [SEARCH_IMAGE_CUSTOMER_DATAS_SUCCESS] (state, { payload }) {
    return {...state, list: payload.items, total: payload.total, currentPage: payload.searchParams.page, searchParams: payload.searchParams, pending: false}
  },

  [SEARCH_IMAGE_CUSTOMER_DATAS_FAILURE] (state, { payload }) {
    return {...state, pending: false}
  }

}, initialState)
