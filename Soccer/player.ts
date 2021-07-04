namespace Soccer {

    /// Klasse für den Player
    export class Player extends Moveable {

        public radius: number = 15;
        team: string;
        color: string;
        speed: number;
        precision: number;
        jerseyNumber: number;


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
            crc2.fillStyle = this.color;
            crc2.fill();
            crc2.lineWidth = 2;
            crc2.strokeStyle = "#003300";
            crc2.stroke();

            // So müsste die Nummer irgendwie reinzuschreiben sein
            // crc2.textBaseline = "middle";
            // crc2.textAlign = "center";
            // crc2.fillStyle = "white"; 
            // crc2.fillText(this.getTricotNumber().toString(), this.position.X, this.position.Y);

            crc2.restore();
        }

    }
}
