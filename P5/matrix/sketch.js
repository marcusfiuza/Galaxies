var symbolSize = 24;
var streams = [];
function setup() {
    createCanvas(
        window.innerWidth,
        window.innerHeight
    );
    background(0);
    var x = 0;
    for (i = 0; i <= width / symbolSize; i++) {
        var stream = new Stream();
        stream.generateSymbols(x, random(-2000, 0));
        streams.push(stream);
        x += symbolSize;
    }
    textFont('Consolas');
    textSize(symbolSize);
}

function draw() {
    background(0, 150);
    streams.forEach(function (stream) {
        stream.render();
    });
}

function Symbol(x, y, speed, first) {
    this.x = x;
    this.y = y;
    this.value;
    this.speed = speed;
    this.first = first;

    this.switchInterval = round(random(2, 20));

    this.setToRandomSymbol = function () {
        if (frameCount % this.switchInterval == 0) {
            this.value = String.fromCharCode(
                /*
                 /*katakana starts in 0x30A0
                 /*and exists 96 characters*/
                0x30A0 + round(random(0, 96))
            );
        }

    };


    this.rain = function () {
        /*
         /*when come to the end of screen starts again
         */
        this.y = (this.y >= height) ? 0 : this.y += this.speed;
    };
}


function Stream() {
    this.symbols = [];
    this.totalSymbols = round(random(5, 30));
    this.speed = random(5, 15);
    this.generateSymbols = function (x, y) {
        var first = round(random(0,5)) == 1;
        for (var i = 0; i <= this.totalSymbols; i++) {
            symbol = new Symbol(x, y, this.speed, first);
            symbol.setToRandomSymbol();
            this.symbols.push(symbol);
            y -= symbolSize;
            first = false;
        }

    };

    this.render = function () {
        this.symbols.forEach(function (symbol) {
            if (symbol.first) {
                fill(180,255,180);
            }
            else{
                fill(0, 255, 70);
            }
            text(symbol.value, symbol.x, symbol.y);
            symbol.rain();
            symbol.setToRandomSymbol();
        });
    }

}

