function Ticker() {
    this._i = 0;
    this._m = 0;
    this._h = 0;
    const self = this;
    Ticker.prototype.tick = function () {
        if (self._i === 60) {
            self._m++;
            self._i = 0;
        }
        if (self._m === 60) {
            self._h++;
            self._m = 0;
        }

        console.log(`${self._h} : ${self._m} : ${self._i}`);
        self._i++;
    }
    Ticker.prototype.tack = function () {
        setInterval(self.tick, 10);
    }
}

const ticker = new Ticker();
ticker.tack();


