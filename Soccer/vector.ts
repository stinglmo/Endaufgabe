namespace Soccer {
    //Jirkas Code (Asteroids/vector.ts)

    export class Vector {
        public x: number;
        public y: number;
        

        constructor(_x: number, _y: number) {
            this.set(_x, _y);
        }

        public static getDifference(_v0: Vector, _v1: Vector): Vector {
            return new Vector(_v0.x - _v1.x, _v0.y - _v1.y);
        }

        public get length(): number {
            return Math.hypot(this.x, this.y);
        }

        public set(_x: number, _y: number): void {
            this.x = _x;
            this.y = _y;
        }

        public scale(_factor: number): void {
            this.x *= _factor;
            this.y *= _factor;
        }

        public add(_added: Vector): void {
            this.x += _added.x;
            this.y += _added.y;
        }

        // // Keine Ahnung ob das so passt haha
        // public distance(v1: Vector, v2: Vector): number {
        //     let d: number = Math.sqrt(Math.pow(v2.x - v1.x, 2) +
        //         Math.pow(v2.y - v1.y, 2));
        //     return d;
        // }

        
    }
}