namespace Soccer {

    /// Klasse für den Player
    export class Player extends Movable {

        protected speedLevel: number = 2; // Standartgeschwindigkeit welche mit Geschwindigkeit gescalet werden könnte 
        protected color: string; // Farbe
        protected speed: number = 80; // Geschwindigkeit 1 - 99
        protected precision: number = 20; // Präzision 1 to 99
        private origin: Vector = new Vector(0, 0); // Ursprung vom Spieler
        private actionRadius: number = 30; // Aktion Radius
        // private tricotNumber: number; // Trikotnummer -> noch schauen wie darstellbar
        private team: number; // Teamnummer
        private name: string; // Name vom Spieler
        // private active: boolean; // Schauen ob der Spieler auf dem Feld ist oder ein Auswechselspieler ist 
        private shotPower: number = 100; // Schießkraft

        constructor(name: string, _position: Vector, shotPower: number = 70, precision: number = 70, speed: number = 80, color: string = "red", team: number = 0 /* trikotNumer: number = 0 */) {
            super(new Vector(_position.X, _position.Y));

            this.shotPower = shotPower;
            this.precision = precision;
            this.speed = speed;
            this.color = color;
            this.team = team;
            // this.active = true;
            // this.tricotNumber = trikotNumer;
            this.radius = 2;


            this.setName(name);
            this.origin = new Vector(_position.X, _position.Y);
        }

        // public setActive(active: boolean): void {
        //     this.active = active;
        // }

        public getTeam(): number {
            return this.team;
        }

        public setTeam(team: number): void {
            this.team = team;
        }

        public getColor(): string {
            return this.color;
        }

        public setColor(color: string): void {
            this.color = color;
        }

        public setShotPower(power: number): void {
            this.shotPower = power;
        }

        public setPrecision(prec: number): void {
            this.precision = prec;
        }

        public getPrecision(): number {
            return this.precision;
        }

        public getShotPower(): number {
            return this.shotPower;
        }

        public getName(): string {
            return this.name;
        }

        public setName(name: string): void {
            this.name = name;
        }

        public getActionRadius(): number {
            return this.actionRadius * scale;
        }

        public getOrigin(): Vector {
            return this.origin;
        }

        public setOrigin(origin: Vector): void {
            this.origin = origin;
        }

        
        public draw(): void {
            crc2.save();

            // draw player center
            crc2.beginPath();
            crc2.arc(this.position.X, this.position.Y, 2 * 1.5, 0, 2 * Math.PI, false);
            crc2.fillStyle = this.color;
            crc2.fill();
            crc2.lineWidth = 2;
            crc2.strokeStyle = "#003300";
            crc2.stroke();

            // So müsste die Nummer irgendwie reinzuschreiben sein
            // crc2.textBaseline = "middle";
            // crc2.textAlign = "center";
            // crc2.fillStyle = "white"; 
            // crc2.fillText(this.getTricotNumber().toString(), this.position.X, this.position.Y);

            crc2.restore();
        }

        getPosition(): Vector {
            return this.position;
        }
    }
}
