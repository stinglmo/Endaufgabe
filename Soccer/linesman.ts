namespace Soccer {
    export class Linesman extends Moveable {
       
        public radius: number = 13.5;

        constructor(_position: Vector) {
            super(_position);
        }
     
        public draw(): void {
            crc2.save();

            // draw player center
            crc2.beginPath();
            crc2.arc(this.position.x, this.position.y, this.radius , 0, 2 * Math.PI);
            crc2.closePath();
            crc2.fillStyle = "#FFFF00"; // gelb
            crc2.fill();
            crc2.lineWidth = 2;
            crc2.strokeStyle = "red";
            crc2.stroke();

            // Mittelpunkt
            crc2.beginPath();
            crc2.arc(this.position.x, this.position.y, 2, 0, 2 * Math.PI, false);
            crc2.fillStyle = "red";
            crc2.fill();
            crc2.lineWidth = 2;
            crc2.strokeStyle = "red";
            crc2.stroke();

            crc2.beginPath();
            crc2.arc(this.position.x + 9, this.position.y, 2, 0, 2 * Math.PI, false);
            crc2.fillStyle = "red";
            crc2.fill();
            crc2.lineWidth = 2;
            crc2.strokeStyle = "red";
            crc2.stroke();

            crc2.beginPath();
            crc2.arc(this.position.x - 9, this.position.y, 2, 0, 2 * Math.PI, false);
            crc2.fillStyle = "red";
            crc2.fill();
            crc2.lineWidth = 2;
            crc2.strokeStyle = "red";
            crc2.stroke();

            crc2.beginPath();
            crc2.arc(this.position.x, this.position.y + 9, 2, 0, 2 * Math.PI, false);
            crc2.fillStyle = "red";
            crc2.fill();
            crc2.lineWidth = 2;
            crc2.strokeStyle = "red";
            crc2.stroke();

            crc2.beginPath();
            crc2.arc(this.position.x, this.position.y - 9, 2, 0, 2 * Math.PI, false);
            crc2.fillStyle = "red";
            crc2.fill();
            crc2.lineWidth = 2;
            crc2.strokeStyle = "red";
            crc2.stroke();

            crc2.beginPath();
            crc2.arc(this.position.x + 5, this.position.y - 5, 2, 0, 2 * Math.PI, false);
            crc2.fillStyle = "red";
            crc2.fill();
            crc2.lineWidth = 2;
            crc2.strokeStyle = "red";
            crc2.stroke();

            crc2.beginPath();
            crc2.arc(this.position.x - 5, this.position.y + 5, 2, 0, 2 * Math.PI, false);
            crc2.fillStyle = "red";
            crc2.fill();
            crc2.lineWidth = 2;
            crc2.strokeStyle = "red";
            crc2.stroke();

            crc2.beginPath();
            crc2.arc(this.position.x - 4.5, this.position.y - 4.5, 2, 0, 2 * Math.PI, false);
            crc2.fillStyle = "red";
            crc2.fill();
            crc2.lineWidth = 2;
            crc2.strokeStyle = "red";
            crc2.stroke();

            crc2.beginPath();
            crc2.arc(this.position.x + 4.5, this.position.y + 4.5, 2, 0, 2 * Math.PI, false);
            crc2.fillStyle = "red";
            crc2.fill();
            crc2.lineWidth = 2;
            crc2.strokeStyle = "red";
            crc2.stroke();

            crc2.restore();
        }

        move(): void {
            // immer auf der Höhe vom Ball
            this.position.x = ball.position.x;
        }
    }
}
