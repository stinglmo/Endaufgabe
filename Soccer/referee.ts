namespace Soccer {

    export class Referee extends Moveable {

        public radius: number = 15;
        public perceptionRadius: number = 400; // Größer als die der Spieler

        constructor(_position: Vector) {
            super(_position);
        }

        public draw(): void {
            crc2.save();

            // Kreis
            crc2.beginPath();
            crc2.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
            crc2.closePath();
            crc2.fillStyle = "white";
            crc2.fill();
            crc2.lineWidth = 2;
            crc2.strokeStyle = "black";
            crc2.stroke();

            // Streifen
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

        // Rollt immer zum Ball (aber nie ganz ran)
        move(): void {

            let vectorToBall: Vector = new Vector(ball.position.x - this.position.x, ball.position.y - this.position.y); // Differenzvektor
            let distanceToBall: number = vectorToBall.length; // Länge des Differenzvektors

            // Checken, ob Distanz kleiner ist als der Wahnehmungsradius des Schiedsrichters und sicherstellen, dass Schiedsrichter nicht an den Ball rankommt
            if (distanceToBall < this.perceptionRadius && distanceToBall > 100) {
               
                let scale: number = 1 / distanceToBall; // Bewegt sich gleichmäßig drauf zu
                vectorToBall.scale(scale);
                this.position.add(vectorToBall);

            }
        }
    }
}
