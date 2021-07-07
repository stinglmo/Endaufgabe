"use strict";
var Soccer;
(function (Soccer) {
    /// Klasse für den Player
    class Player extends Soccer.Moveable {
        constructor(_position, _team, _color, _speed, _precision, _jerseyNumber) {
            super(_position);
            this.radius = 15;
            this.startMoving = false; // neu dazu
            this.perceptionRadius = 160;
            this.origin = new Soccer.Vector(0, 0); // Origin
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
            Soccer.crc2.beginPath();
            Soccer.crc2.arc(this.position.x, this.position.y, this.perceptionRadius, 0, 2 * Math.PI, false);
            Soccer.crc2.lineWidth = 1;
            Soccer.crc2.strokeStyle = "#6D6D6D";
            Soccer.crc2.stroke();
            Soccer.crc2.restore();
        }
        // Keine Ahnung ob das so passt haha
        distance(v1, v2) {
            let d = Math.sqrt(Math.pow(v2.x - v1.x, 2) +
                Math.pow(v2.y - v1.y, 2));
            return d;
        }
        // neu dazu
        move() {
            let v1 = new Soccer.Vector(Soccer.ball.position.x, Soccer.ball.position.y);
            let v2 = new Soccer.Vector(Soccer.player.position.x, Soccer.player.position.y);
            let d = Math.sqrt(Math.pow(v2.x - v1.x, 2) +
                Math.pow(v2.y - v1.y, 2));
            // So lange der Ball im Wahrnehmungsradius ist, bewegt er sich dorthin (also die Distanz muss kleiner sein als der Radius)                          
            if (d <= this.perceptionRadius) { // Differenz der Playerposition und Ballposition muss kleiner sein als der Radius
                Soccer.player.direction = new Soccer.Vector(Soccer.ball.position.x, Soccer.ball.position.y);
                Soccer.player.startMoving = true;
            }
            else {
                Soccer.player.direction = this.origin;
            }
            // Jede 50fps
            // this.direction.scale(1 / 50);
            // this.position.add(this.direction);
        }
    }
    Soccer.Player = Player;
})(Soccer || (Soccer = {}));
//# sourceMappingURL=player.js.map