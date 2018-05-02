'use strict';

var request = require('request');

function CurrencyController(options) {
  this.node = options.node;
  var refresh = options.currencyRefresh || CurrencyController.DEFAULT_CURRENCY_DELAY;
  this.currencyDelay = refresh * 60000;
  this.cmcRate = 0;
  this.timestamp = Date.now();
}

CurrencyController.DEFAULT_CURRENCY_DELAY = 10;

CurrencyController.prototype.index = function(req, res) {
  var self = this;
  var currentTime = Date.now();
  if (self.cmcRate === 0 || currentTime >= (self.timestamp + self.currencyDelay)) {
    self.timestamp = currentTime;
    request('https://api.coinmarketcap.com/v1/ticker/internet-of-people/', function(err, response, body) {
      if (err) {
        self.node.log.error(err);
      }
      if (!err && response.statusCode === 200) {
        self.cmcRate = parseFloat(JSON.parse(body)[0].price_usd);
      }
      res.jsonp({
        status: 200,
        data: { 
          cmc: self.cmcRate 
        }
      });
    });
  } else {
    res.jsonp({
      status: 200,
      data: { 
        cmc: self.cmcRate 
      }
    });
  }

};

module.exports = CurrencyController;
