/* jshint node: true */

'use strict';

// "list": {
//         "meta": {
//             "type": "resource-list",
//             "start": 0,
//             "count": 173
//         },
//         "resources": [
//             {
//                 "resource": {
//                     "classname": "Quote",
//                     "fields": {
//                         "name": "USD/KRW",
//                         "price": "1079.494995",
//                         "symbol": "KRW=X",
//                         "ts": "1421447941",
//                         "type": "currency",
//                         "utctime": "2015-01-16T22:39:01+0000",
//                         "volume": "0"
//                     }
//                 }
//             },

module.exports = function (responseData) {
    responseData.list.resources.forEach(function (element) {
        process.stdout.write(serializeElement(element) + '\n');
    });
};

function serializeElement(element) {
    var fields = element.resource.fields;
    return [
        fields.name,
        fields.symbol,
        fields.count,
        fields.price,
        fields.total,
        new Date(Number(fields.ts) * 1000)
    ].join(', ');
}
