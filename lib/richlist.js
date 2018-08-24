'use strict';

var Common = require('./common');
var Unit = bitcore.Unit;

function RichlistController(node) {
  this.node = node;
  this.common = new Common({log: this.node.log});
  this._balance = this.node.services.balance;
  this._address = this.node.services.address;
}


RichlistController.prototype.show = function(req, res) {

};
