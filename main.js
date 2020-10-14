var PROCESS;
(function (PROCESS) {
    window.onresize = () => {
        return false;
    };
    window.onload = () => {
        document.getElementById("btnAgree").addEventListener("click", () => {
            document.getElementById("noticeAgree").classList.add("hide");
            document.getElementById("divMain").classList.remove("hide");
            document.getElementById("divMain").classList.remove("show");
            var scetch0 = new PROCESS.Sound();
            scetch0.isNoise = false;
        });
        return false;
    };
})(PROCESS || (PROCESS = {}));
var PROCESS;
(function (PROCESS) {
    class Sound {
        constructor(background = 255, divId = "") {
            this.isNoise = false;
            this._divId = "divSound";
            this._amp = 3.0;
            this._lo_freq = 20;
            this._hi_freq = 24000;
            this.sketch = (pp) => {
                let setFilter = () => {
                    this._filter = new p5.BandPass();
                    if (this.isNoise) {
                        this._noise = new p5.Noise('brown');
                        this._noise.amp(1);
                        this._noise.disconnect();
                        this._noise.connect(this._filter);
                    }
                    else {
                        this._sound = new p5.AudioIn();
                        this._sound.getSources(sourceRecive);
                        this._sound.amp(10);
                        this._sound.disconnect();
                        this._sound.connect(this._filter);
                    }
                    this._filter.disconnect();
                    this._filter.connect(pp.soundOut);
                    this._fft = new p5.FFT(0.5, 128);
                    this._fft.setInput(pp.soundOut);
                };
                let onClickStart = () => {
                    if (this.blnReady) {
                        if (this.blnStart == false) {
                            this.btnStart.elt.textContent = "Stop";
                            this.blnStart = true;
                            if (this.isNoise) {
                                this._noise.start();
                            }
                            else {
                                this._sound.start();
                            }
                        }
                        else {
                            this.btnStart.elt.textContent = "Start";
                            this.blnStart = false;
                            if (this.isNoise) {
                                this._noise.stop();
                            }
                            else {
                                this._sound.stop();
                            }
                        }
                    }
                    return false;
                };
                let sourceRecive = (devices) => {
                    devices.forEach((device) => {
                        console.log(device.kind + ": " + device.label +
                            " id = " + device.deviceId);
                    });
                    return false;
                };
                pp.preload = () => {
                };
                pp.setup = () => {
                    this.blnReady = false;
                    this.btnStart = pp.createButton("Start");
                    this.btnStart.class("button");
                    this.btnStart.parent("divButton");
                    this.btnStart.mousePressed(onClickStart);
                    this._canvas = pp.createCanvas(300, 150);
                    this._canvas.parent("divSound");
                    this._spanAmp = pp.createSpan("<br />Volume/Amplitude<br />");
                    this._spanAmp.parent('divSlider');
                    this._slider_amp = pp.createSlider(0, 10, 3, 0.1);
                    this._slider_amp.size(300);
                    this._slider_amp.value(this._amp);
                    this._slider_amp.class("slider");
                    this._slider_amp.parent('divSlider');
                    this._spanLow = pp.createSpan("<br />Low Frequency<br />");
                    this._spanLow.parent('divSlider');
                    this._slider_lo_freq = pp.createSlider(0, 24040, 1);
                    this._slider_lo_freq.size(300);
                    this._slider_lo_freq.value(this._lo_freq);
                    this._slider_lo_freq.class("slider");
                    this._slider_lo_freq.parent('divSlider');
                    this._spanHi = pp.createSpan("<br />High Frequency<br />");
                    this._spanHi.parent('divSlider');
                    this._slider_hi_freq = pp.createSlider(10, 24050, 1);
                    this._slider_hi_freq.size(300);
                    this._slider_hi_freq.value(this._hi_freq);
                    this._slider_hi_freq.class("slider");
                    this._slider_hi_freq.parent('divSlider');
                    setFilter();
                    this.blnReady = true;
                };
                pp.windowResized = () => {
                };
                pp.draw = () => {
                    pp.background(this._background);
                    this._lo_freq = parseInt(this._slider_lo_freq.value().toString());
                    if (this._lo_freq > this._hi_freq - 10) {
                        this._hi_freq = this._lo_freq + 10;
                        this._slider_hi_freq.value(this._hi_freq);
                    }
                    ;
                    this._hi_freq = parseInt(this._slider_hi_freq.value().toString());
                    if (this._hi_freq < this._lo_freq + 10) {
                        this._lo_freq = this._hi_freq - 10;
                        this._slider_lo_freq.value(this._lo_freq);
                    }
                    this._amp = parseInt(this._slider_amp.value().toString());
                    pp.noStroke();
                    let central_freq = (this._lo_freq + this._hi_freq) / 2;
                    let Q = central_freq / (this._hi_freq - this._lo_freq);
                    this._filter.set(central_freq, Q);
                    this.spectrum = this._fft.analyze();
                    let color;
                    for (let i = 0; i < this.spectrum.length; i++) {
                        let x = pp.map(i, 0.0, this.spectrum.length, 0.0, pp.width);
                        let h = -pp.height + pp.map(this.spectrum[i], 0, 255, pp.height, 0);
                        color = this.spectrum[i] * 2;
                        pp.fill(color);
                        pp.rect(x, pp.height, pp.width / this.spectrum.length, h);
                    }
                    pp.fill(128, 128, 128, 255);
                    pp.text(this._lo_freq + " Hz. ... " + this._hi_freq + " Hz.", pp.width / 2, 100);
                    let val = this._sound.getLevel();
                    pp.fill(38, 153, 0);
                    pp.stroke(0, 0, 0);
                    let h = pp.map(val, 0, 1, pp.height, 0);
                    pp.ellipse(pp.width / 2, h, pp.width - 25, 7);
                };
            };
            this._background = 0;
            this.blnStart = false;
            this._p = new p5(this.sketch);
        }
    }
    PROCESS.Sound = Sound;
})(PROCESS || (PROCESS = {}));
//# sourceMappingURL=main.js.map