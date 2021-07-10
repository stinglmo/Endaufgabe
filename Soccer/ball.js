"use strict";
var Soccer;
(function (Soccer) {
    class Ball extends Soccer.Moveable {
        constructor(_position) {
            super(_position);
            this.radius = 10;
            this.startMoving = false;
            this.hitGoalA = false; // nur dann wird das CustomEvent losgeschickt
            this.hitGoalB = false;
        }
        draw() {
            Soccer.crc2.save();
            // draw player center
            Soccer.crc2.beginPath();
            Soccer.crc2.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI, false);
            Soccer.crc2.fillStyle = "white";
            Soccer.crc2.fill();
            Soccer.crc2.lineWidth = 1;
            Soccer.crc2.strokeStyle = "black";
            Soccer.crc2.stroke();
            // Zweiter Kreis
            Soccer.crc2.beginPath();
            Soccer.crc2.arc(this.position.x, this.position.y, this.radius - 2.5, 0, 2 * Math.PI, false);
            Soccer.crc2.fillStyle = "white";
            Soccer.crc2.fill();
            Soccer.crc2.lineWidth = 1;
            Soccer.crc2.strokeStyle = "black";
            Soccer.crc2.stroke();
            // Strich oben
            Soccer.crc2.beginPath();
            Soccer.crc2.moveTo(this.position.x, this.position.y - 10);
            Soccer.crc2.lineTo(this.position.x, this.position.y - 2);
            Soccer.crc2.stroke();
            // Linker Strich unten
            Soccer.crc2.beginPath();
            Soccer.crc2.moveTo(this.position.x, this.position.y);
            Soccer.crc2.lineTo(this.position.x - 6, this.position.y + 8);
            Soccer.crc2.stroke();
            // Linker Strich oben
            Soccer.crc2.beginPath();
            Soccer.crc2.moveTo(this.position.x, this.position.y);
            Soccer.crc2.lineTo(this.position.x - 9, this.position.y - 3);
            Soccer.crc2.stroke();
            // Rechter Strich oben
            Soccer.crc2.beginPath();
            Soccer.crc2.moveTo(this.position.x, this.position.y);
            Soccer.crc2.lineTo(this.position.x + 9, this.position.y - 3);
            Soccer.crc2.stroke();
            // Rechter Strich unten
            Soccer.crc2.beginPath();
            Soccer.crc2.moveTo(this.position.x, this.position.y - 1);
            Soccer.crc2.lineTo(this.position.x + 6, this.position.y + 8);
            Soccer.crc2.stroke();
            // Mittelpunkt
            Soccer.crc2.beginPath();
            Soccer.crc2.arc(this.position.x, this.position.y, 2, 0, 2 * Math.PI, false);
            Soccer.crc2.fillStyle = "black";
            Soccer.crc2.fill();
            Soccer.crc2.lineWidth = 2;
            Soccer.crc2.strokeStyle = "black";
            Soccer.crc2.stroke();
            // Punkt oben
            Soccer.crc2.beginPath();
            Soccer.crc2.arc(this.position.x, this.position.y - 8, 1.7, 0, 2 * Math.PI, false);
            Soccer.crc2.fillStyle = "black";
            Soccer.crc2.fill();
            Soccer.crc2.lineWidth = 1;
            Soccer.crc2.strokeStyle = "black";
            Soccer.crc2.stroke();
            // Linker Punkt oben
            Soccer.crc2.beginPath();
            Soccer.crc2.arc(this.position.x - 8, this.position.y - 2, 1.7, 0, 2 * Math.PI, false);
            Soccer.crc2.fillStyle = "black";
            Soccer.crc2.fill();
            Soccer.crc2.lineWidth = 1;
            Soccer.crc2.strokeStyle = "black";
            Soccer.crc2.stroke();
            // Rechter Punkt oben
            Soccer.crc2.beginPath();
            Soccer.crc2.arc(this.position.x + 8, this.position.y - 2, 1.7, 0, 2 * Math.PI, false);
            Soccer.crc2.fillStyle = "black";
            Soccer.crc2.fill();
            Soccer.crc2.lineWidth = 1;
            Soccer.crc2.strokeStyle = "black";
            Soccer.crc2.stroke();
            // Rechter Punkt unten
            Soccer.crc2.beginPath();
            Soccer.crc2.arc(this.position.x + 5, this.position.y + 7, 1.7, 0, 2 * Math.PI, false);
            Soccer.crc2.fillStyle = "black";
            Soccer.crc2.fill();
            Soccer.crc2.lineWidth = 1;
            Soccer.crc2.strokeStyle = "black";
            Soccer.crc2.stroke();
            // Linker Punkt unten
            Soccer.crc2.beginPath();
            Soccer.crc2.arc(this.position.x - 5, this.position.y + 7, 1.7, 0, 2 * Math.PI, false);
            Soccer.crc2.fillStyle = "black";
            Soccer.crc2.fill();
            Soccer.crc2.lineWidth = 1;
            Soccer.crc2.strokeStyle = "black";
            Soccer.crc2.stroke();
            Soccer.crc2.restore();
        }
        move() {
            // Wenn es eine Destination gibt, bewegt sich der Ball dorthin (also nach einem Klick)
            if (this.destination) {
                let direction = new Soccer.Vector(this.destination.x - this.position.x, this.destination.y - this.position.y);
                //je weiter die Destination vom Ball weg ist, desto ungenauer ist der Schuss 
                //je größer die Distanz zwischen ball und klick, desto größer ist der radius um den klickpunkt, aus dem eine zufällige Zielposition gewählt wird
                if (this.startMoving == true) { // wenn geklickt wurde
                    let distance = (Math.random() - 0.5) * (0.15 * direction.length);
                    this.destination.x += distance;
                    this.destination.y += distance; // y
                    this.startMoving = false;
                }
                // jede 50fps
                direction.scale(1 / 50);
                this.position.add(direction);
                // wenn der aus dem Spielfeld rausrollt, wird er automatisch zurück in die Mitte gesetzt:
                if (this.position.x < 100 || this.position.x > 900 || this.position.y < 25 || this.position.y > 525) {
                    this.position = new Soccer.Vector(500, 275);
                }
                // CheckGoal
                this.checkGoal();
            }
        }
        checkGoal() {
            //check, if ball hit goals:
            if (this.position.x < 100 && this.position.y > 250 && this.position.y < 300) {
                if (this.hitGoalA == false) {
                    //create custom event and dispatch it 
                    console.log("Goal for team A");
                    let event = new CustomEvent(Soccer.SOCCER_EVENT.LEFTGOAL_HIT);
                    Soccer.crc2.canvas.dispatchEvent(event);
                    this.hitGoalA = true;
                }
            }
            if (this.position.x > 900 && this.position.y > 250 && this.position.y < 300) {
                if (this.hitGoalB == false) {
                    //create custom event and dispatch it 
                    console.log("Goal for team B");
                    let event = new CustomEvent(Soccer.SOCCER_EVENT.RIGHTGOAL_HIT);
                    Soccer.crc2.canvas.dispatchEvent(event);
                    this.hitGoalB = true;
                }
            }
        }
    }
    Soccer.Ball = Ball;
})(Soccer || (Soccer = {}));
//# sourceMappingURL=ball.js.map