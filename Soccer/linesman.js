"use strict";
var Soccer;
(function (Soccer) {
    class Linesman extends Soccer.Moveable {
        constructor(_position) {
            super(_position);
            this.radius = 15;
        }
        draw() {
            Soccer.crc2.save();
            // draw player center
            Soccer.crc2.beginPath();
            Soccer.crc2.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI, false);
            Soccer.crc2.closePath();
            Soccer.crc2.fillStyle = this.color;
            Soccer.crc2.fill();
            Soccer.crc2.lineWidth = 1;
            Soccer.crc2.strokeStyle = "#003300";
            Soccer.crc2.stroke();
            Soccer.crc2.restore();
        }
        move() {
            //move
            this.position.x = Soccer.ball.position.x;
        }
    }
    Soccer.Linesman = Linesman;
})(Soccer || (Soccer = {}));
//# sourceMappingURL=linesman.js.map