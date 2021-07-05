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
            // Zweiter Kreis
            Soccer.crc2.beginPath();
            Soccer.crc2.arc(this.position.x, this.position.y, this.radius - 2.5, 0, 2 * Math.PI, false);
            Soccer.crc2.fillStyle = "white";
            Soccer.crc2.fill();
            Soccer.crc2.lineWidth = 1;
            Soccer.crc2.strokeStyle = "black";
            Soccer.crc2.stroke();
            // Strich oben
            Soccer.crc2.beginPath();
            Soccer.crc2.moveTo(this.position.x, this.position.y - 10);
            Soccer.crc2.lineTo(this.position.x, this.position.y - 2);
            Soccer.crc2.stroke();
            // Linker Strich unten
            Soccer.crc2.beginPath();
            Soccer.crc2.moveTo(this.position.x, this.position.y);
            Soccer.crc2.lineTo(this.position.x - 6, this.position.y + 8);
            Soccer.crc2.stroke();
            // Linker Strich oben
            Soccer.crc2.beginPath();
            Soccer.crc2.moveTo(this.position.x, this.position.y);
            Soccer.crc2.lineTo(this.position.x - 9, this.position.y - 3);
            Soccer.crc2.stroke();
            // Rechter Strich oben
            Soccer.crc2.beginPath();
            Soccer.crc2.moveTo(this.position.x, this.position.y);
            Soccer.crc2.lineTo(this.position.x + 9, this.position.y - 3);
            Soccer.crc2.stroke();
            // Rechter Strich unten
            Soccer.crc2.beginPath();
            Soccer.crc2.moveTo(this.position.x, this.position.y - 1);
            Soccer.crc2.lineTo(this.position.x + 6, this.position.y + 8);
            Soccer.crc2.stroke();
            // Mittelpunkt
            Soccer.crc2.beginPath();
            Soccer.crc2.arc(this.position.x, this.position.y, 2, 0, 2 * Math.PI, false);
            Soccer.crc2.fillStyle = "black";
            Soccer.crc2.fill();
            Soccer.crc2.lineWidth = 2;
            Soccer.crc2.strokeStyle = "black";
            Soccer.crc2.stroke();
            // Punkt oben
            Soccer.crc2.beginPath();
            Soccer.crc2.arc(this.position.x, this.position.y - 8, 1.7, 0, 2 * Math.PI, false);
            Soccer.crc2.fillStyle = "black";
            Soccer.crc2.fill();
            Soccer.crc2.lineWidth = 1;
            Soccer.crc2.strokeStyle = "black";
            Soccer.crc2.stroke();
            // Linker Punkt oben
            Soccer.crc2.beginPath();
            Soccer.crc2.arc(this.position.x - 8, this.position.y - 2, 1.7, 0, 2 * Math.PI, false);
            Soccer.crc2.fillStyle = "black";
            Soccer.crc2.fill();
            Soccer.crc2.lineWidth = 1;
            Soccer.crc2.strokeStyle = "black";
            Soccer.crc2.stroke();
            // Rechter Punkt oben
            Soccer.crc2.beginPath();
            Soccer.crc2.arc(this.position.x + 8, this.position.y - 2, 1.7, 0, 2 * Math.PI, false);
            Soccer.crc2.fillStyle = "black";
            Soccer.crc2.fill();
            Soccer.crc2.lineWidth = 1;
            Soccer.crc2.strokeStyle = "black";
            Soccer.crc2.stroke();
            // Rechter Punkt unten
            Soccer.crc2.beginPath();
            Soccer.crc2.arc(this.position.x + 5, this.position.y + 7, 1.7, 0, 2 * Math.PI, false);
            Soccer.crc2.fillStyle = "black";
            Soccer.crc2.fill();
            Soccer.crc2.lineWidth = 1;
            Soccer.crc2.strokeStyle = "black";
            Soccer.crc2.stroke();
            // Linker Punkt unten
            Soccer.crc2.beginPath();
            Soccer.crc2.arc(this.position.x - 5, this.position.y + 7, 1.7, 0, 2 * Math.PI, false);
            Soccer.crc2.fillStyle = "black";
            Soccer.crc2.fill();
            Soccer.crc2.lineWidth = 1;
            Soccer.crc2.strokeStyle = "black";
            Soccer.crc2.stroke();
            Soccer.crc2.restore();
        }
        // erstmal so
        move(_target) {
            //move
            let direction, xDiff = this.xTarget - this.x;
            let yDiff = this.yTarget - this.y;
        }
    }
    Soccer.Ball = Ball;
})(Soccer || (Soccer = {}));
//# sourceMappingURL=ball.js.map