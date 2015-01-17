/* jshint node: true */

'use strict';

var HOSTNAME = 'finance.yahoo.com';
var PATH = '/webservice/v1/symbols/allcurrencies/quote?format=json';

var optimist = require('optimist');

var getJSON = require('./lib/getJSON');
var printResponse = require('./lib/printResponse');
var processResponse = require('./lib/processResponse');

var argv = optimist
    .usage('$0 displays currency data using Yahoo Finance')
    .options('n', {
        alias: 'name',
        describe: 'Currency name (in uppercase)'
    })
    .options('c', {
        alias: 'count',
        describe: 'Currency count',
        default: 1
    })
    .options('h', {
        alias: 'help',
        describe: 'This help'
    })
    .argv;

if (argv.h) {
    return require('optimist').showHelp();
}

getJSON(HOSTNAME, PATH, function (error, data) {
    if (error) {
        return process.stderr.write(error + '\n');
    }

    printResponse(processResponse(data, argv));
});
