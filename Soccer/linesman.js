"use strict";
var Soccer;
(function (Soccer) {
    class Linesman extends Soccer.Movable {
        constructor(_position) {
            super(new Soccer.Vector(_position.X, _position.Y));
            this.target = new Soccer.Vector(_position.X, _position.Y);
            this.radius = 1.5;
        }
        setTargetFn(cb) {
            this.targetFn = cb;
        }
        getTargetFn() {
            return this.targetFn();
        }
        draw() {
            Soccer.crc2.save();
            // draw player center
            Soccer.crc2.beginPath();
            Soccer.crc2.arc(this.position.X, this.position.Y, this.getRadius(), 0, 2 * Math.PI, false);
            Soccer.crc2.fillStyle = this.color;
            Soccer.crc2.fill();
            Soccer.crc2.lineWidth = 1;
            Soccer.crc2.strokeStyle = "#003300";
            Soccer.crc2.stroke();
            Soccer.crc2.restore();
        }
    }
    Soccer.Linesman = Linesman;
})(Soccer || (Soccer = {}));
//# sourceMappingURL=linesman.js.map