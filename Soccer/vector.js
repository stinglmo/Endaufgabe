"use strict";
var Soccer;
(function (Soccer) {
    //Jirkas Code (Asteroids/vector.ts)
    Soccer.scale = 5; // Skale
    class Vector {
        constructor(_X, _Y) {
            this.X = _X;
            this.Y = _Y;
        }
        scale(_factor) {
            this.X *= _factor;
            this.Y *= _factor;
        }
        add(_added) {
            this.X += _added.X;
            this.Y += _added.Y;
        }
        draw(color = "red", radius = 1) {
            Soccer.crc2.beginPath();
            Soccer.crc2.arc(this.X, this.Y, radius, 0, 2 * Math.PI, false);
            Soccer.crc2.lineWidth = 1;
            Soccer.crc2.strokeStyle = color;
            Soccer.crc2.stroke();
        }
        // Keine Ahnung ob das so passt haha
        distance(v1, v2) {
            let d = Math.sqrt(Math.pow(v2.X - v1.X, 2) +
                Math.pow(v2.Y - v1.Y, 2));
            return d;
        }
    }
    Soccer.Vector = Vector;
})(Soccer || (Soccer = {}));
//# sourceMappingURL=vector.js.map