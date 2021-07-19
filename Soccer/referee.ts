/*
Aufgabe: Endaufgabe Soccer Simulation
Name: Mona Stingl
Matrikel: 267315
Datum: 19.07.21
Quellen: Lektionen aus dem Unterricht (insbesondere Asteroids), MDN und W3School
Diese Abgabe ist in Zusammmenarbeit mit Hannah Dürr entstanden
*/

namespace Soccer {

    export class Referee extends Moveable {

        public radius: number = 15;
        public perceptionRadius: number = 400; // bigger than the perceptionradius of the player

        constructor(_position: Vector) {
            super(_position);
        }

        public draw(): void {
            crc2.save();

            // Circle
            crc2.beginPath();
            crc2.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
            crc2.closePath();
            crc2.fillStyle = "white";
            crc2.fill();
            crc2.lineWidth = 2;
            crc2.strokeStyle = "black";
            crc2.stroke();

            // Stripes
            crc2.beginPath();
            crc2.moveTo(this.position.x - 13, this.position.y + 6);
            crc2.lineTo(this.position.x + 13, this.position.y - 6);
            crc2.stroke();

            crc2.beginPath();
            crc2.moveTo(this.position.x - 9, this.position.y + 12);
            crc2.lineTo(this.position.x + 15, this.position.y + 1);
            crc2.stroke();

            crc2.beginPath();
            crc2.moveTo(this.position.x - 15, this.position.y - 1);
            crc2.lineTo(this.position.x + 10, this.position.y - 12);
            crc2.stroke();

            crc2.beginPath();
            crc2.moveTo(this.position.x - 12, this.position.y - 8);
            crc2.lineTo(this.position.x - 1, this.position.y + 14);
            crc2.stroke();

            crc2.beginPath();
            crc2.moveTo(this.position.x - 6.5, this.position.y - 14);
            crc2.lineTo(this.position.x + 7, this.position.y + 13);
            crc2.stroke();

            crc2.beginPath();
            crc2.moveTo(this.position.x + 2, this.position.y - 14);
            crc2.lineTo(this.position.x + 13, this.position.y + 9);
            crc2.stroke();

            crc2.restore();
        }

        // Moves in the direction of the ball 
        move(): void {

            // Calculate the distance to ball
            let vectorToBall: Vector = new Vector(ball.position.x - this.position.x, ball.position.y - this.position.y); // Differenzvektor
            let distanceToBall: number = vectorToBall.length; 

            // Check, if the distance is smaller than the perceptioradius of the player 
            // and make sure, that he will not come closer than the distance of 100
            // --> the referee moves to ball  
            if (distanceToBall < this.perceptionRadius && distanceToBall > 100) {
               
                let scale: number = 1 / distanceToBall; // Evenly
                vectorToBall.scale(scale);
                this.position.add(vectorToBall);
            }
        }
    }
}
