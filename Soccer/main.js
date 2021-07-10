"use strict";
var Soccer;
(function (Soccer) {
    let landingPage;
    let startbutton;
    let restartbutton;
    let pausebutton;
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
    Soccer.animation = false; // damit im Player drauf zugreifen kann
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
        { x: 180, y: 450, team: "A" },
        { x: 300, y: 75, team: "A" },
        { x: 300, y: 225, team: "A" },
        { x: 300, y: 325, team: "A" },
        { x: 300, y: 475, team: "A" },
        { x: 400, y: 150, team: "A" },
        { x: 400, y: 400, team: "A" },
        { x: 450, y: 275, team: "A" },
        { x: 500, y: 75, team: "A" },
        // Team B
        { x: 500, y: 475, team: "B" },
        { x: 550, y: 275, team: "B" },
        { x: 600, y: 150, team: "B" },
        { x: 600, y: 400, team: "B" },
        { x: 700, y: 75, team: "B" },
        { x: 700, y: 225, team: "B" },
        { x: 700, y: 325, team: "B" },
        { x: 700, y: 475, team: "B" },
        { x: 820, y: 100, team: "B" },
        { x: 820, y: 450, team: "B" },
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
        // Canvas und rendering context
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        Soccer.crc2 = canvas.getContext("2d");
        //HTML-Elemente werden herangeholt 
        landingPage = document.querySelector("div#settingsContainer");
        startbutton = document.querySelector("div#startbutton");
        restartbutton = document.querySelector("span#restart");
        pausebutton = document.querySelector("span#pause"); // zum ausprobieren
        // EventListener werden auf die Button installiert umd von dem Formular zum Spielfeld zu toggeln 
        startbutton.addEventListener("click", startSimulation);
        restartbutton.addEventListener("click", restartSimulation);
        pausebutton.addEventListener("click", pauseSimulation);
        canvas.addEventListener("click", handleCanvasClick); // checken ob shootBall oder player Information
        Soccer.crc2.canvas.addEventListener(SOCCER_EVENT.RIGHTGOAL_HIT, handleRightGoal);
        Soccer.crc2.canvas.addEventListener(SOCCER_EVENT.LEFTGOAL_HIT, handleLeftGoal);
    }
    function randomBetween(_min, _max) {
        return _min + Math.random() * (_max - _min);
    }
    Soccer.randomBetween = randomBetween;
    function startSimulation() {
        landingPage.style.display = "none"; // Damit das Formular verschwindet
        // Formularauswertung:
        getUserPreferences();
        // Background und Ball werden erstellt:
        field = new Soccer.Playingfield(); // Background
        // Alle Menschen:
        createPeopleonField();
        // Ball
        Soccer.ball = new Soccer.Ball(new Soccer.Vector(500, 275));
        moveables.push(Soccer.ball);
        //start animation
        Soccer.animation = true;
        animationInterval = window.setInterval(function () {
            if (Soccer.animation == true)
                update();
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
        let formData = new FormData(document.forms[0]); // weist der Variablen formData alle fieldsets zu
        // console.log(formData);
        minimumSpeed = Number(formData.get("MinimumSpeedSlider")); // Ich hole mir mit dem Namen "MinimumSpeedSlider" den value, in Form einer Nummer
        maximumSpeed = Number(formData.get("MaximumSpeedSlider"));
        minimumPrecision = Number(formData.get("MinimumPrecisionSlider"));
        maximumPrecision = Number(formData.get("MaximumPrecisionSlider"));
        teamAColor = formData.get("TeamAColorPicker"); //wir wissen, dass es ein string ist!
        teamBColor = formData.get("TeamBColorPicker");
    }
    // AllPlayer
    function createPeopleonField() {
        // Schiedsrichter und zwei Linienmänner werden kreiert:
        const referee = new Soccer.Referee(new Soccer.Vector(600, 300));
        const linesmanTop = new Soccer.Linesman(new Soccer.Vector(Soccer.crc2.canvas.width / 2, 15));
        const linesmanBottom = new Soccer.Linesman(new Soccer.Vector(Soccer.crc2.canvas.width / 2, Soccer.crc2.canvas.height - 15));
        // alle in moveables pushen
        moveables.push(referee, linesmanTop, linesmanBottom);
        // Spieler:
        for (let i = 0; i < 32; i++) {
            let position = new Soccer.Vector(Soccer.playerInformation[i].x, Soccer.playerInformation[i].y); // Position vom playerInformation Array 
            let startPosition = new Soccer.Vector(Soccer.playerInformation[i].x, Soccer.playerInformation[i].y);
            let team = Soccer.playerInformation[i].team; // from array;
            let speed = randomBetween(minimumSpeed, maximumSpeed);
            let precision = randomBetween(minimumPrecision, maximumPrecision);
            let jerseyNumber = i + 1;
            let color = "000000"; //default value just in case
            if (team == "A") {
                color = teamAColor;
            }
            else if (team == "B") {
                color = teamBColor;
            }
            const player = new Soccer.Player(position, startPosition, team, color, speed, precision, jerseyNumber); // keine Ahnung wie man sie verteilt
            // bekommen noch Geschwindigkeit und Präzision
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
    function handleCanvasClick(_event) {
        if (_event.shiftKey) {
            getPlayerInformation(_event);
        }
        else {
            shootBall(_event);
        }
    }
    // Ab hier bis Ende shootBall neu:
    function shootBall(_event) {
        //to be able to check goals, set hitGoalA & hitGoalsB from ball to true
        Soccer.ball.hitGoalA = false;
        Soccer.ball.hitGoalB = false;
        //get the position of the click and move the ball to this position
        // Mouseposition:
        let xpos = 0;
        let ypos = 0;
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
            Soccer.ball.destination = new Soccer.Vector(xpos, ypos);
            Soccer.ball.startMoving = true; // durch ist die Präzision von der Entfernung abhängig.
            Soccer.animation = true;
        }
    }
    function handleLeftGoal() {
        goalsB++;
    }
    function handleRightGoal() {
        goalsA++;
    }
    function update() {
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
        let scoreDisplay = document.querySelector("div#score");
        scoreDisplay.innerHTML = "<b>Score </b>" + goalsA + " : " + goalsB + " | <b>In possesion of the ball: </b> Player " + Soccer.playerAtBall.jerseyNumber; //add jerseyNumber of player in possesion of the ball 
    }
    // Spielerinformation bekommen
    function getPlayerInformation(_event) {
        // Aktuelle Mouseposition
        let clickPosition = new Soccer.Vector(_event.offsetX, _event.offsetY);
        // getPlayerClick von der aktuellen Klickposition
        let playerClicked = getPlayerClick(clickPosition);
        // wenn unter der Mouseposition ein Spieler ist, werden die Informationen angezeigt
        if (playerClicked) {
            showPlayerInformation(playerClicked);
        }
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
})(Soccer || (Soccer = {})); // close namespace
//# sourceMappingURL=main.js.map