"use strict";
/*
Aufgabe: Endaufgabe Soccer Simulation
Name: Mona Stingl
Matrikel: 267315
Datum: 19.07.21
Quellen: Lektionen aus dem Unterricht (insbesondere Asteroids), MDN und W3School
Diese Abgabe ist in Zusammmenarbeit mit Hannah Dürr entstanden
*/
var Soccer;
(function (Soccer) {
    Soccer.animation = false; // Handle shootball 
    let landingPage;
    let startbutton;
    let instructionbutton;
    let instructionBoard;
    let playerDisplay;
    let scoreDisplay;
    let goalsA = 0;
    let goalsB = 0;
    // Following 6 will get values of formular
    let minimumSpeed = 1;
    let maximumSpeed = 5;
    let minimumPrecision = 1;
    let maximumPrecision = 5;
    let teamAColor = "66b2ff";
    let teamBColor = "ff3333";
    let field;
    let draggedPlayer;
    let listenToMouseMove = false; // For switching the player
    // Sounds 
    Soccer.sound = [];
    Soccer.sound[0] = new Audio("kickoff.mp3");
    Soccer.sound[1] = new Audio("cheering.mp3");
    Soccer.sound[2] = new Audio("goal.mp3");
    Soccer.sound[3] = new Audio("kick.mp3");
    Soccer.sound[4] = new Audio("backgroundmusic.mp3");
    // For counting the goals
    let SOCCER_EVENT;
    (function (SOCCER_EVENT) {
        SOCCER_EVENT["RIGHTGOAL_HIT"] = "rightGoalHit";
        SOCCER_EVENT["LEFTGOAL_HIT"] = "leftGoalHit";
    })(SOCCER_EVENT = Soccer.SOCCER_EVENT || (Soccer.SOCCER_EVENT = {}));
    // information for every player to be accessed when player are created
    Soccer.playerInformation = [
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
    let moveables = [];
    let allPlayers = [];
    window.addEventListener("load", handleLoad);
    function handleLoad() {
        // Get the canvas and rendering context
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        Soccer.crc2 = canvas.getContext("2d");
        // Find html elements and install listeners on buttons
        landingPage = document.querySelector("div#settingsContainer");
        startbutton = document.querySelector("div#startbutton");
        instructionbutton = document.querySelector("span#instruction");
        instructionBoard = document.querySelector("#instructionBoard");
        playerDisplay = document.querySelector("div#playerInformation");
        scoreDisplay = document.querySelector("div#score");
        startbutton.addEventListener("click", startSimulation);
        instructionbutton.addEventListener("click", showInstruction); // Spielanleitung
        // Install event-listeners on canvas to be able to shoot the ball, switch players or see their details
        canvas.addEventListener("mousedown", handleCanvasClick);
        canvas.addEventListener("mousemove", dragPlayer);
        canvas.addEventListener("mouseup", switchPlayer);
        // Install event listeners for the custom events to handle the goals
        Soccer.crc2.canvas.addEventListener(SOCCER_EVENT.RIGHTGOAL_HIT, handleRightGoal);
        Soccer.crc2.canvas.addEventListener(SOCCER_EVENT.LEFTGOAL_HIT, handleLeftGoal);
    }
    // Create a random number in a given range Random (for speed and precision) 
    function randomBetween(_min, _max) {
        return _min + Math.random() * (_max - _min);
    }
    Soccer.randomBetween = randomBetween;
    // for playing the sounds
    function playSample(_sound) {
        Soccer.sound[_sound].play();
    }
    Soccer.playSample = playSample;
    function startSimulation() {
        // Hide settings container
        landingPage.style.display = "none";
        // Backgroundmusic and Kickoff - Sound
        playSample(0);
        playSample(4);
        // Save data from the user settings for the simulation
        getUserPreferences();
        // Create the background
        field = new Soccer.Playingfield();
        // Create all people
        createPeopleonField();
        // Create ball
        Soccer.ball = new Soccer.Ball(new Soccer.Vector(500, 275));
        moveables.push(Soccer.ball);
        // Start animation
        Soccer.animation = true;
        // Update draw methods all the time (important for switching the player)
        window.setInterval(drawUpdate, 20);
        // Move animated objects only when animation is true/on
        window.setInterval(function () {
            if (Soccer.animation == true)
                animationUpdate();
        }, 20);
    }
    // Show and hide simulation instructions
    function showInstruction() {
        if (instructionBoard.classList.contains("is-hidden")) {
            instructionBoard.classList.remove("is-hidden");
            instructionBoard.classList.add("visible");
        }
        else if (instructionBoard.classList.contains("visible")) {
            instructionBoard.classList.remove("visible");
            instructionBoard.classList.add("is-hidden");
        }
    }
    // Save all the preferences from the settings page for the simulation
    function getUserPreferences() {
        let formData = new FormData(document.forms[0]);
        minimumSpeed = Number(formData.get("MinimumSpeedSlider"));
        maximumSpeed = Number(formData.get("MaximumSpeedSlider"));
        minimumPrecision = Number(formData.get("MinimumPrecisionSlider"));
        maximumPrecision = Number(formData.get("MaximumPrecisionSlider"));
        teamAColor = formData.get("TeamAColorPicker");
        teamBColor = formData.get("TeamBColorPicker");
    }
    // All player
    function createPeopleonField() {
        // Create the referee and two linesmen 
        const referee = new Soccer.Referee(new Soccer.Vector(600, 300));
        const linesmanTop = new Soccer.Linesman(new Soccer.Vector(Soccer.crc2.canvas.width / 2, 15));
        const linesmanBottom = new Soccer.Linesman(new Soccer.Vector(Soccer.crc2.canvas.width / 2, Soccer.crc2.canvas.height - 15));
        // Push them in moveables
        moveables.push(referee, linesmanTop, linesmanBottom);
        // Create the player
        for (let i = 0; i < 32; i++) {
            // Information for the player from array
            let position = new Soccer.Vector(Soccer.playerInformation[i].x, Soccer.playerInformation[i].y);
            let startPosition = new Soccer.Vector(Soccer.playerInformation[i].x, Soccer.playerInformation[i].y);
            let team = Soccer.playerInformation[i].team;
            let speed = randomBetween(minimumSpeed, maximumSpeed);
            let precision = randomBetween(minimumPrecision, maximumPrecision);
            let jerseyNumber = i + 1;
            let color = "000000"; // Default value just in case something goes wrong
            if (team == "A") {
                color = teamAColor;
            }
            else if (team == "B") {
                color = teamBColor;
            }
            const player = new Soccer.Player(position, startPosition, team, color, speed, precision, jerseyNumber);
            // Push players to allPlayers and moveables 
            allPlayers.push(player);
            moveables.push(player);
        }
    }
    // Check what should happen when the user clicks
    function handleCanvasClick(_event) {
        if (_event.shiftKey || _event.altKey) {
            getPlayer(_event);
        }
        else if (Soccer.animation == false) {
            shootBall(_event);
        }
    }
    // Shoot ball 
    function shootBall(_event) {
        // To be able to check goals, set hitGoalA & hitGoalsB from ball to true
        Soccer.ball.hitGoalA = false;
        Soccer.ball.hitGoalB = false;
        // Mouseposition:
        let xpos = 0;
        let ypos = 0;
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
            Soccer.ball.destination = new Soccer.Vector(xpos, ypos);
            Soccer.ball.startMoving = true;
            Soccer.animation = true;
        }
    }
    function handleLeftGoal() {
        goalsA++;
        // Cheering - Sound
        playSample(2);
    }
    function handleRightGoal() {
        goalsB++;
        // Kick - Sound
        playSample(2);
    }
    // Get playerinformation
    function getPlayer(_event) {
        // Current mouseposition
        let clickPosition = new Soccer.Vector(_event.offsetX, _event.offsetY);
        // Get the player who was clicked
        let playerClicked = getPlayerAtMousePosition(clickPosition);
        // If there is a player, show his information or be able to drag him
        if (playerClicked) {
            if (_event.shiftKey) {
                showPlayerInformation(playerClicked);
            }
            else if (_event.altKey) {
                listenToMouseMove = true;
                draggedPlayer = playerClicked;
            }
        }
    }
    function dragPlayer(_event) {
        // Get mouse position all the time while mouse is moving
        if (_event.altKey && listenToMouseMove == true) {
            let mousePosition = new Soccer.Vector(_event.offsetX, _event.offsetY);
            // Set position of draggedPlayer to mouseposition
            if (draggedPlayer) {
                draggedPlayer.position = mousePosition;
            }
        }
    }
    // Check if draggedPlayer is overlapping with a player on the field
    // If yes --> Exchange their positions
    function switchPlayer(_event) {
        // Current mouseposition
        let mousePosition = new Soccer.Vector(_event.offsetX, _event.offsetY);
        // Get the player who is at the current mouseposition
        let playerAtMousePosition = getPlayerAtMousePosition(mousePosition);
        if (playerAtMousePosition && draggedPlayer) {
            // Switch only if player are from the same team
            if (draggedPlayer.team == playerAtMousePosition.team) {
                // Save startpositions of player to be exchanged
                let draggedPlayerStartposition = draggedPlayer.startPosition;
                let playerStartposition = playerAtMousePosition.startPosition;
                // Exchange their start positions
                draggedPlayer.startPosition = playerStartposition;
                playerAtMousePosition.startPosition = draggedPlayerStartposition;
                // Set the position of the field player to its new startposition so that he appears outside the field
                playerAtMousePosition.position = draggedPlayerStartposition;
                // Remove dragged player, otherwise it will stick to the cursor
                draggedPlayer = undefined;
            }
            else {
                // If the conditions for the switch are not given, set dragged player back to its startposition
                draggedPlayer.position = draggedPlayer.startPosition;
                draggedPlayer = undefined;
            }
        }
    }
    // Get the player who was clicked
    function getPlayerAtMousePosition(_clickPosition) {
        // Iterate over player array and check for each player if it is at the same position as the mouse
        for (let player of allPlayers) {
            // For use in switchPlayer, ignore the draggedPlayer in this check
            if (player.isClicked(_clickPosition) && player != draggedPlayer)
                return player;
        }
        return null; // Returns null when there's no player at the current mouseposition
    }
    // Display for the playerinformation
    function showPlayerInformation(_playerClicked) {
        playerDisplay.innerHTML = "<b>Number: </b>" + _playerClicked.jerseyNumber + " | <b>Speed: </b> " + Math.round(_playerClicked.speed) + " | <b>Precision: </b>" + Math.round(_playerClicked.precision);
    }
    function animationUpdate() {
        // Update animation
        for (let moveable of moveables) {
            moveable.move(); // Player bewegen sich
        }
        // Score display:
        if (Soccer.playerAtBall) {
            scoreDisplay.innerHTML = "<b>Score </b>" + goalsA + " : " + goalsB + " | <b>In possesion of the ball: </b> Player " + Soccer.playerAtBall.jerseyNumber; //add jerseyNumber of player in possesion of the ball 
        }
        else {
            scoreDisplay.innerHTML = "<b>Score </b>" + goalsA + " : " + goalsB + " | <b>In possesion of the ball: </b>Player No ?";
        }
    }
    // Draw update 
    // --> Draw the playingfield and all moveables and players
    function drawUpdate() {
        field.draw();
        for (let moveable of moveables) {
            moveable.draw();
        }
        // Check the playerstatus (player/spareplayer) 
        for (let player of allPlayers) {
            player.checkState();
        }
    }
})(Soccer || (Soccer = {})); // close namespace
//# sourceMappingURL=main.js.map