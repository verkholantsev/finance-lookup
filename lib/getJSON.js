/* jshint node: true */

'use strict';

var request = require('http').request;

module.exports = function (hostname, path, callback) {
    var req = request({hostname: hostname, port: 80, path: path, method: 'GET'}, function (res) {
        var data = '';

        res.setEncoding('utf-8');

        res.on('data', function (chunk) {
            data += chunk;
        });

        res.on('end', function () {
            var parsedData;

            try {
                parsedData = JSON.parse(data);
            } catch (error) {
                return callback(error);
            }

            return callback(null, parsedData);
        });
    });

    req.end();
};
