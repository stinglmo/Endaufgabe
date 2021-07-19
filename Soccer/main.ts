/*
Aufgabe: Endaufgabe Soccer Simulation
Name: Mona Stingl
Matrikel: 267315
Datum: 19.07.21
Quellen: Lektionen aus dem Unterricht (insbesondere Asteroids), MDN und W3School
Diese Abgabe ist in Zusammmenarbeit mit Hannah Dürr entstanden
*/

namespace Soccer {

    export let crc2: CanvasRenderingContext2D;
    export let ball: Ball;
    export let playerAtBall: Player | null; // For possesion and playerinformation
    export let animation: boolean = false; // Handle shootball 

    let landingPage: HTMLDivElement;
    let startbutton: HTMLDivElement;
    let instructionbutton: HTMLSpanElement;
    let instructionBoard: HTMLSpanElement;
    let playerDisplay: HTMLDivElement; 
    let scoreDisplay: HTMLDivElement;

    let goalsA: number = 0;
    let goalsB: number = 0;
    
     // Following 6 will get values of formular
    let minimumSpeed: number = 1;
    let maximumSpeed: number = 5;
    let minimumPrecision: number = 1;
    let maximumPrecision: number = 5;
    let teamAColor: string = "66b2ff";
    let teamBColor: string = "ff3333";

    let field: Playingfield;
    let draggedPlayer: Player | undefined;
    let listenToMouseMove: boolean = false; // For switching the player

    // Sounds 
    export let sound: HTMLAudioElement[] = [];
    sound[0] = new Audio("kickoff.mp3");
    sound[1] = new Audio("cheering.mp3");
    sound[2] = new Audio("goal.mp3");
    sound[3] = new Audio("kick.mp3");
    sound[4] = new Audio("backgroundmusic.mp3");

    // For counting the goals
    export enum SOCCER_EVENT {
        RIGHTGOAL_HIT = "rightGoalHit", 
        LEFTGOAL_HIT = "leftGoalHit"
    }

    export interface PlayerInformation {
        x: number;
        y: number;
        team: string;
    }

    // information for every player to be accessed when player are created
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

        // Spareplayer Team A
        { x: 25, y: 125, team: "A" },
        { x: 25, y: 200, team: "A" },
        { x: 25, y: 275, team: "A" },
        { x: 25, y: 350, team: "A" },
        { x: 25, y: 425, team: "A" },

        // Spareplayer Team B
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

        // Get the canvas and rendering context
        let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
        if (!canvas)
            return;
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");

        // Find html elements and install listeners on buttons
        landingPage = <HTMLDivElement>document.querySelector("div#settingsContainer");
        startbutton = <HTMLDivElement>document.querySelector("div#startbutton");
        instructionbutton = <HTMLSpanElement>document.querySelector("span#instruction");
        instructionBoard = <HTMLSpanElement>document.querySelector("#instructionBoard");
        playerDisplay = <HTMLDivElement>document.querySelector("div#playerInformation");
        scoreDisplay = <HTMLDivElement>document.querySelector("div#score");

        startbutton.addEventListener("click", startSimulation);
        instructionbutton.addEventListener("click", showInstruction); // Spielanleitung

        // Install event-listeners on canvas to be able to shoot the ball, switch players or see their details
        canvas.addEventListener("mousedown", handleCanvasClick); 
        canvas.addEventListener("mousemove", dragPlayer);
        canvas.addEventListener("mouseup", switchPlayer);

        // Install event listeners for the custom events to handle the goals
        crc2.canvas.addEventListener(SOCCER_EVENT.RIGHTGOAL_HIT, handleRightGoal);
        crc2.canvas.addEventListener(SOCCER_EVENT.LEFTGOAL_HIT, handleLeftGoal);
    }

    // Create a random number in a given range Random (for speed and precision) 
    export function randomBetween(_min: number, _max: number): number {
        return _min + Math.random() * (_max - _min);
    }

    // for playing the sounds
    export function playSample(_sound: number): void {
        sound[_sound].play();
    }

    function startSimulation(): void {

        // Hide settings container
        landingPage.style.display = "none";

        // Backgroundmusic and Kickoff - Sound
        playSample(0);
        playSample(4);

        // Save data from the user settings for the simulation
        getUserPreferences();

        // Create the background
        field = new Playingfield();

        // Create all people
        createPeopleonField();

        // Create ball
        ball = new Ball(new Vector(500, 275));
        moveables.push(ball);

        // Start animation
        animation = true;

        // Update draw methods all the time (important for switching the player)
        window.setInterval(drawUpdate, 20); 

        // Move animated objects only when animation is true/on
        window.setInterval(function (): void {
            if (animation == true) 
                animationUpdate();
        },                 20);
    }

    // Show and hide simulation instructions
    function showInstruction(): void {

        if (instructionBoard.classList.contains("is-hidden")) {
            instructionBoard.classList.remove("is-hidden");
            instructionBoard.classList.add("visible");
        } else if (instructionBoard.classList.contains("visible")) {
            instructionBoard.classList.remove("visible");
            instructionBoard.classList.add("is-hidden");
        }
    }

    // Save all the preferences from the settings page for the simulation
    function getUserPreferences(): void {

        let formData: FormData = new FormData(document.forms[0]); 

        minimumSpeed = Number(formData.get("MinimumSpeedSlider")); 
        maximumSpeed = Number(formData.get("MaximumSpeedSlider"));
        minimumPrecision = Number(formData.get("MinimumPrecisionSlider"));
        maximumPrecision = Number(formData.get("MaximumPrecisionSlider"));

        teamAColor = <string>formData.get("TeamAColorPicker"); 
        teamBColor = <string>formData.get("TeamBColorPicker");
    }

    // All player
    function createPeopleonField(): void {

        // Create the referee and two linesmen 
        const referee: Referee = new Referee(new Vector(600, 300));
        const linesmanTop: Linesman = new Linesman(new Vector(crc2.canvas.width / 2, 15));
        const linesmanBottom: Linesman = new Linesman(new Vector(crc2.canvas.width / 2, crc2.canvas.height - 15));

        // Push them in moveables
        moveables.push(referee, linesmanTop, linesmanBottom);

        // Create the player
        for (let i: number = 0; i < 32; i++) {

             // Information for the player from array
            let position: Vector = new Vector(playerInformation[i].x, playerInformation[i].y); 
            let startPosition: Vector = new Vector(playerInformation[i].x, playerInformation[i].y);
            let team: string = playerInformation[i].team; 
            let speed: number = randomBetween(minimumSpeed, maximumSpeed);
            let precision: number = randomBetween(minimumPrecision, maximumPrecision);
            let jerseyNumber: number = i + 1;
            let color: string = "000000";  // Default value just in case something goes wrong

            if (team == "A") {
                color = teamAColor;
            } else if (team == "B") {
                color = teamBColor;
            }

            const player: Player = new Player(position, startPosition, team, color, speed, precision, jerseyNumber);

            // Push players to allPlayers and moveables 
            allPlayers.push(player);
            moveables.push(player);
        }
    }

    // Check what should happen when the user clicks
    function handleCanvasClick(_event: MouseEvent): void {
        if (_event.shiftKey || _event.altKey) {
            getPlayer(_event); 
        } else if (animation == false) { 
            shootBall(_event);
        }
    }

    // Shoot ball 
    function shootBall(_event: MouseEvent): void {

        // To be able to check goals, set hitGoalA & hitGoalsB from ball to true
        ball.hitGoalA = false;
        ball.hitGoalB = false;

        // Mouseposition:
        let xpos: number = 0;
        let ypos: number = 0;

        if (_event.offsetX > 75 && _event.offsetX < 925) {
            xpos = _event.offsetX;
        }
        if (_event.offsetY > 0 && _event.offsetY < 550) {
            ypos = _event.offsetY; 
        }

        // When there was a mouseposition given, set it as the balls destination
        // --> Ball moves toward this position
        if (xpos > 0 && ypos > 0) {

            // Kick - Sound
            playSample(3); 

            ball.destination = new Vector(xpos, ypos);
            ball.startMoving = true; 
            animation = true; 
        }
    }

    function handleLeftGoal(): void {

        goalsB++;

        // Cheering - Sound
        playSample(2);  
        
        // Player go to their startposition 
        for (let player of allPlayers) {
            if (player) {
                player.position = player.startPosition;
            }
        }
    }

    function handleRightGoal(): void {

        goalsA++;

        // Kick - Sound
        playSample(2);

        // Player go to their startposition 
        for (let player of allPlayers) {
            if (player) {
                player.position = player.startPosition;
            }
        }
    }

    // Get playerinformation
    function getPlayer(_event: MouseEvent): void {

        // Current mouseposition
        let clickPosition: Vector = new Vector(_event.offsetX, _event.offsetY);

        // Get the player who was clicked
        let playerClicked: Player | null = getPlayerAtMousePosition(clickPosition);

        // If there is a player, show his information or be able to drag him
        if (playerClicked) {
            if (_event.shiftKey) {
                showPlayerInformation(playerClicked);
            } else if (_event.altKey) {
                listenToMouseMove = true; 
                draggedPlayer = playerClicked; 
            }
        }
    }

    function dragPlayer(_event: MouseEvent): void {

        // Get mouse position all the time while mouse is moving
        if (_event.altKey && listenToMouseMove == true) {
            let mousePosition: Vector = new Vector(_event.offsetX, _event.offsetY);
            
            // Set position of draggedPlayer to mouseposition
            if (draggedPlayer) {
                draggedPlayer.position = mousePosition; 
            }
        }
    }

    // Check if draggedPlayer is overlapping with a player on the field
    // If yes --> Exchange their positions
    function switchPlayer(_event: MouseEvent): void {

        // Current mouseposition
        let mousePosition: Vector = new Vector(_event.offsetX, _event.offsetY);
        
        // Get the player who is at the current mouseposition
        let playerAtMousePosition: Player | null = getPlayerAtMousePosition(mousePosition);
        
        if (playerAtMousePosition && draggedPlayer) {

            // Switch only if player are from the same team
            if (draggedPlayer.team == playerAtMousePosition.team) {

                // Save startpositions of player to be exchanged
                let draggedPlayerStartposition: Vector = draggedPlayer.startPosition;
                let playerStartposition: Vector = playerAtMousePosition.startPosition;
                
                // Exchange their start positions
                draggedPlayer.startPosition = playerStartposition;
                playerAtMousePosition.startPosition = draggedPlayerStartposition;

                // Set the position of the field player to its new startposition so that he appears outside the field
                playerAtMousePosition.position = draggedPlayerStartposition;

                // Remove dragged player, otherwise it will stick to the cursor
                draggedPlayer = undefined;
            
            } else { 

                // If the conditions for the switch are not given, set dragged player back to its startposition
                draggedPlayer.position = draggedPlayer.startPosition;
                draggedPlayer = undefined;
            }
        }
    }

    // Get the player who was clicked
    function getPlayerAtMousePosition(_clickPosition: Vector): Player | null {

        // Iterate over player array and check for each player if it is at the same position as the mouse
        for (let player of allPlayers) {

            // For use in switchPlayer, ignore the draggedPlayer in this check
            if (player.isClicked(_clickPosition) && player != draggedPlayer) 
                return player;
        }
        return null; // Returns null when there's no player at the current mouseposition
    }

    // Display for the playerinformation
    function showPlayerInformation(_playerClicked: Player): void {
        
        playerDisplay.innerHTML = "<b>Number: </b>" + _playerClicked.jerseyNumber + " | <b>Speed: </b> " + Math.round(_playerClicked.speed) + " | <b>Precision: </b>" + Math.round(_playerClicked.precision);
    }

    function animationUpdate(): void {

        // Update animation
        for (let moveable of moveables) {
            moveable.move(); // Player bewegen sich
        }

        // Score display:
        if (playerAtBall) {
            scoreDisplay.innerHTML = "<b>Score </b>" + goalsA + " : " + goalsB + " | <b>In possesion of the ball: </b> Player " + playerAtBall.jerseyNumber; //add jerseyNumber of player in possesion of the ball 
        } else {
            scoreDisplay.innerHTML = "<b>Score </b>" + goalsA + " : " + goalsB + " | <b>In possesion of the ball: </b>Player No ?";
        }
    }

    // Draw update 
    // --> Draw the playingfield and all moveables and players
    function drawUpdate(): void {

        field.draw();

        for (let moveable of moveables) {

            moveable.draw(); 
        }

        // Check the playerstatus (player/spareplayer) 
        for (let player of allPlayers) {

            player.checkState();
        }
    }
} // close namespace