namespace Soccer {
    
    export class Referee extends Movable {
        constructor(_position: Vector) {
            super(
                new Vector(_position.X, _position.Y)
            );
            // set default target
            this.target = new Vector(_position.X, _position.Y);
            // set radius
            this.radius = 1.5;
        }

        public draw(): void {
            crc2.save();

            // draw player center
            crc2.beginPath();
            crc2.arc(this.position.X, this.position.Y, this.getRadius(), 0, 2 * Math.PI, false);
            crc2.fillStyle = this.color;
            crc2.fill();
            crc2.lineWidth = 1;
            crc2.strokeStyle = "#003300";
            crc2.stroke();
            crc2.restore();
        }
    }
}
