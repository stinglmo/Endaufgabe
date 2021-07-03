namespace Soccer {
    export class Linesman extends Movable {
        private targetFn: () => Vector;

        constructor(_position: Vector) {
            super(
                new Vector(_position.X, _position.Y)
            );
            this.target = new Vector(_position.X, _position.Y);
            this.radius = 1.5;


        }
        public setTargetFn(cb: () => Vector): void {
            this.targetFn = cb;
        }

        public getTargetFn(): Vector {
            return this.targetFn();
        }

        public draw(): void {
            crc2.save();

            // draw player center
            crc2.beginPath();
            crc2.arc(this.position.X, this.position.Y, this.getRadius() , 0, 2 * Math.PI, false);
            crc2.fillStyle = this.color;
            crc2.fill();
            crc2.lineWidth = 1;
            crc2.strokeStyle = "#003300";
            crc2.stroke();

            crc2.restore();
        }
    }
}
