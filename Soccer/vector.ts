namespace Soccer {
    //Jirkas Code (Asteroids/vector.ts)

    export class Vector {
        public x: number;
        public y: number;
        

        constructor(_x: number, _y: number) {
            this.x = _x, 
            this.y = _y;
        }

        public get length(): number {
            return Math.hypot(this.x, this.y);
        }

        public scale(_factor: number): void {
            this.x *= _factor;
            this.y *= _factor;
        }

        public add(_addend: Vector): void {
            this.x += _addend.x;
            this.y += _addend.y;
        }

    }
}