'use strict';

var assert = require('assert');

module.exports = function (apis, argv) {
    Promise.all(apis.map(function (api) {
        return api.getRates(argv);
    }))
    .then(function (data) {
        data.forEach(printResponseData);
    });
};

function printResponseData(data) {
    data.forEach(function (element) {
        process.stdout.write([
            element.name,
            element.rate,
            element.timestamp
        ].join(' ') + '\n');
    });
}
