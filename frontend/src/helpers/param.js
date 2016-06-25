
export default function param(paramData) {
	var key, params = [], escape = window.encodeURIComponent;
	if(!paramData || typeof paramData !== 'object'){
		return ''
	}

  params.add = function(k, v){ this.push(escape(k) + '=' + escape(v)) }

  for(key in paramData) {
  	params.add(key, paramData[key])
  }
  
  return params.join('&').replace(/%20/g, '+')
}