'use strict';

var Common = require('./common');
var Unit = bitcore.Unit;

function SupplyController(node) {
  this.node = node;
  this.common = new Common({log: this.node.log});
  this._balance = this.node.services.balance;
  this._address = this.node.services.address;
}

SupplyController.prototype.show = function(req, res) {

};


SupplyController.prototype.getAddressBalance = function(address, options, callback) {
  var self = this;
  
  this._address.getAddressSummary(address, options, function(err, summary) {
    if(err) {
      return callback(err);
    }
  
    var transformed = {
      address: self.common.translateOutputAddress(address),
      balance: Unit.fromSatoshis(summary.balance).toBTC(),
      balanceSat: summary.balance
    };
  
    callback(null, transformed);
  });
};

// var ADDRESS_LIMIT = 200;
