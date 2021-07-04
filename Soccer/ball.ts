namespace Soccer {
    
    export class Ball extends Moveable {
        
        public radius: number = 10;
        destination: Vector; //position of the click where the ball will roll to

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

            crc2.beginPath();
            crc2.moveTo(this.position.x, this.position.y - 10);
            crc2.lineTo(this.position.x, this.position.y - 2);
            crc2.stroke();

            crc2.beginPath();
            crc2.moveTo(this.position.x, this.position.y + 2);
            crc2.lineTo(this.position.x, this.position.y + 10);
            crc2.stroke();

            crc2.beginPath();
            crc2.moveTo(this.position.x - 10, this.position.y);
            crc2.lineTo(this.position.x - 2, this.position.y);
            crc2.stroke();

            crc2.beginPath();
            crc2.moveTo(this.position.x + 2, this.position.y);
            crc2.lineTo(this.position.x + 10, this.position.y);
            crc2.stroke();


            crc2.restore();
        }

        // erstmal so
        move(): void {
            //move
            this.position.x += 4;
            this.position.y += 2;

            if (this.position.x < 0)
                this.position.x += crc2.canvas.width;
            if (this.position.y < 0)
                this.position.y += crc2.canvas.height;
            if (this.position.x > crc2.canvas.width)
                this.position.x -= crc2.canvas.width;
            if (this.position.y > crc2.canvas.height)
                this.position.y -= crc2.canvas.height;
        }
    }
}