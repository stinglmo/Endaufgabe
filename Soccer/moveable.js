"use strict";
var Soccer;
(function (Soccer) {
    // super class to handle movable objects
    class Movable {
        constructor(_position) {
            this.position = _position;
            this.speed = 1;
            this.speedLevel = 1;
            this.slowDown = false;
            this.radius = 2;
        }
        setColor(color) {
            this.color = color;
        }
        // public getRadius(): number {
        //     return this.radius * scale;
        // }
        setRadius(radius) {
            this.radius = radius;
        }
        setTarget(target) {
            this.target = target;
        }
        getTarget() {
            return this.target;
        }
        getPosition() {
            return this.position;
        }
        setPosition(position) {
            this.position = position;
        }
        getSpeed() {
            return this.speed;
        }
        setSpeed(speed) {
            this.speed = speed;
        }
        // Keine Ahnung ob das Sinn macht... (ist für die Player, die anderen Menschen überschrieben die move-Methode)
        move(target) {
            if (!target) {
                return;
            } // wenn es kein Target gibt
            // Diff Vector kalkulieren
            const diffVectr = new Soccer.Vector(target.X - this.position.X, target.Y - this.position.Y);
            // Die Länge vom Diff - Vektor kalkulieren und return bei 0 
            const vectorLength = Math.sqrt(Math.pow(diffVectr.X, 2) + Math.pow(diffVectr.Y, 2));
            if (vectorLength === 0) {
                return;
            }
            // Bei bewegten Möglichkeiten Geschwindigkeit kalkulieren
            const speedLevel = this.speedLevel * (this.speed / 100);
            // apply slow down if activated (Ball)
            const speed = this.slowDown ? speedLevel * (vectorLength / 100) : speedLevel;
            // Skaling kalkulieren
            const scaleFactor = speed / vectorLength;
            // Skaling auf Diff anpassen 
            diffVectr.scale(scaleFactor);
            // Diff zur aktuellen Position hinzufügen
            this.position.add(diffVectr);
        }
    }
    Soccer.Movable = Movable;
})(Soccer || (Soccer = {}));
//# sourceMappingURL=moveable.js.map