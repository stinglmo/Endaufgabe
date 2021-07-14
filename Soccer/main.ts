
namespace Soccer {

    export let crc2: CanvasRenderingContext2D;
    let landingPage: HTMLDivElement;
    let startbutton: HTMLDivElement;
    let restartbutton: HTMLSpanElement;
    let pausebutton: HTMLSpanElement;
    let instructionbutton: HTMLSpanElement;
    let instructionBoard: HTMLSpanElement;

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
    let draggedPlayer: Player | undefined;
    let listenToMouseMove: boolean = false; // Zum Player switchen
    export let animation: boolean = false; // Damit im Player drauf zugreifen kann und um shootBall zu handeln
    let animationInterval: number;
    export let ball: Ball;
    export let playerAtBall: Player | null; // Für Informationsanzeige


    export enum SOCCER_EVENT {
        RIGHTGOAL_HIT = "rightGoalHit", // Zum hochzählen
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

    window.addEventListener("load", handleLoad);

    function handleLoad(): void {

        // Canvas und Rendering-Kontext
        let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
        if (!canvas)
            return;
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");

        // HTML-Elemente werden herangeholt 
        landingPage = <HTMLDivElement>document.querySelector("div#settingsContainer");
        startbutton = <HTMLDivElement>document.querySelector("div#startbutton");
        restartbutton = <HTMLSpanElement>document.querySelector("span#restart");
        pausebutton = <HTMLSpanElement>document.querySelector("span#pause"); // Zum ausprobieren
        instructionbutton = <HTMLSpanElement>document.querySelector("span#instruction");
        instructionBoard = <HTMLSpanElement>document.querySelector("#instructionBoard");

        // EventListener werden auf die Button installiert um von dem Formular zum Spielfeld zu toggeln 
        startbutton.addEventListener("click", startSimulation);
        restartbutton.addEventListener("click", restartSimulation);
        pausebutton.addEventListener("click", pauseSimulation);
        instructionbutton.addEventListener("click", showInstruction); // Spielanleitung

        canvas.addEventListener("mousedown", handleCanvasClick); // Checken ob shootBall, getPlayer oder showplayerInformation passieren soll
        canvas.addEventListener("mousemove", dragPlayer);
        canvas.addEventListener("mouseup", switchPlayer);

        crc2.canvas.addEventListener(SOCCER_EVENT.RIGHTGOAL_HIT, handleRightGoal);
        crc2.canvas.addEventListener(SOCCER_EVENT.LEFTGOAL_HIT, handleLeftGoal);

    }

    // Random - Funktion für die random Werte der Geschwinfigkeit und Präzision
    export function randomBetween(_min: number, _max: number): number {
        return _min + Math.random() * (_max - _min);
    }

    // Toggle Spielanleitung
    function showInstruction(): void {

        if (instructionBoard.classList.contains("is-hidden")) {
            instructionBoard.classList.remove("is-hidden");
            instructionBoard.classList.add("visible");
        } else if (instructionBoard.classList.contains("visible")) {
            instructionBoard.classList.remove("visible");
            instructionBoard.classList.add("is-hidden");
        }

    }


    function startSimulation(): void {

        landingPage.style.display = "none"; // Damit das Formular verschwindet

        // Formularauswertung:
        getUserPreferences();

        // Background und Ball werden erstellt:
        field = new Playingfield();

        // Alle Menschen:
        createPeopleonField();

        // Ball
        ball = new Ball(new Vector(500, 275));
        moveables.push(ball);

        // Start animation
        animation = true;

        window.setInterval(drawUpdate, 20); // Die ganze Zeit wird gemalt (wichtig für den Playerswitch)

        animationInterval = window.setInterval(function (): void {
            if (animation == true) // Nur wenn animation == true bewegt sich alles
                animationUpdate();
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
        let formData: FormData = new FormData(document.forms[0]);  // Weist der Variablen formData alle fieldsets zu!

        minimumSpeed = Number(formData.get("MinimumSpeedSlider")); // Ich hole mir mit dem Namen "MinimumSpeedSlider" den value, in Form einer Nummer
        maximumSpeed = Number(formData.get("MaximumSpeedSlider"));
        minimumPrecision = Number(formData.get("MinimumPrecisionSlider"));
        maximumPrecision = Number(formData.get("MaximumPrecisionSlider"));

        teamAColor = <string>formData.get("TeamAColorPicker"); // Wir wissen, dass es ein string ist!
        teamBColor = <string>formData.get("TeamBColorPicker");
    }

    // AllPlayer
    function createPeopleonField(): void {

        // Schiedsrichter und zwei Linienmänner werden kreiert:
        const referee: Referee = new Referee(new Vector(600, 300));
        const linesmanTop: Linesman = new Linesman(new Vector(crc2.canvas.width / 2, 15));
        const linesmanBottom: Linesman = new Linesman(new Vector(crc2.canvas.width / 2, crc2.canvas.height - 15));

        // Alle in moveables pushen
        moveables.push(referee, linesmanTop, linesmanBottom);

        // Erstellen der Spieler:
        for (let i: number = 0; i < 32; i++) {

            let position: Vector = new Vector(playerInformation[i].x, playerInformation[i].y); // Position vom Interface - Array 
            let startPosition: Vector = new Vector(playerInformation[i].x, playerInformation[i].y);
            let team: string = playerInformation[i].team; // von dem Interface - Array 
            let speed: number = randomBetween(minimumSpeed, maximumSpeed);
            let precision: number = randomBetween(minimumPrecision, maximumPrecision);
            let jerseyNumber: number = i + 1;
            let color: string = "000000"; // Nur für den Fall default value

            if (team == "A") {
                color = teamAColor;
            } else if (team == "B") {
                color = teamBColor;
            }

            const player: Player = new Player(position, startPosition, team, color, speed, precision, jerseyNumber);

            //Feldspieler in moveables, alle Spieler in allPlayers
            allPlayers.push(player);
            moveables.push(player);
            
        }

    }

    // Um zu checken ob der Spieler getauscht werden soll, seine Infos angezeigt werden sollen oder der Ball geschossen werden soll:
    function handleCanvasClick(_event: MouseEvent): void {
        if (_event.shiftKey || _event.altKey) {
            getPlayer(_event); // wird in getPlayer dann unterschieden ob shift oder altkey gedrückt wurde
        } else if (animation == false) { // nur wenn jemand am Ball ist kann man klicken
            shootBall(_event);
        }
    }

    // Ball bewegen
    function shootBall(_event: MouseEvent): void {

        // Um das Ziel zu checken, bei einem Tor wird hitGoalA bzw. hitGoalsB auf true gesetzt.
        ball.hitGoalA = false;
        ball.hitGoalB = false;

        // Mouseposition:
        let xpos: number = 0;
        let ypos: number = 0;

        // Damit man wirklich nur auf dem Fußballfeld klicken kann
        if (_event.offsetX > 75 && _event.offsetX < 925) {
            xpos = _event.offsetX; // X-Koordinate der Maus
        }
        if (_event.offsetY > 0 && _event.offsetY < 550) {
            ypos = _event.offsetY; // Y-Koordinate der Maus
        }

        //Wenn position gesetzt wurde (durch Klick), dem Ball einen Vector als Ziel mitgeben:
        if (xpos > 0 && ypos > 0) {

            ball.destination = new Vector(xpos, ypos);
            ball.startMoving = true; // durch ist die Präzision von der Entfernung abhängig.
            animation = true; // auch damit man währenddessen Spieler rennen nicht klicken kann

        }
    }

    function handleLeftGoal(): void {
        goalsB++;
    }

    function handleRightGoal(): void {
        goalsA++;
    }


    // Spielerinformation bekommen
    function getPlayer(_event: MouseEvent): void {

        // Aktuelle Mouseposition
        let clickPosition: Vector = new Vector(_event.offsetX, _event.offsetY);

        // getPlayerClick von der aktuellen Klickposition
        let playerClicked: Player | null = getPlayerClick(clickPosition);

        // wenn unter der Mouseposition ein Spieler ist, werden die Informationen angezeigt
        if (playerClicked) {
            if (_event.shiftKey) {
                showPlayerInformation(playerClicked);
            } else if (_event.altKey) {
                listenToMouseMove = true; //soll erst hören wenn altkey gedrückt wird
                draggedPlayer = playerClicked; // Zuweisung
            }

        }
    }

    function dragPlayer(_event: MouseEvent): void {
        // Bekomme Mausposition die ganze Zeit
        if (_event.altKey && listenToMouseMove == true) {
            let mousePosition: Vector = new Vector(_event.offsetX, _event.offsetY);
            
            // Die Position vom gedraggten Spieler wird an die Mausposition geheftet
            if (draggedPlayer) {
                draggedPlayer.position = mousePosition; // Damit Spieler an der Maus bleibt
            }
        }

    }

    // Es wird gecheckt ob der gedraggte Player mit einem anderen Spieler überlappt...
    // Wenn ja, dann sollen sie ihre Plätze tauschen.
    function switchPlayer(_event: MouseEvent): void {

        // Aktuelle Mouseposition
        let mousePosition: Vector = new Vector(_event.offsetX, _event.offsetY);
        
        // getPlayerClick von der aktuellen Mausposition
        let playerAtMousePosition: Player | null = getPlayerClick(mousePosition);
        if (playerAtMousePosition) {

            if (draggedPlayer) {
                // save Startposition von dem Spieler der ausgetauscht werden soll
                let draggedPlayerStartposition: Vector = draggedPlayer.startPosition;
                let playerStartposition: Vector = playerAtMousePosition.startPosition;
                
                // Ihre Startpositionen vertauschen
                draggedPlayer.startPosition = playerStartposition;
                playerAtMousePosition.startPosition = draggedPlayerStartposition;
                playerAtMousePosition.position = draggedPlayerStartposition;

                // Die Zuweisung von draggedPlayer entfernen
                draggedPlayer = undefined;
            }
        }
    }

    // Den geklickten Spieler bekommen
    function getPlayerClick(_clickPosition: Vector): Player | null {

        for (let player of allPlayers) {
            if (player.isClicked(_clickPosition) && player != draggedPlayer) // Wenn die Person unter der Maus nicht der gedraggte Spieler ist
                return player;
        }

        return null; // Rückgabewert null, wenn kein Spieler unter der Mausposition ist
    }

    // Player Display
    function showPlayerInformation(_playerClicked: Player): void {
        let playerDisplay: HTMLDivElement = <HTMLDivElement>document.querySelector("div#playerInformation");
        playerDisplay.innerHTML = "<b>Number: </b>" + _playerClicked.jerseyNumber + " | <b>Speed: </b> " + Math.round(_playerClicked.speed) + " | <b>Precision: </b>" + Math.round(_playerClicked.precision);
    }

    function animationUpdate(): void {

        // Update animation
        for (let moveable of moveables) {
            moveable.move(); // Player bewegen sich

        }

        // Score:
        let scoreDisplay: HTMLDivElement = <HTMLDivElement>document.querySelector("div#score");

        if (playerAtBall) {
            scoreDisplay.innerHTML = "<b>Score </b>" + goalsA + " : " + goalsB + " | <b>In possesion of the ball: </b> Player " + playerAtBall.jerseyNumber; //add jerseyNumber of player in possesion of the ball 
        } else {
            scoreDisplay.innerHTML = "<b>Score </b>" + goalsA + " : " + goalsB + " | <b>In possesion of the ball: </b>Player No ?";
        }

    }


    // Seperat damit immer gezeichnet wird, aber nicht immer bewegt wird (weil wenn die Animation stoppt, könnte man sonst nicht draggen)
    function drawUpdate(): void {

        // Draw the Playingfield
        field.draw();

        for (let moveable of moveables) {
            moveable.draw(); // Player (auch Auswechselspieler) werden gemalt

        }

        // Status der Player wird gecheckt (damit die Auswechselspieler nicht mitspielen)
        for (let player of allPlayers) {
            player.checkState();
        }


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

        // Animationsintervall beenden
        window.clearInterval(animationInterval);

    }




} // close namespace