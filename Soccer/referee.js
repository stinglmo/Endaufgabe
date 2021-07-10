"use strict";
var Soccer;
(function (Soccer) {
    class Referee extends Soccer.Moveable {
        constructor(_position) {
            super(_position);
            this.radius = 15;
            this.perceptionRadius = 400; // größer als die der Spieler
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
            let vectorToBall = new Soccer.Vector(Soccer.ball.position.x - this.position.x, Soccer.ball.position.y - this.position.y); //differenzvektor
            let distanceToBall = vectorToBall.length; //länge des differenzvektors
            // Checken, ob Distanz kleiner ist als der Wahnehmungsradius des Schiedsrichters und sicherstellen, dass Schiedsrichter nicht an den Ball rankommt
            if (distanceToBall < this.perceptionRadius && distanceToBall > 100) {
                //move towards ball
                //gleichmäßig bewegen: wie muss der faktor sein, mit dem direction skaliert wird, damit die länge von direction speed entspricht?
                //speed / direction.length = skalierungsfaktor. Speed wäre 1px --> 50px/sekunde
                let scale = 1 / distanceToBall;
                vectorToBall.scale(scale);
                this.position.add(vectorToBall);
            }
        }
    }
    Soccer.Referee = Referee;
})(Soccer || (Soccer = {}));
//# sourceMappingURL=referee.js.map