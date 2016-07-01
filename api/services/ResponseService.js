/*
 * http 输出辅助类
 *
 * */

module.exports = {

    toJson: function(res, result, data, msg = '', code = 'undefine') {
        var obj = {
            result: result,
            msg: msg
        };
        if (data) {
            obj['data'] = data;
        }
        if (code != undefine) {
            obj['code'] = code;
        }
        return res.json(obj);
    }


}
