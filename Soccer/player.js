"use strict";
var Soccer;
(function (Soccer) {
    /// Klasse für den Player
    class Player extends Soccer.Moveable {
        constructor(_position, _startPosition, _team, _color, _speed, _precision, _jerseyNumber) {
            super(_position);
            // public position: Vector;
            this.radius = 15;
            // public startMoving: boolean = false; // neu dazu
            this.perceptionRadius = 160;
            this.active = true; // fürs Timeout wichtig
            this.startPosition = _startPosition; // ist die Position aus seinem Startarray
            this.team = _team;
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
        // move
        move() {
            //check if ball is in his perception radius (difference between player position and ball position smaller than perception radius)
            if (this.active == true) {
                //1. Distanz zum Ball ausrechnen
                let vectorToBall = new Soccer.Vector(Soccer.ball.position.x - this.position.x, Soccer.ball.position.y - this.position.y); //differenzvektor
                let distanceToBall = vectorToBall.length; //länge des differenzvektors
                let vectorToStartposition = new Soccer.Vector(this.startPosition.x - this.position.x, this.startPosition.y - this.position.y); //differenzvektor
                let distanceToStartposition = vectorToStartposition.length; //länge des differenzvektors
                // console.log(distanceToStartposition);
                //2. Checken, ob Distanz kleiner ist als der Wahnehmungsradius des Spielers
                // --> dann move to ball
                if (distanceToBall < this.perceptionRadius && distanceToBall > 24) {
                    //gleichmäßig bewegen: wie muss der faktor sein, mit dem direction skaliert wird, damit die länge von direction speed entspricht?
                    // Rechnung: speed / direction.length = skalierungsfaktor
                    let scale = (1 + this.speed * 0.2) / distanceToBall; // Speed is individuell! Speed wäre 1px --> 50px/sekunde 
                    vectorToBall.scale(scale);
                    this.position.add(vectorToBall);
                    // If difference between ball and player is smaller than 25, animation = false
                    if (distanceToBall > 24 && distanceToBall < 26) {
                        Soccer.animation = false; // damit Animation stoppt und nur dann kann man klicken
                        Soccer.playerAtBall = this; // Possession 
                        this.active = false; // damit er dann nicht mehr zum Ball rennen kann
                        setTimeout(() => {
                            this.toggleActivity();
                        }, 3000);
                    }
                    // Spieler läuft zurück zu seiner Startposition
                }
                else if (distanceToStartposition > 5) { // 5 damit sie nicht zittern
                    let scale = (1 + this.speed * 0.2) / distanceToStartposition;
                    vectorToStartposition.scale(scale);
                    this.position.add(vectorToStartposition);
                    console.log(distanceToStartposition);
                }
            }
            // enum - zum ball, chillen, zum start
            // Move mit scale checken
            // CustomEvent Haupt
            // Ball leichter weg zu bekommen vom Spieler mit timeout
            // Auswechseln mit mouseup and down
        }
        // damit er nach 3 Sekunden wieder auf den Ball zugreifen kann!
        toggleActivity() {
            this.active = true;
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