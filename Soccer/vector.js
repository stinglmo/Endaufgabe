"use strict";
var Soccer;
(function (Soccer) {
    //Jirkas Code (Asteroids/vector.ts)
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
    }
    Soccer.Vector = Vector;
})(Soccer || (Soccer = {}));
//# sourceMappingURL=vector.js.map