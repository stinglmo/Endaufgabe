namespace Soccer {
    //Jirkas Code (Asteroids/vector.ts)

    export let scale: number = 5; // Skale

    export class Vector {
        public X: number;
        public Y: number;
        

        constructor(_X: number, _Y: number) {
            this.X = _X;
            this.Y = _Y;
        }

        public scale(_factor: number): void {
            this.X *= _factor;
            this.Y *= _factor;
        }

        public add(_added: Vector): void {
            this.X += _added.X;
            this.Y += _added.Y;
        }

        // Keine Ahnung ob das so passt haha
        distance(v1: Vector, v2: Vector): number {
            let d: number = Math.sqrt(Math.pow(v2.X - v1.X, 2) +
                Math.pow(v2.Y - v1.Y, 2));
            return d;
        }

        
    }
}