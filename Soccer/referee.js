"use strict";
var Soccer;
(function (Soccer) {
    class Referee extends Soccer.Moveable {
        constructor(_position) {
            super(_position);
            this.radius = 15;
        }
        draw() {
            Soccer.crc2.save();
            // draw player center
            Soccer.crc2.beginPath();
            Soccer.crc2.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
            Soccer.crc2.closePath();
            Soccer.crc2.fillStyle = "#FF6700";
            Soccer.crc2.fill();
            Soccer.crc2.restore();
        }
        move() {
            //
        }
    }
    Soccer.Referee = Referee;
})(Soccer || (Soccer = {}));
//# sourceMappingURL=referee.js.map