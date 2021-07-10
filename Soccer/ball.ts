
namespace Soccer {

    export class Ball extends Moveable {

        public radius: number = 10;
        public destination: Vector; //position of the click where the ball will roll to
        public startMoving: boolean = false;
        public hitGoalA: boolean = false; // nur dann wird das CustomEvent losgeschickt
        public hitGoalB: boolean = false;

        constructor(_position: Vector) {
            super(_position);
        }

        public draw(): void {
            crc2.save();

            // draw player center
            crc2.beginPath();
            crc2.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI, false);
            crc2.fillStyle = "white";
            crc2.fill();
            crc2.lineWidth = 1;
            crc2.strokeStyle = "black";
            crc2.stroke();

            // Zweiter Kreis
            crc2.beginPath();
            crc2.arc(this.position.x, this.position.y, this.radius - 2.5, 0, 2 * Math.PI, false);
            crc2.fillStyle = "white";
            crc2.fill();
            crc2.lineWidth = 1;
            crc2.strokeStyle = "black";
            crc2.stroke();

            // Strich oben
            crc2.beginPath();
            crc2.moveTo(this.position.x, this.position.y - 10);
            crc2.lineTo(this.position.x, this.position.y - 2);
            crc2.stroke();

            // Linker Strich unten
            crc2.beginPath();
            crc2.moveTo(this.position.x, this.position.y);
            crc2.lineTo(this.position.x - 6, this.position.y + 8);
            crc2.stroke();

            // Linker Strich oben
            crc2.beginPath();
            crc2.moveTo(this.position.x, this.position.y);
            crc2.lineTo(this.position.x - 9, this.position.y - 3);
            crc2.stroke();

            // Rechter Strich oben
            crc2.beginPath();
            crc2.moveTo(this.position.x, this.position.y);
            crc2.lineTo(this.position.x + 9, this.position.y - 3);
            crc2.stroke();

            // Rechter Strich unten
            crc2.beginPath();
            crc2.moveTo(this.position.x, this.position.y - 1);
            crc2.lineTo(this.position.x + 6, this.position.y + 8);
            crc2.stroke();

            // Mittelpunkt
            crc2.beginPath();
            crc2.arc(this.position.x, this.position.y, 2, 0, 2 * Math.PI, false);
            crc2.fillStyle = "black";
            crc2.fill();
            crc2.lineWidth = 2;
            crc2.strokeStyle = "black";
            crc2.stroke();

            // Punkt oben
            crc2.beginPath();
            crc2.arc(this.position.x, this.position.y - 8, 1.7, 0, 2 * Math.PI, false);
            crc2.fillStyle = "black";
            crc2.fill();
            crc2.lineWidth = 1;
            crc2.strokeStyle = "black";
            crc2.stroke();

            // Linker Punkt oben
            crc2.beginPath();
            crc2.arc(this.position.x - 8, this.position.y - 2, 1.7, 0, 2 * Math.PI, false);
            crc2.fillStyle = "black";
            crc2.fill();
            crc2.lineWidth = 1;
            crc2.strokeStyle = "black";
            crc2.stroke();

            // Rechter Punkt oben
            crc2.beginPath();
            crc2.arc(this.position.x + 8, this.position.y - 2, 1.7, 0, 2 * Math.PI, false);
            crc2.fillStyle = "black";
            crc2.fill();
            crc2.lineWidth = 1;
            crc2.strokeStyle = "black";
            crc2.stroke();

            // Rechter Punkt unten
            crc2.beginPath();
            crc2.arc(this.position.x + 5, this.position.y + 7, 1.7, 0, 2 * Math.PI, false);
            crc2.fillStyle = "black";
            crc2.fill();
            crc2.lineWidth = 1;
            crc2.strokeStyle = "black";
            crc2.stroke();

            // Linker Punkt unten
            crc2.beginPath();
            crc2.arc(this.position.x - 5, this.position.y + 7, 1.7, 0, 2 * Math.PI, false);
            crc2.fillStyle = "black";
            crc2.fill();
            crc2.lineWidth = 1;
            crc2.strokeStyle = "black";
            crc2.stroke();

            crc2.restore();
        }


        move(): void {

            // Wenn es eine Destination gibt, bewegt sich der Ball dorthin (also nach einem Klick)
            if (this.destination) {
                let direction: Vector = new Vector(this.destination.x - this.position.x, this.destination.y - this.position.y);

                //je weiter die Destination vom Ball weg ist, desto ungenauer ist der Schuss 
                //je größer die Distanz zwischen ball und klick, desto größer ist der radius um den klickpunkt, aus dem eine zufällige Zielposition gewählt wird
                if (this.startMoving == true) { // wenn geklickt wurde

                    // Präzision abhängig von der Distanz des Klicks zum Ball
                    let distance: number = (Math.random() - 0.5) * (0.15 * direction.length);

                    // Präzision abhängig vom Spieler am Ball
                    this.destination.x += distance;
                    this.destination.y += distance; // y
                    this.startMoving = false;
                }

                // jede 50fps
                direction.scale(1 / 50);
                this.position.add(direction);

                // wenn der aus dem Spielfeld rausrollt, wird er automatisch zurück in die Mitte gesetzt:
                if (this.position.x < 98 || this.position.x > 902 || this.position.y < 25 || this.position.y > 525) {
                    this.position = new Vector(500, 275);
                }

                // CheckGoal
                this.checkGoal();
            }
        }

        
        //check, if ball hit goals:
        checkGoal(): void {

            if (this.position.x < 100 && this.position.y > 250 && this.position.y < 300) {
                if (this.hitGoalA == false) {
                    //create custom event and dispatch it 
                    console.log("Goal for team A");
                    let event: CustomEvent = new CustomEvent(SOCCER_EVENT.LEFTGOAL_HIT);
                    crc2.canvas.dispatchEvent(event);
                    this.hitGoalA = true;
                }
            }
            if (this.position.x > 900 && this.position.y > 250 && this.position.y < 300) {
                if (this.hitGoalB == false) {
                    //create custom event and dispatch it 
                    console.log("Goal for team B");
                    let event: CustomEvent = new CustomEvent(SOCCER_EVENT.RIGHTGOAL_HIT);
                    crc2.canvas.dispatchEvent(event);
                    this.hitGoalB = true;
                }
            }

        }
    }
}