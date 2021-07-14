namespace Soccer {
    
    // Superklasse um moveables zu handeln
    export abstract class Moveable {

        public position: Vector;

        constructor(_position: Vector) {
            this.position = _position;
        }

        // Wird dann von allen Menschen überschrieben
        public abstract draw(): void;

        public abstract move(): void;
       

        

    }

}