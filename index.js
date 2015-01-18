'use strict';

require('es6-promise').polyfill();

var optimist = require('optimist');
var argv = optimist
    .usage('$0 displays currency data using public finance api')
    .options('n', {
        alias: 'name',
        describe: 'Currency name (in uppercase)'
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
