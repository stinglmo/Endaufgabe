"use strict";
/*
Aufgabe: Endaufgabe Soccer Simulation
Name: Mona Stingl
Matrikel: 267315
Datum: 19.07.21
Quellen: Lektionen aus dem Unterricht (insbesondere Asteroids), MDN und W3School
Diese Abgabe ist in Zusammmenarbeit mit Hannah Dürr entstanden
*/
var Soccer;
(function (Soccer) {
    // Linesman class
    class Linesman extends Soccer.Moveable {
        constructor(_position) {
            super(_position);
            this.radius = 13.5;
        }
        draw() {
            Soccer.crc2.save();
            // Circle
            Soccer.crc2.beginPath();
            Soccer.crc2.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
            Soccer.crc2.closePath();
            Soccer.crc2.fillStyle = "#FFFF00"; // yellow
            Soccer.crc2.fill();
            Soccer.crc2.lineWidth = 2;
            Soccer.crc2.strokeStyle = "red";
            Soccer.crc2.stroke();
            // Points
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
            this.position.x = Soccer.ball.position.x;
        }
    }
    Soccer.Linesman = Linesman;
})(Soccer || (Soccer = {}));
//# sourceMappingURL=linesman.js.map