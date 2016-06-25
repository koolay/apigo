/*  
 *  说明：过滤XSS
 *  @param  {String}    str 需要过滤的内容
 *  @return {String}    显示的内容
 */
function xss(str) {
    var div = document.createElement("div"),
        text = document.createTextNode(str), val = '';

    div.appendChild(text);
    val = div.innerHTML;
    text = null; div = null;

    return val;
}

/**
 * 获取url或者自定义字符串中的参数
 * 
 * @param {String} name 不传name则直接返回整个参数对象
 * @param {String} queryStr 自定义字符串
 * @param {Boolean} true 不进行参数XSS安全过滤
 * @param {Boolean} true 不进行自动解码
 * @return {String|Object} 获取到的参数值或者由所有参数组成完整对象
*/
function getQuery(name, queryStr, unxss, undecode) {
    var str = queryStr || location.search.replace("?",""), tempArr,
        obj = {}, temp, arr = str.split("&"), len = arr.length;

    if(len > 0) {
        for(var i = 0; i < len; i++) {
            try{
                if((tempArr = arr[i].split('=')).length === 2) {
                    temp = undecode ? tempArr[1] : decodeURIComponent(tempArr[1]);
                    obj[tempArr[0]] = unxss ? temp : xss(temp);
                }                        
            }catch(e){}
        }
    }

    return name ? obj[name] : obj;
}

export {
	xss,
	getQuery
}