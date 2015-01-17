'use strict';

var HOSTNAME = 'finance.yahoo.com';
var PATH = '/webservice/v1/symbols/allcurrencies/quote?format=json';

var api = require('./api');
var extend = require('lodash').extend;

module.exports = function () {
    var base = api(HOSTNAME, PATH);

    return extend(base, {
        transform: transform
    });

    function transform(rates) {
        return rates.list.resources.map(function (element) {
            var fields = element.resource.fields;
            return {
                name: fields.name,
                rate: fields.price,
                timestamp: fields.ts
            };
        });
    }

};
