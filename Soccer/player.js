"use strict";
var Soccer;
(function (Soccer) {
    /// Klasse für den Player
    class Player extends Soccer.Moveable {
        constructor(_position, _startPosition, _team, _color, _speed, _precision, _jerseyNumber) {
            super(_position);
            this.radius = 15;
            this.perceptionRadius = 160;
            this.active = true; // fürs Timeout wichtig
            this.startPosition = _startPosition; // ist die Position aus seinem Startarray
            this.color = _color;
            this.speed = _speed;
            this.precision = _precision;
            this.jerseyNumber = _jerseyNumber;
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
            Soccer.crc2.strokeStyle = "black";
            Soccer.crc2.stroke();
            Soccer.crc2.textBaseline = "middle";
            Soccer.crc2.textAlign = "center";
            Soccer.crc2.fillStyle = "black";
            Soccer.crc2.fillText(this.jerseyNumber.toString(), this.position.x, this.position.y);
            // Radius zum überprüfen 
            // crc2.beginPath();
            // crc2.arc(this.position.x, this.position.y, this.perceptionRadius, 0, 2 * Math.PI, false);
            // crc2.lineWidth = 1;
            // crc2.strokeStyle = "#6D6D6D";
            // crc2.stroke();
            Soccer.crc2.restore();
        }
        move() {
            if (this.perceptionRadius > 0) { // Also ein Spieler auf dem Spielfeld und kein Auswechselspieler
                if (this.active == true) { // Nur, wenn er nicht gerade am Ball war
                    // 1. Distanz zum Ball ausrechnen
                    let vectorToBall = new Soccer.Vector(Soccer.ball.position.x - this.position.x, Soccer.ball.position.y - this.position.y); // Differenzvektor
                    let distanceToBall = vectorToBall.length; // Länge des differenzvektors
                    let vectorToStartposition = new Soccer.Vector(this.startPosition.x - this.position.x, this.startPosition.y - this.position.y); // Differenzvektor
                    let distanceToStartposition = vectorToStartposition.length; // Länge des Differenzvektors
                    // 2. Checken, ob Distanz kleiner ist als der Wahnehmungsradius des Spielers
                    // --> dann move to ball
                    if (distanceToBall < this.perceptionRadius && distanceToBall > 24) {
                        // Gleichmäßig bewegen: wie muss der faktor sein, mit dem direction skaliert wird, damit die länge von direction speed entspricht?
                        // Rechnung: speed / direction.length = skalierungsfaktor
                        let scale = (1 + this.speed * 0.2) / distanceToBall; // Speed is individuell! Speed wäre 1px --> 50px/sekunde 
                        vectorToBall.scale(scale);
                        this.position.add(vectorToBall);
                        // If difference between ball and player is smaller than 25, animation = false
                        if (distanceToBall > 24 && distanceToBall < 26) {
                            Soccer.animation = false; // Damit Animation stoppt und nur dann kann man klicken
                            Soccer.playerAtBall = this; // Possession 
                            this.active = false; // Damit er dann nicht mehr zum Ball rennen kann
                            setTimeout(() => {
                                this.toggleActivity();
                            }, 2000);
                        }
                        // Spieler läuft zurück zu seiner Startposition
                    }
                    else if (distanceToStartposition > 5) { // 5, damit sie nicht zittern
                        let scale = (1 + this.speed * 0.2) / distanceToStartposition;
                        vectorToStartposition.scale(scale);
                        this.position.add(vectorToStartposition);
                    }
                } // Close zweite Bedingung
                // Lernen: Enumeration
                // enum - zum ball, chillen, zum start
                // CustomEvent Haupt
                // Auswechseln mit mouseup and down
            } // Close erste Bedingung
        }
        // Damit er nach 3 Sekunden wieder auf den Ball zugreifen kann!
        toggleActivity() {
            this.active = true;
        }
        // Status checken um zu schauen, ob man die Spieler wie Spieler oder Auswechselspieler "behandelt"
        checkState() {
            if (this.position.x < 75 || this.position.x > 925) {
                this.perceptionRadius = 0;
            }
            else if (this.startPosition.x < 75 || this.startPosition.x > 925) {
                this.perceptionRadius = 0;
            }
            else {
                this.perceptionRadius = 160;
            }
        }
        // Wenn Player geklickt wurde:
        isClicked(_clickPosition) {
            let difference = new Soccer.Vector(_clickPosition.x - this.position.x, _clickPosition.y - this.position.y);
            return (difference.length < this.radius);
        }
    }
    Soccer.Player = Player;
})(Soccer || (Soccer = {}));
//# sourceMappingURL=player.js.map