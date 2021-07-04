"use strict";
var Soccer;
(function (Soccer) {
    //Jirkas Code (Asteroids/vector.ts)
    Soccer.scale = 5; // Skale (wird auch bei getRadius in Moveable gebraucht)
    class Vector {
        constructor(_x, _y) {
            this.set(_x, _y);
        }
        static getDifference(_v0, _v1) {
            return new Vector(_v0.x - _v1.x, _v0.y - _v1.y);
        }
        get length() {
            return Math.hypot(this.x, this.y);
        }
        set(_x, _y) {
            this.x = _x;
            this.y = _y;
        }
        scale(_factor) {
            this.x *= _factor;
            this.y *= _factor;
        }
        add(_added) {
            this.x += _added.x;
            this.y += _added.y;
        }
        // Keine Ahnung ob das so passt haha
        distance(v1, v2) {
            let d = Math.sqrt(Math.pow(v2.x - v1.x, 2) +
                Math.pow(v2.y - v1.y, 2));
            return d;
        }
    }
    Soccer.Vector = Vector;
})(Soccer || (Soccer = {}));
//# sourceMappingURL=vector.js.map