namespace Soccer {
    // super class to handle movable objects
    
    export abstract class Moveable {

        public position: Vector;
        public radius: number;
        public color: string;
        public speed: number;

        constructor(_position: Vector) {
            this.position = _position;
        }

        // wird dann von allen Menschen überschrieben
        public draw(): void {
            //
        }

        
        // Keine Ahnung ob das Sinn macht... (ist für die Player, die anderen Menschen überschrieben die move-Methode)
        public move(): void { // target: Vector rausgelöscht

        //     if (!target) { return; } // wenn es kein Target gibt

        //     // Diff Vector kalkulieren
        //     const diffVectr: Vector = new Vector(
        //         target.x - this.position.x,
        //         target.y - this.position.y
        //     );

        //     // Die Länge vom Diff - Vektor kalkulieren und return bei 0 
        //     // --> Quadratwurzel ist Math.sqrt und Math.pow gibt die Potenz der Basis mit dem Exponenten an
        //     const vectorLength: number = Math.sqrt(Math.pow(diffVectr.x, 2) + Math.pow(diffVectr.y, 2));
        //     if (vectorLength === 0) { return; }

        //     // Bei bewegten Möglichkeiten Geschwindigkeit kalkulieren
        //     // const speedLevel: number = this.speedLevel * (this.speed / 100);

        //     // apply slow down if activated (Ball)
        //     // const speed: number = this.slowDown ? speedLevel * (vectorLength / 100) : speedLevel;

        //     // Skaling kalkulieren
        //     const scaleFactor: number = this.speed / vectorLength;

        //     // Skaling auf Diff anpassen 
        //     diffVectr.scale(scaleFactor);

        //     // Diff zur aktuellen Position hinzufügen
        //     this.position.add(diffVectr);
        // }

        

    }

}}