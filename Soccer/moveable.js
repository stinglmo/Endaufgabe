"use strict";
var Soccer;
(function (Soccer) {
    // Superklasse um moveables zu handeln
    class Moveable {
        constructor(_position) {
            this.position = _position;
        }
    }
    Soccer.Moveable = Moveable;
})(Soccer || (Soccer = {}));
//# sourceMappingURL=moveable.js.map