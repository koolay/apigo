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

const FETCH_ALL_INDICATOR_TYPES_SUCCESS = 'FETCH_ALL_INDICATOR_TYPES_SUCCESS'
const FETCH_ALL_INDICATORS_SUCCESS = 'FETCH_ALL_INDICATORS_SUCCESS'
const SAVE_POPULATION_TAG_SUCCESS = 'SAVE_POPULATION_TAG_SUCCESS'
const FETCH_POPULATION_TAG_DETAIL_SUCCESS = 'FETCH_POPULATION_TAG_DETAIL_SUCCESS'


// ------------------------------------
// Actions (Action Creator)
// ------------------------------------
export const fetchAllIndicatorTypes = () => {
  let fetchOptions = getFetchOptions(getApiPath('api/indicator/all-indicator-types'))

  return {
    [CALL_API]: {
      ...fetchOptions,
      types: [
        FETCH_REQUEST,
        {
          type: FETCH_ALL_INDICATOR_TYPES_SUCCESS,
          payload: (action, state, json) => json.data
        }, 
        FETCH_FAILURE
      ]
    }
  }
}

export const fetchAllIndicators = (params) => {
  let fetchOptions = getFetchOptions(getApiPath('api/indicator/all-indicators', params))

  return {
    [CALL_API]: {
      ...fetchOptions,
      types: [
        FETCH_REQUEST,
        {
          type: FETCH_ALL_INDICATORS_SUCCESS,
          payload: (action, state, json) => json.data
        }, 
        /**
         * FETCH_FAILURE 默认由redux-api-middleware处理，返回ApiError对象
         */
        FETCH_FAILURE
      ]
    }
  }
}

export const savePopulationTag = (data) => {
  let fetchOptions = getFetchOptions(getApiPath('api/tag/save'), 'POST', {
      body: JSON.stringify( data )
    })

  return {
    [CALL_API]: {
      ...fetchOptions,
      types: [
        FETCH_REQUEST,
        {
          type: SAVE_POPULATION_TAG_SUCCESS,
          payload: (action, state, json) => json.data,
          meta: {
            transition: function(state, { payload }) {
              return {
                path: getBasePath() + '/examples/tag/list',
                state: { refresh: true }
              }
            }
          }
        }, 
        FETCH_FAILURE
      ]
    }
  }
}

export const fetchPopulationTagDetail = (id) => {
  let fetchOptions = getFetchOptions(getApiPath('api/tag/detail?id=' + id))

  return {
    [CALL_API]: {
      ...fetchOptions,
      types: [
        FETCH_REQUEST,
        {
          type: FETCH_POPULATION_TAG_DETAIL_SUCCESS,
          payload: (action, state, json) => {
            let info = json.data 

            // 为方便数据关联，这里需要把detail返回的数据做解析，indicator.indicator_id在后面统一使用indicator.id，indicatorValue也一样
            if (info.indicators_data && info.indicators_data.length > 0) {
              
              let indicators = [], selectedIndicators = []

              info.indicators_data.forEach(indicator => {

                let indicatorValues = []

                indicator.values.forEach(indicatorValue => {
                  indicatorValues.push({
                    ...indicatorValue,
                    id: indicatorValue.indicator_value_id
                  })

                  //实始化选中的指标项
                  selectedIndicators.push(indicatorValue.indicator_value_id)
                })

                indicators.push({
                  ...indicator,
                  id: indicator.indicator_id,
                  values: indicatorValues
                })

              })

              // 删除原来的indicators_data，后面统一使用info.indicators
              delete info.indicators_data
              info = {...info, indicators, selectedIndicators }
              
            } else { //这里把info.selectedIndicators设为空数组，方便后面处理
              info.selectedIndicators = []
            }
            
            return info
          }
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
  fetchAllIndicatorTypes,
  fetchAllIndicators,
  savePopulationTag,
  fetchPopulationTagDetail
}


// ------------------------------------
// Reducers
// ------------------------------------

const initialState = {
  info: null,
  indicatorTypes: [],
  indicators: []
}


export default handleActions({

  [FETCH_ALL_INDICATOR_TYPES_SUCCESS] (state, { payload }) {
    return {...state, indicatorTypes: payload}
  },

  [FETCH_ALL_INDICATORS_SUCCESS] (state, { payload }) {
    return {...state, indicators: payload}
  },

  [FETCH_POPULATION_TAG_DETAIL_SUCCESS] (state, { payload }) {
    return {...state, info: payload}
  }

}, initialState)
