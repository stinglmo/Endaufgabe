"use strict";
var Soccer;
(function (Soccer) {
    /// Klasse für den Player
    class Player extends Soccer.Moveable {
        constructor(_position, _team, _color, _speed, _precision, _jerseyNumber) {
            super(_position);
            this.radius = 15;
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
            Soccer.crc2.lineWidth = 2;
            Soccer.crc2.strokeStyle = "#003300";
            Soccer.crc2.stroke();
            Soccer.crc2.textBaseline = "middle";
            Soccer.crc2.textAlign = "center";
            Soccer.crc2.fillStyle = "black";
            Soccer.crc2.fillText(this.jerseyNumber.toString(), this.position.x, this.position.y);
            Soccer.crc2.restore();
        }
    }
    Soccer.Player = Player;
})(Soccer || (Soccer = {}));
//# sourceMappingURL=player.js.map