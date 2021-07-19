/*
Aufgabe: Endaufgabe Soccer Simulation
Name: Mona Stingl
Matrikel: 267315
Datum: 19.07.21
Quellen: Lektionen aus dem Unterricht (insbesondere Asteroids), MDN und W3School
Diese Abgabe ist in Zusammmenarbeit mit Hannah Dürr entstanden
*/

namespace Soccer {

    // Ball class
    export class Ball extends Moveable {

        public destination: Vector; // Position of the mouse click where the ball should move 
        public startMoving: boolean = false;
        public hitGoalA: boolean = false; // For dispatching the customevent 
        public hitGoalB: boolean = false;
        private radius: number = 10;

        constructor(_position: Vector) {
            super(_position);
        }

        public draw(): void {
            crc2.save();

            // Ball
            crc2.beginPath();
            crc2.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI, false);
            crc2.fillStyle = "white";
            crc2.fill();
            crc2.lineWidth = 1;
            crc2.strokeStyle = "black";
            crc2.stroke();

            // Second circle
            crc2.beginPath();
            crc2.arc(this.position.x, this.position.y, this.radius - 2.5, 0, 2 * Math.PI, false);
            crc2.fillStyle = "white";
            crc2.fill();
            crc2.lineWidth = 1;
            crc2.strokeStyle = "black";
            crc2.stroke();

            // Lines
            crc2.beginPath();
            crc2.moveTo(this.position.x, this.position.y - 10);
            crc2.lineTo(this.position.x, this.position.y - 2);
            crc2.stroke();

            crc2.beginPath();
            crc2.moveTo(this.position.x, this.position.y);
            crc2.lineTo(this.position.x - 6, this.position.y + 8);
            crc2.stroke();

            crc2.beginPath();
            crc2.moveTo(this.position.x, this.position.y);
            crc2.lineTo(this.position.x - 9, this.position.y - 3);
            crc2.stroke();

            crc2.beginPath();
            crc2.moveTo(this.position.x, this.position.y);
            crc2.lineTo(this.position.x + 9, this.position.y - 3);
            crc2.stroke();

            crc2.beginPath();
            crc2.moveTo(this.position.x, this.position.y - 1);
            crc2.lineTo(this.position.x + 6, this.position.y + 8);
            crc2.stroke();

            crc2.beginPath();
            crc2.arc(this.position.x, this.position.y, 2, 0, 2 * Math.PI, false);
            crc2.fillStyle = "black";
            crc2.fill();
            crc2.lineWidth = 2;
            crc2.strokeStyle = "black";
            crc2.stroke();

            crc2.beginPath();
            crc2.arc(this.position.x, this.position.y - 8, 1.7, 0, 2 * Math.PI, false);
            crc2.fillStyle = "black";
            crc2.fill();
            crc2.lineWidth = 1;
            crc2.strokeStyle = "black";
            crc2.stroke();

            crc2.beginPath();
            crc2.arc(this.position.x - 8, this.position.y - 2, 1.7, 0, 2 * Math.PI, false);
            crc2.fillStyle = "black";
            crc2.fill();
            crc2.lineWidth = 1;
            crc2.strokeStyle = "black";
            crc2.stroke();

            crc2.beginPath();
            crc2.arc(this.position.x + 8, this.position.y - 2, 1.7, 0, 2 * Math.PI, false);
            crc2.fillStyle = "black";
            crc2.fill();
            crc2.lineWidth = 1;
            crc2.strokeStyle = "black";
            crc2.stroke();

            crc2.beginPath();
            crc2.arc(this.position.x + 5, this.position.y + 7, 1.7, 0, 2 * Math.PI, false);
            crc2.fillStyle = "black";
            crc2.fill();
            crc2.lineWidth = 1;
            crc2.strokeStyle = "black";
            crc2.stroke();

            crc2.beginPath();
            crc2.arc(this.position.x - 5, this.position.y + 7, 1.7, 0, 2 * Math.PI, false);
            crc2.fillStyle = "black";
            crc2.fill();
            crc2.lineWidth = 1;
            crc2.strokeStyle = "black";
            crc2.stroke();

            crc2.restore();
        }


        public move(): void {

            // After a mouseclick 
            if (this.destination) {
                
                let direction: Vector = new Vector(this.destination.x - this.position.x, this.destination.y - this.position.y);
                let distance: number = 0;

                // Je größer die Distanz zwischen ball und klick, desto größer ist der radius um den klickpunkt, aus dem eine zufällige Zielposition gewählt wird
                if (this.startMoving == true) { // wenn geklickt wurde

                    // Precision of the player
                    if (playerAtBall)
                        distance = (playerAtBall.precision / 2) * (0.1 * direction.length);

                    // Precision depends on distance too
                    // The bigger the distance is, the less precise is the player
                    distance += (Math.random() - 0.5) * (0.25 * direction.length);

                    this.destination.x += distance;
                    this.destination.y += distance; 
                    this.startMoving = false;
                }

                // Each 50fps
                direction.scale(1 / 50);

                // The smaller is the distance, the faster is the ball 
                if (distance < 150) {
                    this.position.add(new Vector(direction.x * 2, direction.y * 2));
                } else {
                    this.position.add(direction);
                }

                // If the ball rolls outside the playingfield 
                // --> He will automatically be placed in the middle 
                if (this.position.x < 99 || this.position.x > 901 || this.position.y < 25 || this.position.y > 525) {
                    this.destination = new Vector(500, 275); 
                    this.position = new Vector(500, 275);
                }

                // Cheering - Sound
                if (this.position.x < 180 && this.position.x > 170 || this.position.x > 820 && this.position.x < 830) {
                    playSample(1);
                }
                this.checkGoal();
            }
        }

        
        // Check goal
        private checkGoal(): void {

            // Left goal
            if (this.position.x < 100 && this.position.y > 225 && this.position.y < 325) {
                
                if (this.hitGoalA == false) {

                    // Create custom event and dispatch it
                    let event: CustomEvent = new CustomEvent(SOCCER_EVENT.LEFTGOAL_HIT);
                    crc2.canvas.dispatchEvent(event);
                    this.hitGoalA = true;
                }
            }

            // Right goal
            if (this.position.x > 900 && this.position.y > 225 && this.position.y < 325) {
                
                if (this.hitGoalB == false) {

                    // Create custom event and dispatch it
                    let event: CustomEvent = new CustomEvent(SOCCER_EVENT.RIGHTGOAL_HIT);
                    crc2.canvas.dispatchEvent(event);
                    this.hitGoalB = true;
                }
            }
        }
    }
}