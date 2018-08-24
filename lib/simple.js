'use strict';

var Common = require('./common');
var Unit = bitcore.Unit;

function SimpleController(node) {
  this.node = node;
}

SimpleController.prototype.show = function(req, res) {
    var self = this;
    this.getValue(function(err, result) {
        if (err) {
            return null;
        }
        res.jsonp(result);
    });
};

SimpleController.prototype.getValue = function(callback) {
    var info = {
        value: 1 
    };
    callback(null, info);
};


module.exports = SimpleController;
