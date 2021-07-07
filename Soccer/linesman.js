"use strict";
var Soccer;
(function (Soccer) {
    class Linesman extends Soccer.Moveable {
        constructor(_position) {
            super(_position);
            this.radius = 13.5;
        }
        draw() {
            Soccer.crc2.save();
            // draw player center
            Soccer.crc2.beginPath();
            Soccer.crc2.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
            Soccer.crc2.closePath();
            Soccer.crc2.fillStyle = "#FFFF00"; // gelb
            Soccer.crc2.fill();
            Soccer.crc2.lineWidth = 2;
            Soccer.crc2.strokeStyle = "red";
            Soccer.crc2.stroke();
            // Mittelpunkt
            Soccer.crc2.beginPath();
            Soccer.crc2.arc(this.position.x, this.position.y, 2, 0, 2 * Math.PI, false);
            Soccer.crc2.fillStyle = "red";
            Soccer.crc2.fill();
            Soccer.crc2.lineWidth = 2;
            Soccer.crc2.strokeStyle = "red";
            Soccer.crc2.stroke();
            Soccer.crc2.beginPath();
            Soccer.crc2.arc(this.position.x + 9, this.position.y, 2, 0, 2 * Math.PI, false);
            Soccer.crc2.fillStyle = "red";
            Soccer.crc2.fill();
            Soccer.crc2.lineWidth = 2;
            Soccer.crc2.strokeStyle = "red";
            Soccer.crc2.stroke();
            Soccer.crc2.beginPath();
            Soccer.crc2.arc(this.position.x - 9, this.position.y, 2, 0, 2 * Math.PI, false);
            Soccer.crc2.fillStyle = "red";
            Soccer.crc2.fill();
            Soccer.crc2.lineWidth = 2;
            Soccer.crc2.strokeStyle = "red";
            Soccer.crc2.stroke();
            Soccer.crc2.beginPath();
            Soccer.crc2.arc(this.position.x, this.position.y + 9, 2, 0, 2 * Math.PI, false);
            Soccer.crc2.fillStyle = "red";
            Soccer.crc2.fill();
            Soccer.crc2.lineWidth = 2;
            Soccer.crc2.strokeStyle = "red";
            Soccer.crc2.stroke();
            Soccer.crc2.beginPath();
            Soccer.crc2.arc(this.position.x, this.position.y - 9, 2, 0, 2 * Math.PI, false);
            Soccer.crc2.fillStyle = "red";
            Soccer.crc2.fill();
            Soccer.crc2.lineWidth = 2;
            Soccer.crc2.strokeStyle = "red";
            Soccer.crc2.stroke();
            Soccer.crc2.beginPath();
            Soccer.crc2.arc(this.position.x + 5, this.position.y - 5, 2, 0, 2 * Math.PI, false);
            Soccer.crc2.fillStyle = "red";
            Soccer.crc2.fill();
            Soccer.crc2.lineWidth = 2;
            Soccer.crc2.strokeStyle = "red";
            Soccer.crc2.stroke();
            Soccer.crc2.beginPath();
            Soccer.crc2.arc(this.position.x - 5, this.position.y + 5, 2, 0, 2 * Math.PI, false);
            Soccer.crc2.fillStyle = "red";
            Soccer.crc2.fill();
            Soccer.crc2.lineWidth = 2;
            Soccer.crc2.strokeStyle = "red";
            Soccer.crc2.stroke();
            Soccer.crc2.beginPath();
            Soccer.crc2.arc(this.position.x - 4.5, this.position.y - 4.5, 2, 0, 2 * Math.PI, false);
            Soccer.crc2.fillStyle = "red";
            Soccer.crc2.fill();
            Soccer.crc2.lineWidth = 2;
            Soccer.crc2.strokeStyle = "red";
            Soccer.crc2.stroke();
            Soccer.crc2.beginPath();
            Soccer.crc2.arc(this.position.x + 4.5, this.position.y + 4.5, 2, 0, 2 * Math.PI, false);
            Soccer.crc2.fillStyle = "red";
            Soccer.crc2.fill();
            Soccer.crc2.lineWidth = 2;
            Soccer.crc2.strokeStyle = "red";
            Soccer.crc2.stroke();
            Soccer.crc2.restore();
        }
        move() {
            // immer auf der Höhe vom Ball
            this.position.x = Soccer.ball.position.x;
        }
    }
    Soccer.Linesman = Linesman;
})(Soccer || (Soccer = {}));
//# sourceMappingURL=linesman.js.map