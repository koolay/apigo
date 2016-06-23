/**
 * AdminController
 *
 * @description :: Server-side logic for managing admins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    api: function(req, res) {
        return res.view('add-api');
    },
    updateApi: function(req, res) {
        KongApiService.get('/apis/' + req.param('id'), function(response) {
            return res.view('update-api', response.data);
        })
    },
    consumer: function(req, res) {
        return res.view('add-consumer');
    },
    updateConsumer: function(req, res) {
        KongApiService.get('/consumers/' + req.param('id'), function(response) {
            return res.view('update-consumer', response.data);
        })
    },

    plugin: function(req, res) {
        return res.view('add-plugin');
    },
    updatePlugin: function(req, res) {
        KongApiService.get('/plugins/' + req.param('id'), function(response) {
            return res.view('update-plugin', response.data);
        })
    },

};

