"use strict";
var Soccer;
(function (Soccer) {
    class Referee extends Soccer.Moveable {
        constructor(_position) {
            super(_position);
            this.radius = 15;
            this.perceptionRadius = 400; // Größer als die der Spieler
        }
        draw() {
            Soccer.crc2.save();
            // Kreis
            Soccer.crc2.beginPath();
            Soccer.crc2.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
            Soccer.crc2.closePath();
            Soccer.crc2.fillStyle = "white";
            Soccer.crc2.fill();
            Soccer.crc2.lineWidth = 2;
            Soccer.crc2.strokeStyle = "black";
            Soccer.crc2.stroke();
            // Streifen
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
        // Rollt immer zum Ball (aber nie ganz ran)
        move() {
            let vectorToBall = new Soccer.Vector(Soccer.ball.position.x - this.position.x, Soccer.ball.position.y - this.position.y); // Differenzvektor
            let distanceToBall = vectorToBall.length; // Länge des Differenzvektors
            // Checken, ob Distanz kleiner ist als der Wahnehmungsradius des Schiedsrichters und sicherstellen, dass Schiedsrichter nicht an den Ball rankommt
            if (distanceToBall < this.perceptionRadius && distanceToBall > 100) {
                let scale = 1 / distanceToBall; // Bewegt sich gleichmäßig drauf zu
                vectorToBall.scale(scale);
                this.position.add(vectorToBall);
            }
        }
    }
    Soccer.Referee = Referee;
})(Soccer || (Soccer = {}));
//# sourceMappingURL=referee.js.map