var PROCESS;
(function (PROCESS) {
    window.onresize = function () {
    };
    window.onload = function () {
    };
})(PROCESS || (PROCESS = {}));
var PROCESS;
(function (PROCESS) {
    var Sound = (function () {
        function Sound(background, divId) {
            var _this = this;
            if (background === void 0) { background = 255; }
            if (divId === void 0) { divId = ""; }
            this._isNoise = false;
            this._amp = 10.0;
            this._lo_freq = 300;
            this._hi_freq = 2400;
            this.sketch = function (pp) {
                pp.preload = function () {
                    _this._chk = pp.createCheckbox("Microphone | Noise", true);
                    _this._chk.position(0, 100);
                    _this._chk.changed(function () {
                        _this._isNoise = !_this._isNoise;
                        _this.load(pp);
                    });
                };
                pp.setup = function () {
                    _this._canvas = pp.createCanvas(300, 200);
                    _this._canvas.parent(_this._divId);
                    _this._slider_amp = pp.createSlider(0, 100, 10, 0.1);
                    _this._slider_amp.size(300);
                    _this._slider_amp.value(_this._amp);
                    _this._slider_amp.class("lemon");
                    _this._slider_amp.parent('divSlider');
                    _this._slider_amp.style('rotate', -90);
                    _this._slider_amp.position(-100, 400);
                    _this._slider_lo_freq = pp.createSlider(0, 24040, 10);
                    _this._slider_lo_freq.size(_this._divElement.offsetWidth, 50);
                    _this._slider_lo_freq.value(_this._lo_freq);
                    _this._slider_lo_freq.position(0, 50);
                    _this._slider_hi_freq = pp.createSlider(10, 24050, 10);
                    _this._slider_hi_freq.size(_this._divElement.offsetWidth, 50);
                    _this._slider_hi_freq.value(_this._hi_freq);
                    _this._slider_hi_freq.position(0, 100);
                    _this._filter = new p5.BandPass();
                    if (_this._isNoise) {
                        _this._noise = new p5.Noise('brown');
                        _this._noise.amp(1);
                        _this._noise.disconnect();
                        _this._noise.connect(_this._filter);
                        _this._noise.start();
                    }
                    else {
                        _this._sound = new p5.AudioIn();
                        _this._sound.getSources(_this.sourceRecive);
                        _this._sound.amp(10);
                        _this._sound.disconnect();
                        _this._sound.connect(_this._filter);
                        _this._sound.start();
                    }
                    _this._filter.disconnect();
                    _this._filter.connect(pp.soundOut);
                    _this._fft = new p5.FFT(0.5, 128);
                    _this._fft.setInput(pp.soundOut);
                };
                pp.windowResized = function () {
                    pp.resizeCanvas(200, 200);
                    _this._slider_amp.style('rotate', -90);
                    _this._slider_amp.position(-100, 400);
                    _this._slider_lo_freq.size(_this._divElement.offsetWidth);
                    _this._slider_hi_freq.size(_this._divElement.offsetWidth);
                };
                pp.draw = function () {
                    pp.background(_this._background);
                    _this._lo_freq = parseInt(_this._slider_lo_freq.value().toString());
                    if (_this._lo_freq > _this._hi_freq - 10) {
                        _this._hi_freq = _this._lo_freq + 10;
                        _this._slider_hi_freq.value(_this._hi_freq);
                    }
                    ;
                    _this._hi_freq = parseInt(_this._slider_hi_freq.value().toString());
                    if (_this._hi_freq < _this._lo_freq + 10) {
                        _this._lo_freq = _this._hi_freq - 10;
                        _this._slider_lo_freq.value(_this._lo_freq);
                    }
                    _this._amp = parseInt(_this._slider_amp.value().toString());
                    _this._sound.amp(_this._amp);
                    pp.noStroke();
                    var central_freq = (_this._lo_freq + _this._hi_freq) / 2;
                    var Q = central_freq / (_this._hi_freq - _this._lo_freq);
                    _this._filter.set(central_freq, Q);
                    _this.spectrum = _this._fft.analyze();
                    for (var i = 0; i < _this.spectrum.length; i++) {
                        var x = pp.map(i, 0.0, _this.spectrum.length, 0.0, pp.width);
                        var h_1 = -pp.height + pp.map(_this.spectrum[i], 0, 255, pp.height, 0);
                        var color = _this.spectrum[i] * 2;
                        pp.fill(color);
                        pp.rect(x, pp.height, pp.width / _this.spectrum.length, h_1);
                    }
                    _this._slider_lo_freq.show;
                    _this._slider_hi_freq.show;
                    var val = _this._sound.getLevel();
                    pp.fill(214, 102, 0);
                    pp.stroke(0, 0, 0);
                    var h = pp.map(val, 0, 1, pp.height, 0);
                    pp.ellipse(pp.width / 2, h - 25, 50, 50);
                };
            };
            this._background = background;
            this._divId = divId;
            this._divElement = document.getElementById(this._divId);
        }
        Sound.prototype.start = function () {
            this._p = new p5(this.sketch);
        };
        Sound.prototype.stop = function () {
            this._p = null;
        };
        Sound.prototype.sourceRecive = function (devices) {
            devices.forEach(function (device) {
                console.log(device.kind + ": " + device.label +
                    " id = " + device.deviceId);
            });
        };
        ;
        Sound.prototype.load = function (pp) {
        };
        return Sound;
    }());
    PROCESS.Sound = Sound;
})(PROCESS || (PROCESS = {}));
//# sourceMappingURL=main.js.map