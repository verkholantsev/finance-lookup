'use strict';

var config = require('../../config.json');
var HOSTNAME = 'openexchangerates.org';
var PATH = '/api/latest.json?app_id=' + config.token;

var extend = require('lodash').extend;
var api = require('./api');

module.exports = function () {
    var base = api(HOSTNAME, PATH);

    var instance = extend(base, {
        transform: transform
    });

    return instance;

    function transform(rates) {
        return Object.keys(rates.rates).map(function (key) {
            return {
                name: key,
                rate: rates.rates[key],
                timestamp: rates.timestamp
            };
        });
    }
};
