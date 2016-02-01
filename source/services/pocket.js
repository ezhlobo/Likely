/**
 * LinkedIn service provider
 */

var config = require('../config');

module.exports = {
    counter: function(url, factory) {
        var self = this;

        var load = function(url, callback) {
            var xhr = new XMLHttpRequest();

            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    callback(xhr.responseText);
                }
            };

            xhr.open('GET', url, true);
            xhr.send();
        };

        load('http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('select * from html where url="' + url + '" and xpath="*"') + '&format=json', function(count) {
            if (typeof self.convertNumber === 'function') {
                count = self.convertNumber(count);
            }

            factory(count);
        });
    },
    counterUrl: config.protocol + '//widgets.getpocket.com/v1/button?count=horizontal&url={url}',
    convertNumber: function (response) {
        return parseFloat(JSON.parse(response).query.results.html.body.div.a.span.em.content, 10);
    },
    popupUrl: config.protocol + '//getpocket.com/save?url={url}&format=json&callback=?',
    popupWidth: 600,
    popupHeight: 300
};
