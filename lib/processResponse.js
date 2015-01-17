/* jshint node: true */

'use strict';

var assert = require('assert');

module.exports = function (response, argv) {
    assert(typeof argv.c === 'number', 'Count must be a number');

    var list = response.list;

    list.resources = list.resources.filter(function (element) {
        var fields = element.resource.fields;
        var name = argv.n && (Array.isArray(argv.n) ? argv.n : [argv.n]);

        if (name) {
            return name.some(function (name) {
                return fields.name.indexOf(name) > -1;
            });
        }

        return true;
    });

    list.resources.forEach(function (element) {
        var fields = element.resource.fields;
        fields.count = argv.c;
        fields.total = argv.c * fields.price;
    });

    return response;
};
