namespace Soccer {
    // super class to handle movable objects
    
    export abstract class Movable {

        protected position: Vector;
        protected speed: number;
        protected slowDown: boolean;
        protected speedLevel: number;
        protected target: Vector;
        protected color: string;
        protected radius: number;

        constructor(_position: Vector) {
            this.position = _position;
            this.speed = 1;
            this.speedLevel = 1;
            this.slowDown = false;
            this.radius = 2;
        }

        public setColor(color: string): void {
            this.color = color;
        }

        public getRadius(): number {
            return this.radius * scale;
        }

        public setRadius(radius: number): void {
            this.radius = radius;
        }

        public setTarget(target: Vector): void {
            this.target = target;
        }

        public getTarget(): Vector {
            return this.target;
        }

        public getPosition(): Vector {
            return this.position;
        }

        public setPosition(position: Vector): void {
            this.position = position;
        }

        public getSpeed(): number {
            return this.speed;
        }

        public setSpeed(speed: number): void {
            this.speed = speed;
        }

        // wird dann von allen Menschen überschrieben
        public abstract draw(): void;

        
        // Keine Ahnung ob das Sinn macht... (ist für die Player, die anderen Menschen überschrieben die move-Methode)
        public move(target: Vector): void {

            if (!target) { return; } // wenn es kein Target gibt

            // Diff Vector kalkulieren
            const diffVectr: Vector = new Vector(
                target.X - this.position.X,
                target.Y - this.position.Y
            );

            // Die Länge vom Diff - Vektor kalkulieren und return bei 0 
            // --> Quadratwurzel ist Math.sqrt und Math.pow gibt die Potenz der Basis mit dem Exponenten an
            const vectorLength: number = Math.sqrt(Math.pow(diffVectr.X, 2) + Math.pow(diffVectr.Y, 2));
            if (vectorLength === 0) { return; }

            // Bei bewegten Möglichkeiten Geschwindigkeit kalkulieren
            const speedLevel: number = this.speedLevel * (this.speed / 100);

            // apply slow down if activated (Ball)
            const speed: number = this.slowDown ? speedLevel * (vectorLength / 100) : speedLevel;

            // Skaling kalkulieren
            const scaleFactor: number = speed / vectorLength;

            // Skaling auf Diff anpassen 
            diffVectr.scale(scaleFactor);

            // Diff zur aktuellen Position hinzufügen
            this.position.add(diffVectr);
        }

    }

}