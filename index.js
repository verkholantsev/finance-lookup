'use strict';

require('es6-promise').polyfill();

var optimist = require('optimist');
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

var processApis = require('./lib/processApis');
var yahooApi = require('./lib/api/yahooApi');
var openExchangeApi = require('./lib/api/openExchangeApi');

processApis([yahooApi(), openExchangeApi()], argv);
