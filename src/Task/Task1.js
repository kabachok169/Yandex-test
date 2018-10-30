function Ticker() {
    this._i = 0;

    Ticker.prototype.tick = () => console.log(this._i);
};



var ticker = new Ticker();
ticker.tick = ticker.tick.bind(ticker);

setInterval(ticker.tick, 1000);
