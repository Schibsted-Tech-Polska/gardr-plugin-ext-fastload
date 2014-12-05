/* global gardr */

'use strict';

var comClient = require('../gardr-ext/lib/comClient.js');

// override gardr onload event
var originalEventListener = window.addEventListener;

var gardrOnLoadArguments;

var captureEventListener = function() {
    window.addEventListener = function(name, handler) {
        var args = Array.prototype.slice.call(arguments);
        if(!(name === 'load' && handler.toString().indexOf('com.rendered(size)') > -1)) {
            originalEventListener.apply(this, args);
        }
        else {
            gardrOnLoadArguments = args;
        }
    };
};

var releaseEventListener = function() {
    window.addEventListener = originalEventListener;
    if(gardrOnLoadArguments) {
        window.addEventListener.apply(window, gardrOnLoadArguments);
    }
};

// plugin body
var fastLoad = function(gardrPluginApi) {

    var com,
        indicator,
        size = {};

    captureEventListener();

    gardrPluginApi.on('element:containercreated', function() {
        com = comClient(gardr.id, window.parent, gardr.params.origin);
    });

    document.addEventListener('DOMContentLoaded', function() {
        indicator = document.querySelector('object, iframe');
        if(indicator) {
            size.width = indicator.getAttribute('width') || parseInt(window.getComputedStyle(indicator, null).width, 10);
            size.height = indicator.getAttribute('height') || parseInt(window.getComputedStyle(indicator, null).height, 10);
            gardrPluginApi.trigger('banner:rendered', size);
            com.rendered(size);
        }
        else {
            releaseEventListener();
        }
    }, false);

};

module.exports = fastLoad;
