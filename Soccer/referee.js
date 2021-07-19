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
    class Referee extends Soccer.Moveable {
        constructor(_position) {
            super(_position);
            this.radius = 15;
            this.perceptionRadius = 400; // bigger than the perceptionradius of the player
        }
        draw() {
            Soccer.crc2.save();
            // Circle
            Soccer.crc2.beginPath();
            Soccer.crc2.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
            Soccer.crc2.closePath();
            Soccer.crc2.fillStyle = "white";
            Soccer.crc2.fill();
            Soccer.crc2.lineWidth = 2;
            Soccer.crc2.strokeStyle = "black";
            Soccer.crc2.stroke();
            // Stripes
            Soccer.crc2.beginPath();
            Soccer.crc2.moveTo(this.position.x - 13, this.position.y + 6);
            Soccer.crc2.lineTo(this.position.x + 13, this.position.y - 6);
            Soccer.crc2.stroke();
            Soccer.crc2.beginPath();
            Soccer.crc2.moveTo(this.position.x - 9, this.position.y + 12);
            Soccer.crc2.lineTo(this.position.x + 15, this.position.y + 1);
            Soccer.crc2.stroke();
            Soccer.crc2.beginPath();
            Soccer.crc2.moveTo(this.position.x - 15, this.position.y - 1);
            Soccer.crc2.lineTo(this.position.x + 10, this.position.y - 12);
            Soccer.crc2.stroke();
            Soccer.crc2.beginPath();
            Soccer.crc2.moveTo(this.position.x - 12, this.position.y - 8);
            Soccer.crc2.lineTo(this.position.x - 1, this.position.y + 14);
            Soccer.crc2.stroke();
            Soccer.crc2.beginPath();
            Soccer.crc2.moveTo(this.position.x - 6.5, this.position.y - 14);
            Soccer.crc2.lineTo(this.position.x + 7, this.position.y + 13);
            Soccer.crc2.stroke();
            Soccer.crc2.beginPath();
            Soccer.crc2.moveTo(this.position.x + 2, this.position.y - 14);
            Soccer.crc2.lineTo(this.position.x + 13, this.position.y + 9);
            Soccer.crc2.stroke();
            Soccer.crc2.restore();
        }
        // Moves in the direction of the ball 
        move() {
            // Calculate the distance to ball
            let vectorToBall = new Soccer.Vector(Soccer.ball.position.x - this.position.x, Soccer.ball.position.y - this.position.y); // Differenzvektor
            let distanceToBall = vectorToBall.length;
            // Check, if the distance is smaller than the perceptioradius of the player 
            // and make sure, that he will not come closer than the distance of 100
            // --> the referee moves to ball  
            if (distanceToBall < this.perceptionRadius && distanceToBall > 100) {
                let scale = 1 / distanceToBall; // Evenly
                vectorToBall.scale(scale);
                this.position.add(vectorToBall);
            }
        }
    }
    Soccer.Referee = Referee;
})(Soccer || (Soccer = {}));
//# sourceMappingURL=referee.js.map