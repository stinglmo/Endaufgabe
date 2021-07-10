
namespace Soccer {

    export let crc2: CanvasRenderingContext2D;
    let landingPage: HTMLDivElement;
    let startbutton: HTMLDivElement;
    let restartbutton: HTMLSpanElement;
    let pausebutton: HTMLSpanElement;

    // Folgenden 6 bekommen Formularwerte
    let minimumSpeed: number = 1;
    let maximumSpeed: number = 5;
    let minimumPrecision: number = 1;
    let maximumPrecision: number = 5;
    let teamAColor: string = "66b2ff";
    let teamBColor: string = "ff3333";

    let goalsA: number = 0;
    let goalsB: number = 0;
    let field: Playingfield;
    export let animation: boolean = false; // damit im Player drauf zugreifen kann
    let animationInterval: number;
    export let ball: Ball;
    export let playerAtBall: Player; // für Informationsanzeige
    export let nobodyIsRunning: Boolean; // handle shootBall
    
    export enum SOCCER_EVENT {
        RIGHTGOAL_HIT = "rightGoalHit", // zum hochzählen
        LEFTGOAL_HIT = "leftGoalHit"
    }

    export interface PlayerInformation {
        x: number;
        y: number;
        team: string;
    }

    export let playerInformation: PlayerInformation[] = [

        // Team A
        { x: 135, y: 275, team: "A" },
        { x: 180, y: 100, team: "A" },
        { x: 820, y: 450, team: "A" },
        { x: 700, y: 475, team: "A" },
        { x: 700, y: 325, team: "A" },
        { x: 300, y: 325, team: "A" },
        { x: 700, y: 75, team: "A" },
        { x: 600, y: 150, team: "A" },
        { x: 400, y: 400, team: "A" },
        { x: 450, y: 275, team: "A" },
        { x: 500, y: 75, team: "A" },

        // Team B
        { x: 500, y: 475, team: "B" },
        { x: 550, y: 275, team: "B" },
        { x: 400, y: 150, team: "B" },
        { x: 600, y: 400, team: "B" },
        { x: 300, y: 475, team: "B" },
        { x: 700, y: 225, team: "B" },
        { x: 300, y: 225, team: "B" },
        { x: 300, y: 75, team: "B" },
        { x: 820, y: 100, team: "B" },
        { x: 180, y: 450, team: "B" },
        { x: 865, y: 275, team: "B" },

        // Auswechselspieler Team A
        { x: 25, y: 125, team: "A" },
        { x: 25, y: 200, team: "A" },
        { x: 25, y: 275, team: "A" },
        { x: 25, y: 350, team: "A" },
        { x: 25, y: 425, team: "A" },

        // Auswechselspieler Team B
        { x: 975, y: 125, team: "B" },
        { x: 975, y: 200, team: "B" },
        { x: 975, y: 275, team: "B" },
        { x: 975, y: 350, team: "B" },
        { x: 975, y: 425, team: "B" }
    ];

    let moveables: Moveable[] = [];
    let allPlayers: Player[] = [];
    let sparePlayers: Player[] = [];

    window.addEventListener("load", handleLoad);

    function handleLoad(): void {
        // Canvas und rendering context
        let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
        if (!canvas)
            return;
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");

        //HTML-Elemente werden herangeholt 
        landingPage = <HTMLDivElement>document.querySelector("div#settingsContainer");
        startbutton = <HTMLDivElement>document.querySelector("div#startbutton");
        restartbutton = <HTMLSpanElement>document.querySelector("span#restart");
        pausebutton = <HTMLSpanElement>document.querySelector("span#pause"); // zum ausprobieren

        // EventListener werden auf die Button installiert umd von dem Formular zum Spielfeld zu toggeln 
        startbutton.addEventListener("click", startSimulation);
        restartbutton.addEventListener("click", restartSimulation);
        pausebutton.addEventListener("click", pauseSimulation);
        canvas.addEventListener("click", handleCanvasClick); // checken ob shootBall oder player Information
        
        crc2.canvas.addEventListener(SOCCER_EVENT.RIGHTGOAL_HIT, handleRightGoal);
        crc2.canvas.addEventListener(SOCCER_EVENT.LEFTGOAL_HIT, handleLeftGoal);

    }

    export function randomBetween(_min: number, _max: number): number {
        return _min + Math.random() * (_max - _min);
    }


    function startSimulation(): void {

        landingPage.style.display = "none"; // Damit das Formular verschwindet

        // Formularauswertung:
        getUserPreferences();

        // Background und Ball werden erstellt:
        field = new Playingfield(); // Background

        // Alle Menschen:
        createPeopleonField();

        // Ball
        ball = new Ball(new Vector(500, 275));
        moveables.push(ball);

        //start animation
        animation = true;
        animationInterval = window.setInterval(function (): void {
            if (animation == true)
                update();
        },                                     20);

    }

    function restartSimulation(): void {
        //extra function in case we need the initialisation somewhere else
        initialisation();
    }

    function pauseSimulation(): void {
        if (animation == true) {
            animation = false;
        } else {
            animation = true;
        }
    }


    function getUserPreferences(): void {

        // FormData - Objekt um die Werte des Formulars auszuwerten!
        let formData: FormData = new FormData(document.forms[0]);  // weist der Variablen formData alle fieldsets zu
        // console.log(formData);

        minimumSpeed = Number(formData.get("MinimumSpeedSlider")); // Ich hole mir mit dem Namen "MinimumSpeedSlider" den value, in Form einer Nummer
        maximumSpeed = Number(formData.get("MaximumSpeedSlider"));
        minimumPrecision = Number(formData.get("MinimumPrecisionSlider"));
        maximumPrecision = Number(formData.get("MaximumPrecisionSlider"));

        teamAColor = <string>formData.get("TeamAColorPicker"); //wir wissen, dass es ein string ist!
        teamBColor = <string>formData.get("TeamBColorPicker");
    }

    // AllPlayer
    function createPeopleonField(): void {

        // Schiedsrichter und zwei Linienmänner werden kreiert:
        const referee: Referee = new Referee(new Vector(600, 300));
        const linesmanTop: Linesman = new Linesman(new Vector(crc2.canvas.width / 2, 15));
        const linesmanBottom: Linesman = new Linesman(new Vector(crc2.canvas.width / 2, crc2.canvas.height - 15));

        // alle in moveables pushen
        moveables.push(referee, linesmanTop, linesmanBottom);

        // Spieler:
        for (let i: number = 0; i < 32; i++) {

            let position: Vector = new Vector(playerInformation[i].x, playerInformation[i].y); // Position vom playerInformation Array 
            let startPosition: Vector = new Vector(playerInformation[i].x, playerInformation[i].y);
            let team: string = playerInformation[i].team; // from array;
            let speed: number = randomBetween(minimumSpeed, maximumSpeed);
            let precision: number = randomBetween(minimumPrecision, maximumPrecision);
            let jerseyNumber: number = i + 1;
            let color: string = "000000"; //default value just in case

            if (team == "A") {
                color = teamAColor;
            } else if (team == "B") {
                color = teamBColor;
            }

            const player: Player = new Player(position, startPosition, team, color, speed, precision, jerseyNumber); // keine Ahnung wie man sie verteilt
            // bekommen noch Geschwindigkeit und Präzision

            //Feldspieler in moveables, alle Spieler in allPlayers, Ersatzspieler in sparePlayers
            allPlayers.push(player);
            if (jerseyNumber <= 22) {
                moveables.push(player);
            } else if (jerseyNumber > 22) {
                sparePlayers.push(player);
            }

        }

    }

    function handleCanvasClick(_event: MouseEvent): void {
        if (_event.shiftKey) {
            getPlayerInformation(_event);
        } else if (nobodyIsRunning == true) { // nur wenn jemand am Ball ist kann man klicken
            shootBall(_event);
            nobodyIsRunning = false; // damit man währenddessen Spieler rennen nicht klicken kann
        }
    }

    // Ab hier bis Ende shootBall neu:
    function shootBall(_event: MouseEvent): void {

        //to be able to check goals, set hitGoalA & hitGoalsB from ball to true
        ball.hitGoalA = false;
        ball.hitGoalB = false;

        //get the position of the click and move the ball to this position
        
        // Mouseposition:
        let xpos: number = 0;
        let ypos: number = 0;

        // Eine neue random Position wird kalkuliert, innerhalb des Präzisionsradius vom Spieler
        // const randomX: number = randomBetween(minimumPrecision, maximumPrecision);
        // const randomY: number = randomBetween(minimumPrecision, maximumPrecision);

        // Damit man wirklich nur auf dem Fußballfeld klicken kann
        if (_event.offsetX > 75 && _event.offsetX < 925) {
            xpos = _event.offsetX;
        }
        if (_event.offsetY > 0 && _event.offsetY < 550) {
            ypos = _event.offsetY;
        }

        //Wenn position gesetzt wurde (durch Klick), dem Ball einen Vector als Ziel mitgeben:
        if (xpos > 0 && ypos > 0) {
            playerAtBall.active = false; //er reagiert für paar Sekunden nicht
            // playerAtBall.toggleActivation();
            ball.destination = new Vector(xpos, ypos);
            ball.startMoving = true; // durch ist die Präzision von der Entfernung abhängig.
            animation = true;
        }

    }

    function handleLeftGoal(): void {
        goalsB ++;
    }

    function handleRightGoal(): void {
        goalsA ++;
    }

    function update(): void {

        // Draw the Playingfield
        field.draw();

        // Update animation
        for (let moveable of moveables) {
            moveable.move(); // Player bewegen sich
            moveable.draw();
        }
        // Auswechselspieler
        for (let sparePlayer of sparePlayers) {
            sparePlayer.draw();
        }

        // Score:
        let scoreDisplay: HTMLDivElement = <HTMLDivElement>document.querySelector("div#score");
        scoreDisplay.innerHTML = "<b>Score </b>" + goalsA + " : " + goalsB + " | <b>In possesion of the ball: </b> Player " + playerAtBall.jerseyNumber; //add jerseyNumber of player in possesion of the ball 
    }

    // Spielerinformation bekommen
    function getPlayerInformation(_event: MouseEvent): void {

        // Aktuelle Mouseposition
        let clickPosition: Vector = new Vector(_event.offsetX, _event.offsetY);

        // getPlayerClick von der aktuellen Klickposition
        let playerClicked: Player | null = getPlayerClick(clickPosition);

        // wenn unter der Mouseposition ein Spieler ist, werden die Informationen angezeigt
        if (playerClicked) {
            showPlayerInformation(playerClicked);
        }
    }

    // den geklickten Spieler bekommen
    function getPlayerClick (_clickPosition: Vector): Player | null {

        for (let player of allPlayers) {
            if (player.isClicked(_clickPosition)) // first object in allPlayers array
            return player;
        } 

        return null; // Rückgabewert null, wenn kein Spieler unter der Mouseposition ist
    }

    // Player Display
    function showPlayerInformation(_playerClicked: Player): void {
        let playerDisplay: HTMLDivElement = <HTMLDivElement>document.querySelector("div#playerInformation");
        playerDisplay.innerHTML = "<b>Number: </b>" + _playerClicked.jerseyNumber + " | <b>Speed: </b> " + Math.round(_playerClicked.speed) + " | <b>Precision: </b>" + Math.round(_playerClicked.precision); 
    }


    function initialisation(): void {
        // Einstellungsformular wird wieder angezeigt
        landingPage.style.display = "";

        //stop animation and reset values to default
        animation = false;
        minimumSpeed = 1;
        maximumSpeed = 5;
        minimumPrecision = 1;
        maximumPrecision = 5;
        teamAColor = "66b2ff";
        teamBColor = "ff3333";

        //empty arrays of current objects in the simulation
        moveables = [];
        allPlayers = [];
        sparePlayers = [];

        // Animationsintervall beenden
        window.clearInterval(animationInterval);

    }

    // function createDraggableElement(): void {

        
    //     const s: HTMLSpanElement = document.createElement("span");

    //     // enable dragability
    //     s.setAttribute("draggable", "true");

    //     // rect 1 und rect 2 sind dann die zu tauschenden Canvas
    //     let buffer_x = rect1.x, buffer_y = rect1.y;
    //     rect1.reposition(rect2.x,rect2.y);
    //     rect2.reposition(buffer_x,buffer_y);
    //     rect1.draw();
    //     rect2.draw();

    //     // add listener for dragend to swap players
    //     s.addEventListener("dragend", (e: DragEvent) => {
    //         // get player directly under the mouse
    //         const p: Player | undefined = player;
    //             const v: Vector = new Vector(
    //                 canvas.position.x + p.this.position.x,
    //                 canvas.position.y + p.this.position.x
    //             );
    //             return distance(v, new Vector(e.clientX, e.clientY)) - player.getRadius() * 2 <= 0;
    //         });

    //         // if there was a player on dragend swap both
    //         if (p) {
    //             // set current active player to inactive
    //             p.setActive(false);
    //             player.setActive(true);

    //             // swap subsitutes origin with players origin
    //             player.setOrigin(new Vector(p.getOrigin().X, p.getOrigin().Y));

    //             // swap subsitutes position with players position
    //             player.setPosition(new Vector(p.getPosition().X, p.getPosition().Y));

    //             // executes callbacl
    //             cb();
    //         }


    //     });



} // close namespace