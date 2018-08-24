'use strict';

var Common = require('./common');

function SimpleController(node) {
  this.node = node;
  this.common = new Common({log: this.node.log});
}

SimpleController.prototype.show = function(req, res) {
    var self = this;
    this.getValue(function(err, result) {
        if (err) {
            return self.common.handleErrors(err, res);
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
