namespace Soccer {

    /// Klasse für den Player
    export class Player extends Moveable {

        public radius: number = 15;
        team: string;
        color: string;
        speed: number;
        precision: number;
        jerseyNumber: number;
        public direction: Vector; // neu dazu
        public startMoving: boolean = false; // neu dazu
        public perceptionRadius: number = 160;
        private origin: Vector = new Vector(0, 0); // Origin


        constructor(_position: Vector, _team: string, _color: string, _speed: number, _precision: number, _jerseyNumber: number) {
            super(_position);
            this.team = _team;
            this.color = _color;
            this.speed = _speed;
            this.precision = _precision;
            this.jerseyNumber = _jerseyNumber;
        }


        public draw(): void {
            crc2.save();

            // draw player center
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

            // Radius zum überprüfen 
            crc2.beginPath();
            crc2.arc(this.position.x, this.position.y, this.perceptionRadius, 0, 2 * Math.PI, false);
            crc2.lineWidth = 1;
            crc2.strokeStyle = "#6D6D6D";
            crc2.stroke();

            crc2.restore();
        }

        // Keine Ahnung ob das so passt haha
        public distance(v1: Vector, v2: Vector): number {
            let d: number = Math.sqrt(Math.pow(v2.x - v1.x, 2) +
                Math.pow(v2.y - v1.y, 2));
            return d;
        }

        

        // neu dazu
        public move(): void {

        let v1: Vector = new Vector(ball.position.x, ball.position.y);
        let v2: Vector = new Vector(player.position.x, player.position.y);

        let d: number = Math.sqrt(Math.pow(v2.x - v1.x, 2) +
                Math.pow(v2.y - v1.y, 2));

         // So lange der Ball im Wahrnehmungsradius ist, bewegt er sich dorthin (also die Distanz muss kleiner sein als der Radius)                          
        if (d <= this.perceptionRadius) { // Differenz der Playerposition und Ballposition muss kleiner sein als der Radius
            player.direction = new Vector(ball.position.x, ball.position.y);
            player.startMoving = true;
        } else {
            player.direction = this.origin;
        }

        // Jede 50fps
        // this.direction.scale(1 / 50);
        // this.position.add(this.direction);

       
        }

    }
}
