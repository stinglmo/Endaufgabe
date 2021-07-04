namespace Soccer {
    export class Linesman extends Moveable {
       
        public radius: number = 15;

        constructor(_position: Vector) {
            super(_position);
        }
     
        public draw(): void {
            crc2.save();

            // draw player center
            crc2.beginPath();
            crc2.arc(this.position.x, this.position.y, this.radius , 0, 2 * Math.PI, false);
            crc2.closePath();
            crc2.fillStyle = this.color;
            crc2.fill();
            crc2.lineWidth = 1;
            crc2.strokeStyle = "#003300";
            crc2.stroke();

            crc2.restore();
        }

        move(): void {
            //move
            this.position.x = ball.position.x;
        }
    }
}
