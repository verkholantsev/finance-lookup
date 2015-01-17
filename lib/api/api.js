'use strict';

var request = require('http').request;

module.exports = function (hostname, path) {
    var instance = {
        getRates: getRates,
        transform: _throw('transform'),
        filter: filter,
        fetch: fetch
    };

    return instance;

    function getRates(argv) {
        var names = argv.n;
        if (names && !Array.isArray(names)) {
            names = [names];
        }
        return instance.fetch()
            .then(instance.transform)
            .then(function (rates) {
                if (!names) {
                    return rates;
                }

                return rates.filter(instance.filter.bind(null, names));
            })
            .catch(function (error) {
                process.stderr.write(error.stack + '\n');
            });
    }

    function filter(names, rate) {
        return names.some(function (name) {
            return rate.name.indexOf(name) > -1;
        });
    }

    function fetch() {
        var opts = {
            hostname: hostname,
            port: 80,
            path: path,
            method: 'GET'
        };

        return new Promise(function (resolve, reject) {
            var req = request(opts, function (res) {
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
                        return reject(error);
                    }

                    return resolve(parsedData);
                });
            });

            req.end();
        });
    }

    function _throw(methodName) {
        return function() {
            throw new Error('Method ' + methodName + ' not implemented');
        };
    }
};
