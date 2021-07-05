
namespace Soccer {
    
    export class Ball extends Moveable {
        
        public radius: number = 10;
        public destination: Vector; //position of the click where the ball will roll to

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

            // Zweiter Kreis
            crc2.beginPath();
            crc2.arc(this.position.x, this.position.y, this.radius - 2.5, 0, 2 * Math.PI, false);
            crc2.fillStyle = "white";
            crc2.fill();
            crc2.lineWidth = 1;
            crc2.strokeStyle = "black";
            crc2.stroke();

            // Strich oben
            crc2.beginPath();
            crc2.moveTo(this.position.x, this.position.y - 10);
            crc2.lineTo(this.position.x, this.position.y - 2);
            crc2.stroke();

            // Linker Strich unten
            crc2.beginPath();
            crc2.moveTo(this.position.x, this.position.y);
            crc2.lineTo(this.position.x - 6, this.position.y + 8);
            crc2.stroke();

            // Linker Strich oben
            crc2.beginPath();
            crc2.moveTo(this.position.x, this.position.y);
            crc2.lineTo(this.position.x - 9, this.position.y - 3);
            crc2.stroke();

            // Rechter Strich oben
            crc2.beginPath();
            crc2.moveTo(this.position.x, this.position.y);
            crc2.lineTo(this.position.x + 9, this.position.y - 3);
            crc2.stroke();

            // Rechter Strich unten
            crc2.beginPath();
            crc2.moveTo(this.position.x, this.position.y - 1);
            crc2.lineTo(this.position.x + 6, this.position.y + 8);
            crc2.stroke();
           
            // Mittelpunkt
            crc2.beginPath();
            crc2.arc(this.position.x, this.position.y, 2, 0, 2 * Math.PI, false);
            crc2.fillStyle = "black";
            crc2.fill();
            crc2.lineWidth = 2;
            crc2.strokeStyle = "black";
            crc2.stroke();

            // Punkt oben
            crc2.beginPath();
            crc2.arc(this.position.x, this.position.y - 8, 1.7, 0, 2 * Math.PI, false);
            crc2.fillStyle = "black";
            crc2.fill();
            crc2.lineWidth = 1;
            crc2.strokeStyle = "black";
            crc2.stroke();
            
            // Linker Punkt oben
            crc2.beginPath();
            crc2.arc(this.position.x - 8, this.position.y - 2, 1.7, 0, 2 * Math.PI, false);
            crc2.fillStyle = "black";
            crc2.fill();
            crc2.lineWidth = 1;
            crc2.strokeStyle = "black";
            crc2.stroke();

            // Rechter Punkt oben
            crc2.beginPath();
            crc2.arc(this.position.x + 8, this.position.y - 2, 1.7, 0, 2 * Math.PI, false);
            crc2.fillStyle = "black";
            crc2.fill();
            crc2.lineWidth = 1;
            crc2.strokeStyle = "black";
            crc2.stroke();

            // Rechter Punkt unten
            crc2.beginPath();
            crc2.arc(this.position.x + 5, this.position.y + 7, 1.7, 0, 2 * Math.PI, false);
            crc2.fillStyle = "black";
            crc2.fill();
            crc2.lineWidth = 1;
            crc2.strokeStyle = "black";
            crc2.stroke();

            // Linker Punkt unten
            crc2.beginPath();
            crc2.arc(this.position.x - 5, this.position.y + 7, 1.7, 0, 2 * Math.PI, false);
            crc2.fillStyle = "black";
            crc2.fill();
            crc2.lineWidth = 1;
            crc2.strokeStyle = "black";
            crc2.stroke();


            crc2.restore();
        }

        // erstmal so
        move(_target: Vector): void { // geändert
            //move
            
            let direction: 
            
            let xDiff: number = this.xTarget - this.x;
            let yDiff: number = this.yTarget - this.y;
        }
    }
}