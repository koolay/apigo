import isPlainObject from 'lodash.isplainobject';

import { SHOW_ERROR_TIPS } from '../helpers/tipUtils'

function isRSAA(action) {
  return isPlainObject(action) && action.hasOwnProperty('type') && action.error === true;
}
/**
 * 错误信息提示，在api-middleware处理完请求后，把action转发到 SHOW_ERROR_TIPS
 */
export default store => next => action => {  
  if(!isRSAA(action)){
  	return next(action)
  }

  //TODO: 是否触发其原来的action，什么条件下触发？
  next(action)

  //这里调用SHOW_ERROR_TIPS action，以便触发错误信息tips
  return store.dispatch({
    type: SHOW_ERROR_TIPS,
    payload: action.payload
  })
}