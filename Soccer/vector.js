"use strict";
var Soccer;
(function (Soccer) {
    //Jirkas Code (Asteroids/vector.ts)
    class Vector {
        constructor(_x, _y) {
            this.x = _x,
                this.y = _y;
        }
        get length() {
            return Math.hypot(this.x, this.y);
        }
        scale(_factor) {
            this.x *= _factor;
            this.y *= _factor;
        }
        add(_addend) {
            this.x += _addend.x;
            this.y += _addend.y;
        }
    }
    Soccer.Vector = Vector;
})(Soccer || (Soccer = {}));
//# sourceMappingURL=vector.js.map