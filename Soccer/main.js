"use strict";
var Soccer;
(function (Soccer) {
    let landingPage;
    let startbutton;
    let restartbutton;
    let pausebutton;
    let instructionbutton;
    let instructionBoard;
    // Folgenden 6 bekommen Formularwerte
    let minimumSpeed = 1;
    let maximumSpeed = 5;
    let minimumPrecision = 1;
    let maximumPrecision = 5;
    let teamAColor = "66b2ff";
    let teamBColor = "ff3333";
    let goalsA = 0;
    let goalsB = 0;
    let field;
    let draggedPlayer;
    let listenToMouseMove = false; // Zum Player switchen
    Soccer.animation = false; // Damit im Player drauf zugreifen kann und um shootBall zu handeln
    let animationInterval;
    let SOCCER_EVENT;
    (function (SOCCER_EVENT) {
        SOCCER_EVENT["RIGHTGOAL_HIT"] = "rightGoalHit";
        SOCCER_EVENT["LEFTGOAL_HIT"] = "leftGoalHit";
    })(SOCCER_EVENT = Soccer.SOCCER_EVENT || (Soccer.SOCCER_EVENT = {}));
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
    let moveables = [];
    let allPlayers = [];
    let sparePlayers = [];
    window.addEventListener("load", handleLoad);
    function handleLoad() {
        // Canvas und Rendering-Kontext
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        Soccer.crc2 = canvas.getContext("2d");
        // HTML-Elemente werden herangeholt 
        landingPage = document.querySelector("div#settingsContainer");
        startbutton = document.querySelector("div#startbutton");
        restartbutton = document.querySelector("span#restart");
        pausebutton = document.querySelector("span#pause"); // Zum ausprobieren
        instructionbutton = document.querySelector("span#instruction");
        instructionBoard = document.querySelector("#instructionBoard");
        // EventListener werden auf die Button installiert um von dem Formular zum Spielfeld zu toggeln 
        startbutton.addEventListener("click", startSimulation);
        restartbutton.addEventListener("click", restartSimulation);
        pausebutton.addEventListener("click", pauseSimulation);
        instructionbutton.addEventListener("click", showInstruction); // Spielanleitung
        canvas.addEventListener("mousedown", handleCanvasClick); // Checken ob shootBall, getPlayer oder showplayerInformation passieren soll
        canvas.addEventListener("mousemove", dragPlayer);
        canvas.addEventListener("mouseup", switchPlayer);
        Soccer.crc2.canvas.addEventListener(SOCCER_EVENT.RIGHTGOAL_HIT, handleRightGoal);
        Soccer.crc2.canvas.addEventListener(SOCCER_EVENT.LEFTGOAL_HIT, handleLeftGoal);
    }
    // Random - Funktion für die random Werte der Geschwinfigkeit und Präzision
    function randomBetween(_min, _max) {
        return _min + Math.random() * (_max - _min);
    }
    Soccer.randomBetween = randomBetween;
    // Toggle Spielanleitung
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
    function startSimulation() {
        landingPage.style.display = "none"; // Damit das Formular verschwindet
        // Formularauswertung:
        getUserPreferences();
        // Background und Ball werden erstellt:
        field = new Soccer.Playingfield();
        // Alle Menschen:
        createPeopleonField();
        // Ball
        Soccer.ball = new Soccer.Ball(new Soccer.Vector(500, 275));
        moveables.push(Soccer.ball);
        // Start animation
        Soccer.animation = true;
        window.setInterval(drawUpdate, 20); // Die ganze Zeit wird gemalt (wichtig für den Playerswitch)
        animationInterval = window.setInterval(function () {
            if (Soccer.animation == true) // Nur wenn animation == true bewegt sich alles
                animationUpdate();
        }, 20);
    }
    function restartSimulation() {
        //extra function in case we need the initialisation somewhere else
        initialisation();
    }
    function pauseSimulation() {
        if (Soccer.animation == true) {
            Soccer.animation = false;
        }
        else {
            Soccer.animation = true;
        }
    }
    function getUserPreferences() {
        // FormData - Objekt um die Werte des Formulars auszuwerten!
        let formData = new FormData(document.forms[0]); // Weist der Variablen formData alle fieldsets zu!
        minimumSpeed = Number(formData.get("MinimumSpeedSlider")); // Ich hole mir mit dem Namen "MinimumSpeedSlider" den value, in Form einer Nummer
        maximumSpeed = Number(formData.get("MaximumSpeedSlider"));
        minimumPrecision = Number(formData.get("MinimumPrecisionSlider"));
        maximumPrecision = Number(formData.get("MaximumPrecisionSlider"));
        teamAColor = formData.get("TeamAColorPicker"); // Wir wissen, dass es ein string ist!
        teamBColor = formData.get("TeamBColorPicker");
    }
    // AllPlayer
    function createPeopleonField() {
        // Schiedsrichter und zwei Linienmänner werden kreiert:
        const referee = new Soccer.Referee(new Soccer.Vector(600, 300));
        const linesmanTop = new Soccer.Linesman(new Soccer.Vector(Soccer.crc2.canvas.width / 2, 15));
        const linesmanBottom = new Soccer.Linesman(new Soccer.Vector(Soccer.crc2.canvas.width / 2, Soccer.crc2.canvas.height - 15));
        // Alle in moveables pushen
        moveables.push(referee, linesmanTop, linesmanBottom);
        // Erstellen der Spieler:
        for (let i = 0; i < 32; i++) {
            let position = new Soccer.Vector(Soccer.playerInformation[i].x, Soccer.playerInformation[i].y); // Position vom Interface - Array 
            let startPosition = new Soccer.Vector(Soccer.playerInformation[i].x, Soccer.playerInformation[i].y);
            let team = Soccer.playerInformation[i].team; // von dem Interface - Array 
            let speed = randomBetween(minimumSpeed, maximumSpeed);
            let precision = randomBetween(minimumPrecision, maximumPrecision);
            let jerseyNumber = i + 1;
            let color = "000000"; // Nur für den Fall default value
            if (team == "A") {
                color = teamAColor;
            }
            else if (team == "B") {
                color = teamBColor;
            }
            const player = new Soccer.Player(position, startPosition, team, color, speed, precision, jerseyNumber);
            //Feldspieler in moveables, alle Spieler in allPlayers, Ersatzspieler in sparePlayers
            allPlayers.push(player);
            if (jerseyNumber <= 22) {
                moveables.push(player);
            }
            else if (jerseyNumber > 22) {
                sparePlayers.push(player);
            }
        }
    }
    // Um zu checken ob der Spieler getauscht werden soll, seine Infos angezeigt werden sollen oder der Ball geschossen werden soll:
    function handleCanvasClick(_event) {
        if (_event.shiftKey || _event.altKey) {
            getPlayer(_event); // wird in getPlayer dann unterschieden ob shift oder altkey gedrückt wurde
        }
        else if (Soccer.animation == false) { // nur wenn jemand am Ball ist kann man klicken
            shootBall(_event);
        }
    }
    // Ball bewegen
    function shootBall(_event) {
        // Um das Ziel zu checken, bei einem Tor wird hitGoalA bzw. hitGoalsB auf true gesetzt.
        Soccer.ball.hitGoalA = false;
        Soccer.ball.hitGoalB = false;
        // Mouseposition:
        let xpos = 0;
        let ypos = 0;
        // Damit man wirklich nur auf dem Fußballfeld klicken kann
        if (_event.offsetX > 75 && _event.offsetX < 925) {
            xpos = _event.offsetX; // X-Koordinate der Maus
        }
        if (_event.offsetY > 0 && _event.offsetY < 550) {
            ypos = _event.offsetY; // Y-Koordinate der Maus
        }
        //Wenn position gesetzt wurde (durch Klick), dem Ball einen Vector als Ziel mitgeben:
        if (xpos > 0 && ypos > 0) {
            Soccer.ball.destination = new Soccer.Vector(xpos, ypos);
            Soccer.ball.startMoving = true; // durch ist die Präzision von der Entfernung abhängig.
            Soccer.animation = true; // auch damit man währenddessen Spieler rennen nicht klicken kann
        }
    }
    function handleLeftGoal() {
        goalsB++;
    }
    function handleRightGoal() {
        goalsA++;
    }
    // Spielerinformation bekommen
    function getPlayer(_event) {
        // Aktuelle Mouseposition
        let clickPosition = new Soccer.Vector(_event.offsetX, _event.offsetY);
        // getPlayerClick von der aktuellen Klickposition
        let playerClicked = getPlayerClick(clickPosition);
        // wenn unter der Mouseposition ein Spieler ist, werden die Informationen angezeigt
        if (playerClicked) {
            if (_event.shiftKey) {
                showPlayerInformation(playerClicked);
            }
            else if (_event.altKey) {
                listenToMouseMove = true; //soll erst hören wenn altkey gedrückt wird
                draggedPlayer = playerClicked; // Zuweisung
            }
        }
    }
    function dragPlayer(_event) {
        if (_event.altKey && listenToMouseMove == true) {
            let mousePosition = new Soccer.Vector(_event.offsetX, _event.offsetY);
            if (draggedPlayer) {
                draggedPlayer.position = mousePosition; // Damit Spieler an der Maus bleibt
            }
        }
    }
    function switchPlayer(_event) {
        draggedPlayer = undefined; // damit er losgelassen wird
    }
    // den geklickten Spieler bekommen
    function getPlayerClick(_clickPosition) {
        for (let player of allPlayers) {
            if (player.isClicked(_clickPosition)) // first object in allPlayers array
                return player;
        }
        return null; // Rückgabewert null, wenn kein Spieler unter der Mouseposition ist
    }
    // Player Display
    function showPlayerInformation(_playerClicked) {
        let playerDisplay = document.querySelector("div#playerInformation");
        playerDisplay.innerHTML = "<b>Number: </b>" + _playerClicked.jerseyNumber + " | <b>Speed: </b> " + Math.round(_playerClicked.speed) + " | <b>Precision: </b>" + Math.round(_playerClicked.precision);
    }
    function animationUpdate() {
        // Update animation
        for (let moveable of moveables) {
            moveable.move(); // Player bewegen sich
        }
        // Score:
        let scoreDisplay = document.querySelector("div#score");
        if (Soccer.playerAtBall) {
            scoreDisplay.innerHTML = "<b>Score </b>" + goalsA + " : " + goalsB + " | <b>In possesion of the ball: </b> Player " + Soccer.playerAtBall.jerseyNumber; //add jerseyNumber of player in possesion of the ball 
        }
        else {
            scoreDisplay.innerHTML = "<b>Score </b>" + goalsA + " : " + goalsB + " | <b>In possesion of the ball: </b>Player No ?";
        }
    }
    // Seperat damit immer gezeichnet wird, aber nicht immer bewegt wird (weil wenn die Animation stoppt, könnte man sonst nicht draggen)
    function drawUpdate() {
        // Draw the Playingfield
        field.draw();
        for (let moveable of moveables) {
            moveable.draw(); // Player werden gemalt
        }
        // Auswechselspieler
        for (let sparePlayer of sparePlayers) {
            sparePlayer.draw();
        }
    }
    function initialisation() {
        // Einstellungsformular wird wieder angezeigt
        landingPage.style.display = "";
        //stop animation and reset values to default
        Soccer.animation = false;
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
})(Soccer || (Soccer = {})); // close namespace
//# sourceMappingURL=main.js.map