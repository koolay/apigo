import { createAction, handleActions } from 'redux-actions'
import { CALL_API, getJSON, ApiError } from 'redux-api-middleware'

import getApiPath from '../../../../helpers/getApiPath';
import getFetchOptions from '../../../../helpers/getFetchOptions';
import getUUID from '../../../../helpers/getUUID';
// ------------------------------------
// Constants (Action Types)
// ------------------------------------

/**
 * 这里需要使用Symbol类型，避免和其它模块的值相同
 */
const FETCH_REQUEST = Symbol('FETCH_REQUEST')
const FETCH_FAILURE = Symbol('FETCH_FAILURE')

const FETCH_IMAGE_COLUMN_DETAIL_REQUEST = 'FETCH_IMAGE_COLUMN_DETAIL_REQUEST'
const FETCH_IMAGE_COLUMN_DETAIL_SUCCESS = 'FETCH_IMAGE_COLUMN_DETAIL_SUCCESS'
const FETCH_IMAGE_COLUMN_DETAIL_FAILURE = 'FETCH_IMAGE_COLUMN_DETAIL_FAILURE'

const FETCH_IMAGE_TAGS_SUCCESS = 'FETCH_IMAGE_TAGS_SUCCESS'
const FETCH_IMAGE_COLUMN_SUCCESS = 'FETCH_IMAGE_COLUMN_SUCCESS'

// ------------------------------------
// Actions (Action Creator)
// ------------------------------------
export const fetchImageColumn = () => {
  let fetchOptions = getFetchOptions(getApiPath('api/360image/sections'))
  return {
    [CALL_API]: {
      ...fetchOptions,
      types: [
        FETCH_REQUEST,
        {
          type: FETCH_IMAGE_COLUMN_SUCCESS,
          payload: (action, state, json) => {
            let sections = json.data, pending = {};
            // 创建pending对象，key值为sectionId，这里不把pending直接放到sections里去，是为了方便后面获取
            // 在异步获取各个section的detail时，可以通过section.id从pending对象直接赋值
            if (Array.isArray(sections) && sections.length > 0) {
              sections.forEach(section => {
                // pending值默认为true
                pending[section.id] = true
              })
            }

            return { sections, pending }
          }
        }, 
        /**
         * FETCH_FAILURE 默认由redux-api-middleware处理，返回ApiError对象
         */
        FETCH_FAILURE
      ]
    }
  }
}

export const fetchImageTags = (id) => {
  let params = {id: id} ,
    fetchOptions = getFetchOptions(getApiPath('api/360image/title-tags?id=' + id))
  return {
    [CALL_API]: {
      ...fetchOptions,
      types: [
        FETCH_REQUEST,
        {
          type: FETCH_IMAGE_TAGS_SUCCESS,
          payload: (action, state, json) => {
            return{
              id: id,
              data: json.data  
            }
          }
        }, 
        /**
         * FETCH_FAILURE 默认由redux-api-middleware处理，返回ApiError对象
         */
        FETCH_FAILURE
      ]
    }
  }
}

export const fetchImageColumnDetail = (params) => {
  
  let fetchOptions = getFetchOptions(getApiPath('api/360image/section-detail'), 'POST', {
      body: JSON.stringify( params )
    })
  return {
    [CALL_API]: {
      ...fetchOptions,
      types: [
        {
          type: FETCH_IMAGE_COLUMN_DETAIL_REQUEST,
          payload: () => params.section_id //这里返回section.id，方便在reducer中处理section的pending状态
        },
        {
          type: FETCH_IMAGE_COLUMN_DETAIL_SUCCESS,
          payload: (action, state, json) => Object.assign(json.data, {id: params.section_id, page: params.page}) 
        }, 
        {
          type: FETCH_IMAGE_COLUMN_DETAIL_FAILURE,
          payload: () => params.section_id //这里返回section.id，方便在reducer中处理section的pending状态
        }
      ]
    }
  }
}



/**
 * 暴露actions到外面，方便使用react-redux connect绑定到Container Component
 */
export const actions = {
  fetchImageColumn, 
  fetchImageTags,
  fetchImageColumnDetail
}


// ------------------------------------
// Reducers
// ------------------------------------

const initialState = {
  /**
   * 基础信息（如人员名称，标签）
   */
  info: null,
  /**
   * 栏目信息(不包括它的内容明细)
   */
  sections: null,
  /**
   * 存储栏目内容的map，key为setion.id，方便后面取值
   */
  sectionDetailMaps: null,
  /**
   * 数据加载状态，key为section.id，存储各个栏目的pending值，方便后面取值
   */
  pending: {}
}


export default handleActions({

  [FETCH_IMAGE_COLUMN_DETAIL_REQUEST] (state, { payload }) {
    return {...state, pending: {...state.pending, [payload]: true}}
  },

  [FETCH_IMAGE_COLUMN_DETAIL_SUCCESS] (state, { payload }) {
    return {...state, sectionDetailMaps: {...state.sectionDetailMaps, [payload.id]: payload}, pending: {...state.pending, [payload.id]: false}}
  },

  [FETCH_IMAGE_COLUMN_DETAIL_FAILURE] (state, { payload }) {
    return {...state, pending: {...state.pending, [payload]: false}}
  },

  [FETCH_IMAGE_TAGS_SUCCESS] (state, { payload }) {
    return {...state, info: payload.data}
  },

  [FETCH_IMAGE_COLUMN_SUCCESS] (state, { payload }) {
    return {...state, ...payload}
  }

}, initialState)
