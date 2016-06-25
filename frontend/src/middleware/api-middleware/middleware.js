require('es6-promise').polyfill();
import fetch from 'isomorphic-fetch';
import isPlainObject from 'lodash.isplainobject';

import CALL_API from './CALL_API';
import { isRSAA, validateRSAA } from './validation';
import { InvalidRSAA, RequestError, ApiError } from './errors' ;
import { getJSON, normalizeTypeDescriptors, actionWith } from './util';

import getBasePath from '../../helpers/getBasePath'

/**
 * A Redux middleware that processes RSAA actions.
 *
 * @type {ReduxMiddleware}
 * @access public
 */
function apiMiddleware({ getState }) {
  return (next) => async (action) => {
    //response object
    let res;

    // Do not process actions without a [CALL_API] property
    if (!isRSAA(action)) {
      return next(action);
    }

    // Try to dispatch an error request FSA for invalid RSAAs
    const validationErrors = validateRSAA(action);
    if (validationErrors.length) {
      const callAPI = action[CALL_API];
      if (callAPI.types && Array.isArray(callAPI.types)) {
        let requestType = callAPI.types[0];
        if (requestType && requestType.type) {
          requestType = requestType.type;
        }
        next({
          type: requestType,
          payload: new InvalidRSAA(validationErrors),
          error: true
        });
      }
      return;
    }

    // Parse the validated RSAA action
    const callAPI = action[CALL_API];
    const { endpoint, method, headers, body, credentials, bailout, types } = callAPI;
    const [requestType, successType, failureType] = normalizeTypeDescriptors(types);

    // Should we bail out?
    try {
      if ((typeof bailout === 'boolean' && bailout) ||
          (typeof bailout === 'function' && bailout(getState()))) {
        return;
      }
    } catch (e) {
      return next(await actionWith(
        {
          ...requestType,
          payload: new RequestError('[CALL_API].bailout function failed'),
          error: true
        },
        [action, getState()]
      ));
    }

    // We can now dispatch the request FSA
    next(await actionWith(
      requestType,
      [action, getState()]
    ));

    try {
      // Make the API call
      res = await fetch(endpoint, { method, body, credentials, headers });
    } catch(e) {
      // The request was malformed, or there was a network error
      return next(await actionWith(
        {
          ...requestType,
          payload: new RequestError(e.message),
          error: true
        },
        [action, getState()]
      ));
    }

    // Process the server response
    if (res.ok) {
      
      //这里统一处理业务异常，仅当json.result === true时，调用其successType，否则则调用failureType，并且把payload设为ApiError
      return res.json().then(async json => {
        if(json.result === true){
          return next(await actionWith(
            successType,
            [action, getState(), json]
          ))
        }else{
          return next(await actionWith(
            {
              ...failureType,
              payload: new ApiError(json.code, json.msg, json),
              error: true
            },
            [action, getState(), json]
          ));
        }
      });
      
    } else {

      if(res.status === 401){ //未登录
        getJSON(res).then(json => {
          location.href = `${json.login_url}?returnUrl=${location.href}`
        });
      }else if(res.status === 403){ //没有权限，给它添加meta属性，让它路由到没有权限的页面去
        let basePath = getBasePath()

        return next(await actionWith(
          {
            ...failureType,
            meta: {
              transition: (state, action) => ({path: `${basePath}/norights`})
            }
          },
          [action, getState(), res]
        ));
        // location.href = `${basePath}/norights`
      }else{
        return next(await actionWith(
          {
            ...failureType,
            error: true
          },
          [action, getState(), res]
        ));
      }

    }
  }
}

export { apiMiddleware };