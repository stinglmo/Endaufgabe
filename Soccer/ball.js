"use strict";
var Soccer;
(function (Soccer) {
    class Ball extends Soccer.Moveable {
        constructor(_position) {
            super(_position);
            this.radius = 10;
        }
        draw() {
            Soccer.crc2.save();
            // draw player center
            Soccer.crc2.beginPath();
            Soccer.crc2.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI, false);
            Soccer.crc2.fillStyle = "white";
            Soccer.crc2.fill();
            Soccer.crc2.lineWidth = 1;
            Soccer.crc2.strokeStyle = "black";
            Soccer.crc2.stroke();
            Soccer.crc2.restore();
        }
        // erstmal so
        move() {
            //move
            this.position.x += 4;
            this.position.y += 2;
            if (this.position.x < 0)
                this.position.x += Soccer.crc2.canvas.width;
            if (this.position.y < 0)
                this.position.y += Soccer.crc2.canvas.height;
            if (this.position.x > Soccer.crc2.canvas.width)
                this.position.x -= Soccer.crc2.canvas.width;
            if (this.position.y > Soccer.crc2.canvas.height)
                this.position.y -= Soccer.crc2.canvas.height;
        }
    }
    Soccer.Ball = Ball;
})(Soccer || (Soccer = {}));
//# sourceMappingURL=ball.js.map