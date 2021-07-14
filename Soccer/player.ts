namespace Soccer {

    /// Klasse für den Player
    export class Player extends Moveable {

        public startPosition: Vector; // Origin
        public speed: number;
        public precision: number;
        public jerseyNumber: number;

        private radius: number = 15;
        private perceptionRadius: number = 160;
        private active: boolean = true; // fürs Timeout wichtig
        private color: string;



        constructor(_position: Vector, _startPosition: Vector, _team: string, _color: string, _speed: number, _precision: number, _jerseyNumber: number) {
            super(_position);
            this.startPosition = _startPosition; // ist die Position aus seinem Startarray
            this.color = _color;
            this.speed = _speed;
            this.precision = _precision;
            this.jerseyNumber = _jerseyNumber;
        }


        public draw(): void {
            crc2.save();

            // draw player center
            crc2.beginPath();
            crc2.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI, false);
            crc2.closePath();
            crc2.fillStyle = this.color;
            crc2.fill();
            crc2.lineWidth = 1;
            crc2.strokeStyle = "black";
            crc2.stroke();

            crc2.textBaseline = "middle";
            crc2.textAlign = "center";
            crc2.fillStyle = "black";
            crc2.fillText(this.jerseyNumber.toString(), this.position.x, this.position.y);

            // Radius zum überprüfen 
            // crc2.beginPath();
            // crc2.arc(this.position.x, this.position.y, this.perceptionRadius, 0, 2 * Math.PI, false);
            // crc2.lineWidth = 1;
            // crc2.strokeStyle = "#6D6D6D";
            // crc2.stroke();

            crc2.restore();
        }

        public move(): void {

            if (this.perceptionRadius > 0) {// Also ein Spieler auf dem Spielfeld und kein Auswechselspieler

                if (this.active == true) { // Nur, wenn er nicht gerade am Ball war
                    // 1. Distanz zum Ball ausrechnen
                    let vectorToBall: Vector = new Vector(ball.position.x - this.position.x, ball.position.y - this.position.y); // Differenzvektor
                    let distanceToBall: number = vectorToBall.length; // Länge des differenzvektors

                    let vectorToStartposition: Vector = new Vector(this.startPosition.x - this.position.x, this.startPosition.y - this.position.y); // Differenzvektor
                    let distanceToStartposition: number = vectorToStartposition.length; // Länge des Differenzvektors

                    // 2. Checken, ob Distanz kleiner ist als der Wahnehmungsradius des Spielers
                    // --> dann move to ball
                    if (distanceToBall < this.perceptionRadius && distanceToBall > 24) {

                        // Gleichmäßig bewegen: wie muss der faktor sein, mit dem direction skaliert wird, damit die länge von direction speed entspricht?
                        // Rechnung: speed / direction.length = skalierungsfaktor
                        let scale: number = (1 + this.speed * 0.2) / distanceToBall; // Speed is individuell! Speed wäre 1px --> 50px/sekunde 
                        vectorToBall.scale(scale);
                        this.position.add(vectorToBall);

                        // If difference between ball and player is smaller than 25, animation = false
                        if (distanceToBall > 24 && distanceToBall < 26) {
                            animation = false; // Damit Animation stoppt und nur dann kann man klicken
                            playerAtBall = this; // Possession 
                            this.active = false; // Damit er dann nicht mehr zum Ball rennen kann
                            setTimeout(() => {
                                this.toggleActivity();
                            },         2000);

                        }

                        // Spieler läuft zurück zu seiner Startposition
                    } else if (distanceToStartposition > 5) { // 5, damit sie nicht zittern

                        let scale: number = (1 + this.speed * 0.2) / distanceToStartposition;
                        vectorToStartposition.scale(scale);
                        this.position.add(vectorToStartposition);

                    }

                } // Close zweite Bedingung


                // Lernen: Enumeration

                // enum - zum ball, chillen, zum start

                // CustomEvent Haupt

                // Auswechseln mit mouseup and down

            } // Close erste Bedingung

        }

        // Damit er nach 3 Sekunden wieder auf den Ball zugreifen kann!
        toggleActivity(): void {
            this.active = true;
        }

        // Status checken um zu schauen, ob man die Spieler wie Spieler oder Auswechselspieler "behandelt"
        public checkState(): void {
            if (this.position.x < 75 || this.position.x > 925) {
                this.perceptionRadius = 0;
            } else if (this.startPosition.x < 75 || this.startPosition.x > 925) {
                this.perceptionRadius = 0;
            } else {
                this.perceptionRadius = 160;
            }
        }

        // Wenn Player geklickt wurde:
        isClicked(_clickPosition: Vector): Boolean {
            let difference: Vector = new Vector(_clickPosition.x - this.position.x, _clickPosition.y - this.position.y);
            return (difference.length < this.radius);
        }

    }
}
