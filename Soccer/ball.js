"use strict";
var Soccer;
(function (Soccer) {
    class Ball extends Soccer.Movable {
        constructor(_origin) {
            super(_origin);
            this.speed = 0;
            this.speedLevel = 10;
            this.slowDown = true;
            this.radius = 1.5;
        }
        draw() {
            Soccer.crc2.save();
            // draw player center
            Soccer.crc2.beginPath();
            Soccer.crc2.arc(this.position.X, this.position.Y, this.getRadius(), 0, 2 * Math.PI, false);
            Soccer.crc2.fillStyle = "white";
            Soccer.crc2.fill();
            Soccer.crc2.lineWidth = 1;
            Soccer.crc2.strokeStyle = "black";
            Soccer.crc2.stroke();
            Soccer.crc2.restore();
        }
    }
    Soccer.Ball = Ball;
})(Soccer || (Soccer = {}));
//# sourceMappingURL=ball.js.map