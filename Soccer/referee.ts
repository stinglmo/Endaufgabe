namespace Soccer {
    
    export class Referee extends Moveable {

        public radius: number = 15;

        constructor(_position: Vector) {
            super(_position);
        }

        public draw(): void {
            crc2.save();

            // draw player center
            crc2.beginPath();
            crc2.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
            crc2.closePath();
            crc2.fillStyle = "#FF6700";
            crc2.fill();

            crc2.restore();
        }

        move(): void {
            //
        }
    }
}
