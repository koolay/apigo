import { createAction, handleActions } from 'redux-actions'
import { CALL_API, getJSON, ApiError } from 'redux-api-middleware'

import { tipOptions, getTipOptions, getErrorTipOptions, CLEAR_TIP_STATUS, clearTipStatus, SHOW_TIPS, showTips, SHOW_ERROR_TIPS, showErrorTips } from '../../helpers/tipUtils'

/**
 * 暴露actions到外面，方便使用react-redux connect绑定到Container Component
 */
export const actions = {
  clearTipStatus,
  showTips,
  showErrorTips
}

// ------------------------------------
// Reducers
// ------------------------------------
const initialState = {
  tipOptions
}

export default handleActions({
	[CLEAR_TIP_STATUS] (state, { payload }) {
		return {tipOptions}
	},

	[SHOW_TIPS] (state, { payload }) {
		return {tipOptions: getTipOptions(payload.message, payload.timeout)}
	},

	[SHOW_ERROR_TIPS] (state, { payload }) {
		return {tipOptions: getErrorTipOptions(payload.message, payload.timeout)}
	}
}, initialState)