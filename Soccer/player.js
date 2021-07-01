"use strict";
var Soccer;
(function (Soccer) {
    /// Klasse für den Player
    class Player extends Soccer.Movable {
        constructor(name, _position, shotPower = 70, precision = 70, speed = 80, color = "red", team = 0 /* trikotNumer: number = 0 */) {
            super(new Soccer.Vector(_position.X, _position.Y));
            this.speedLevel = 2; // Standartgeschwindigkeit welche mit Geschwindigkeit gescalet werden könnte 
            this.speed = 80; // Geschwindigkeit 1 - 99
            this.precision = 20; // Präzision 1 to 99
            this.origin = new Soccer.Vector(0, 0); // Ursprung vom Spieler
            this.actionRadius = 30; // Aktion Radius
            // private active: boolean; // Schauen ob der Spieler auf dem Feld ist oder ein Auswechselspieler ist 
            this.shotPower = 100; // Schießkraft
            this.shotPower = shotPower;
            this.precision = precision;
            this.speed = speed;
            this.color = color;
            this.team = team;
            // this.active = true;
            // this.tricotNumber = trikotNumer;
            this.radius = 2;
            this.setName(name);
            this.origin = new Soccer.Vector(_position.X, _position.Y);
        }
        // public setActive(active: boolean): void {
        //     this.active = active;
        // }
        getTeam() {
            return this.team;
        }
        setTeam(team) {
            this.team = team;
        }
        getColor() {
            return this.color;
        }
        setColor(color) {
            this.color = color;
        }
        setShotPower(power) {
            this.shotPower = power;
        }
        setPrecision(prec) {
            this.precision = prec;
        }
        getPrecision() {
            return this.precision;
        }
        getShotPower() {
            return this.shotPower;
        }
        getName() {
            return this.name;
        }
        setName(name) {
            this.name = name;
        }
        getActionRadius() {
            return this.actionRadius * Soccer.scale;
        }
        getOrigin() {
            return this.origin;
        }
        setOrigin(origin) {
            this.origin = origin;
        }
        draw() {
            Soccer.crc2.save();
            // draw player center
            Soccer.crc2.beginPath();
            Soccer.crc2.arc(this.position.X, this.position.Y, 2 * 1.5, 0, 2 * Math.PI, false);
            Soccer.crc2.fillStyle = this.color;
            Soccer.crc2.fill();
            Soccer.crc2.lineWidth = 2;
            Soccer.crc2.strokeStyle = "#003300";
            Soccer.crc2.stroke();
            // So müsste die Nummer irgendwie reinzuschreiben sein
            // crc2.textBaseline = "middle";
            // crc2.textAlign = "center";
            // crc2.fillStyle = "white"; 
            // crc2.fillText(this.getTricotNumber().toString(), this.position.X, this.position.Y);
            Soccer.crc2.restore();
        }
        getPosition() {
            return this.position;
        }
    }
    Soccer.Player = Player;
})(Soccer || (Soccer = {}));
//# sourceMappingURL=player.js.map