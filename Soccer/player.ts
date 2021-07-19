/*
Aufgabe: Endaufgabe Soccer Simulation
Name: Mona Stingl
Matrikel: 267315
Datum: 19.07.21
Quellen: Lektionen aus dem Unterricht (insbesondere Asteroids), MDN und W3School
Diese Abgabe ist in Zusammmenarbeit mit Hannah Dürr entstanden
*/

namespace Soccer {

    // Player class
    export class Player extends Moveable {

        public team: string;
        public startPosition: Vector; // Origin
        public speed: number;
        public precision: number;
        public jerseyNumber: number;

        private radius: number = 15;
        private perceptionRadius: number = 160;
        private active: boolean = true; // For timeout
        private color: string;

        constructor(_position: Vector, _startPosition: Vector, _team: string, _color: string, _speed: number, _precision: number, _jerseyNumber: number) {
            super(_position);
            this.startPosition = _startPosition; 
            this.team = _team;
            this.color = _color;
            this.speed = _speed;
            this.precision = _precision;
            this.jerseyNumber = _jerseyNumber;
        }

        public draw(): void {
            crc2.save();

            // Draw player center
            crc2.beginPath();
            crc2.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI, false);
            crc2.closePath();
            crc2.fillStyle = this.color;
            crc2.fill();
            crc2.lineWidth = 1;
            crc2.strokeStyle = "black";
            crc2.stroke();

            crc2.textBaseline = "middle";
            crc2.textAlign = "center";
            crc2.fillStyle = "black";
            crc2.fillText(this.jerseyNumber.toString(), this.position.x, this.position.y);

            // Showing the perceptionradius 
            // crc2.beginPath();
            // crc2.arc(this.position.x, this.position.y, this.perceptionRadius, 0, 2 * Math.PI, false);
            // crc2.lineWidth = 1;
            // crc2.strokeStyle = "#6D6D6D";
            // crc2.stroke();

            crc2.restore();
        }

        public move(): void {

            if (this.perceptionRadius > 0) {

                if (this.active == true) { // Just the one who wasn´t the player shortly before

                    // Calculate the distance to ball
                    let vectorToBall: Vector = new Vector(ball.position.x - this.position.x, ball.position.y - this.position.y); // Differenzvektor
                    let distanceToBall: number = vectorToBall.length; 

                    // Calculate the distance to startposition
                    let vectorToStartposition: Vector = new Vector(this.startPosition.x - this.position.x, this.startPosition.y - this.position.y); // Differenzvektor
                    let distanceToStartposition: number = vectorToStartposition.length; 

                    // Check, if the distance is smaller than the perceptioradius of the player 
                    // --> The player moves to ball
                    if (distanceToBall < this.perceptionRadius && distanceToBall > 24) {

                        // Individuell speed / vectorToBall.length = scalefactor
                        let scale: number = (1 + this.speed * 0.2) / distanceToBall; // Evenly
                        vectorToBall.scale(scale);
                        this.position.add(vectorToBall);

                        // If difference between ball and player is smaller than 25, animation = false
                        // --> Animation stopps
                        if (distanceToBall > 24 && distanceToBall < 26) {
                            
                            animation = false; 
                            playerAtBall = this;  
                            this.active = false; 
                            setTimeout(() => {
                                this.activate();
                            },         2000);
                        }

                    // The player moves to startposition
                    } else if (distanceToStartposition > 5) { 

                        let scale: number = (1 + this.speed * 0.2) / distanceToStartposition;
                        vectorToStartposition.scale(scale);
                        this.position.add(vectorToStartposition);
                    }
                } 
            } 
        } // Close move

        // If player is clicked
        public isClicked(_clickPosition: Vector): Boolean {

            let difference: Vector = new Vector(_clickPosition.x - this.position.x, _clickPosition.y - this.position.y);
            return (difference.length < this.radius);
        }

        // Check, if the player should be a spare player or not
        // If yes -->  perceptionradius = 0 
        public checkState(): void {

            if (this.position.x < 75 || this.position.x > 925) {
                this.perceptionRadius = 0;
            } else if (this.startPosition.x < 75 || this.startPosition.x > 925) {
                this.perceptionRadius = 0;
            } else {
                this.perceptionRadius = 160;
            }
        }

        // To reactivate the player who was at the ball 
        private activate(): void {

            this.active = true;
        }
    }
}
