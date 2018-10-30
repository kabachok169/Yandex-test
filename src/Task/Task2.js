function Ticker() {
    this._i = 0;
    var self = this;
    Ticker.prototype.tick = function () {
        console.log(self._i++);
    }
}

var ticker = new Ticker();
setInterval(ticker.tick, 1000);
