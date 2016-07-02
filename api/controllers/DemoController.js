/**
 * 演示接口
 *
 * @description :: Server-side logic for managing mocks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    getCompanys: function(req, res){
        var sell_code = req.param('sell_code');

        if(sell_code==undefined){ //没有传参
            return res.send(500, {
                errorcode: 0,
                errormsg: "缺少请求参数sell_code"
            });
        }else if(sell_code!='mysoft'){
            return res.send(200, {
                data: []
            });
        }else{
            return res.send(200, {
                data: [
                    {
                        "name":"明源云服务"
                    },
                    {
                        "name":"明源云采购"
                    },
                    {
                        "name":"明源云客"
                    }
                ]
            });
        }
    },

    getProducts: function(req, res){
        var sell_code = req.param('sell_code');

        if(sell_code==undefined){ //没有传参
            return res.send(500, {
                errorcode: 0,
                errormsg: "缺少请求参数sell_code"
            });
        }else if(sell_code!='mysoft'){
            return res.send(200, {
                data: []
            });
        }else{
            return res.send(200, {
                data: [
                    {
                        "name":"移动验房"
                    },
                    {
                        "name":"移动销售"
                    },
                    {
                        "name":"移动质检"
                    }
                ]
            });
        }
    },

    getCustomers: function(req, res){
        var sell_code = req.param('sell_code');

        if(sell_code==undefined){ //没有传参
            return res.send(500, {
                errorcode: 0,
                errormsg: "缺少请求参数sell_code"
            });
        }else if(sell_code!='mysoft'){
            return res.send(200, {
                data: []
            });
        }else{
            return res.send(200, {
                data: [
                    {
                        "name":"万科"
                    },
                    {
                        "name":"碧桂园"
                    },
                    {
                        "name":"中信"
                    }
                ]
            });
        }
    }
};
