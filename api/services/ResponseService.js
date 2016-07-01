/*
 * http 输出辅助类
 *
 * */

module.exports = {

    toJson: function(res, result, data, msg, code) {
        var obj = {
            result: result,
            msg: msg
        };
        if (data) {
            obj['data'] = data;
        }
        if (code || code === 0) {
            obj['code'] = code;
        }
        return res.json(obj);
    }


}
