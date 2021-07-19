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
    // Player class
    class Player extends Soccer.Moveable {
        constructor(_position, _startPosition, _team, _color, _speed, _precision, _jerseyNumber) {
            super(_position);
            this.radius = 15;
            this.perceptionRadius = 160;
            this.active = true; // For timeout
            this.startPosition = _startPosition;
            this.team = _team;
            this.color = _color;
            this.speed = _speed;
            this.precision = _precision;
            this.jerseyNumber = _jerseyNumber;
        }
        draw() {
            Soccer.crc2.save();
            // Draw player center
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
            // Showing the perceptionradius 
            // crc2.beginPath();
            // crc2.arc(this.position.x, this.position.y, this.perceptionRadius, 0, 2 * Math.PI, false);
            // crc2.lineWidth = 1;
            // crc2.strokeStyle = "#6D6D6D";
            // crc2.stroke();
            Soccer.crc2.restore();
        }
        move() {
            if (this.perceptionRadius > 0) {
                if (this.active == true) { // Just the one who wasn´t the player shortly before
                    // Calculate the distance to ball
                    let vectorToBall = new Soccer.Vector(Soccer.ball.position.x - this.position.x, Soccer.ball.position.y - this.position.y); // Differenzvektor
                    let distanceToBall = vectorToBall.length;
                    // Calculate the distance to startposition
                    let vectorToStartposition = new Soccer.Vector(this.startPosition.x - this.position.x, this.startPosition.y - this.position.y); // Differenzvektor
                    let distanceToStartposition = vectorToStartposition.length;
                    // Check, if the distance is smaller than the perceptioradius of the player 
                    // --> The player moves to ball
                    if (distanceToBall < this.perceptionRadius && distanceToBall > 24) {
                        // Individuell speed / vectorToBall.length = scalefactor
                        let scale = (1 + this.speed * 0.2) / distanceToBall; // Evenly
                        vectorToBall.scale(scale);
                        this.position.add(vectorToBall);
                        // If difference between ball and player is smaller than 25, animation = false
                        // --> Animation stopps
                        if (distanceToBall > 24 && distanceToBall < 26) {
                            Soccer.animation = false;
                            Soccer.playerAtBall = this;
                            this.active = false;
                            setTimeout(() => {
                                this.activate();
                            }, 2000);
                        }
                        // The player moves to startposition
                    }
                    else if (distanceToStartposition > 5) {
                        let scale = (1 + this.speed * 0.2) / distanceToStartposition;
                        vectorToStartposition.scale(scale);
                        this.position.add(vectorToStartposition);
                    }
                }
            }
        } // Close move
        // If player is clicked
        isClicked(_clickPosition) {
            let difference = new Soccer.Vector(_clickPosition.x - this.position.x, _clickPosition.y - this.position.y);
            return (difference.length < this.radius);
        }
        // Check, if the player should be a spare player or not
        // If yes -->  perceptionradius = 0 
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
        // To reactivate the player who was at the ball 
        activate() {
            this.active = true;
        }
    }
    Soccer.Player = Player;
})(Soccer || (Soccer = {}));
//# sourceMappingURL=player.js.map