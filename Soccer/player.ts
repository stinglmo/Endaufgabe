namespace Soccer {

    /// Klasse für den Player
    export class Player extends Moveable {

        // public position: Vector;
        public radius: number = 15;
        team: string;
        color: string;
        speed: number;
        precision: number;
        jerseyNumber: number;
        // public startMoving: boolean = false; // neu dazu
        public perceptionRadius: number = 160;
        public startPosition: Vector; // Origin


        constructor(_position: Vector, _startPosition: Vector, _team: string, _color: string, _speed: number, _precision: number, _jerseyNumber: number) {
            super(_position);
            this.startPosition = _startPosition;
            this.team = _team;
            this.color = _color;
            this.speed = _speed;
            this.precision = _precision;
            this.jerseyNumber = _jerseyNumber;
            this.startPosition = _position; // ist die Position aus seinem Startarray
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


        // neu dazu
        public move(): void {

            //move
            //check if ball is in his perception radius (difference between player position and ball position smaller than perception radius)

            //1. Distanz zum Ball ausrechnen
            let vectorToBall: Vector = new Vector(ball.position.x - this.position.x, ball.position.y - this.position.y); //differenzvektor
            let distanceToBall: number = vectorToBall.length; //länge des differenzvektors

            let vectorToStartposition: Vector = new Vector(this.startPosition.x - this.position.x, this.startPosition.y - this.position.y); //differenzvektor
            let distanceToStartposition: number = vectorToStartposition.length; //länge des differenzvektors
                
            //2. Checken, ob Distanz kleiner ist als der Wahnehmungsradius des Spielers
            if (distanceToBall < this.perceptionRadius) {
                //move towards ball
                //gleichmäßig bewegen: wie muss der faktor sein, mit dem direction skaliert wird, damit die länge von direction speed entspricht?
                //speed / direction.length = skalierungsfaktor. Speed wäre 1px --> 50px/sekunde
                let scale: number = 1 / distanceToBall;
                vectorToBall.scale(scale);
                this.position.add(vectorToBall);
                playerAtBall = this; // Possession

                //if difference between ball and player is smaller than 25, animation = false
                //wenn spieler am Ball ankommt, stoppt animation
                if (distanceToBall > 24 && distanceToBall < 26) {
                    animation = false;
                }
            } else if (distanceToStartposition > 0) {
                //spieler läuft zurück zu seiner startposition
                let scale: number = 1 / distanceToStartposition;
                vectorToStartposition.scale(scale);
                this.position.add(vectorToStartposition);
            }


        
        // Move mit scale checken
        // Speed muss noch überlegen bei Player move 
        // CustomEvent Haupt
        // Ball leichter weg zu bekommen vom Spieler mit timeout
        // Auswechseln

       
        }

        // Wenn Player geklickt wurde:
        isClicked(_clickPosition: Vector): Boolean {
            let difference: Vector = new Vector(_clickPosition.x - this.position.x, _clickPosition.y - this.position.y);
            return(difference.length < this.radius);
        }


    }
}
