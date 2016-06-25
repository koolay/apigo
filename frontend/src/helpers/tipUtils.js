const defaultTimeout = '2500'

export const tipOptions = {
	show: false,
	status: 'success',
	content: '',
  timeout: defaultTimeout
}

function _createTipOptions(type, message, timeout=defaultTimeout) {
	return {
		show: true,
		status: type,
		content: message || '',
		timeout: timeout
	}
}

export function getTipOptions(message, timeout) {
	return _createTipOptions('success', message, timeout)
}

export function getErrorTipOptions(message, timeout) {
	return _createTipOptions('error', message, timeout)
}

export const CLEAR_TIP_STATUS = Symbol('CLEAR_TIP_STATUS')
export const SHOW_TIPS = Symbol('SHOW_TIPS')
export const SHOW_ERROR_TIPS = Symbol('SHOW_ERROR_TIPS')

export const clearTipStatus = () => ({type: CLEAR_TIP_STATUS})
export const showTips = (message, timeout) => ({type: SHOW_TIPS, payload: {message, timeout}})
export const showErrorTips = (message, timeout) => ({type: SHOW_ERROR_TIPS, payload: {message, timeout}})
