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
    let animation = false;
    let animationInterval;
    let playerInformation = [
        // Team A
        { x: 125, y: 275, team: "A" },
        { x: 200, y: 150, team: "A" },
        { x: 200, y: 400, team: "A" },
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
        { x: 800, y: 150, team: "B" },
        { x: 800, y: 400, team: "B" },
        { x: 875, y: 275, team: "B" },
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
        canvas.addEventListener("click", shootBall);
        //Der ChangeListener wird für alle Fieldset-Elemente installiert um das Formular auszuwerten.
        let fieldsets = document.querySelectorAll("fieldset");
        for (let i = 0; i < fieldsets.length; i++) {
            let fieldset = fieldsets[i];
            fieldset.addEventListener("change", handleChange);
        }
    }
    function randomBetween(_min, _max) {
        return _min + Math.random() * (_max - _min);
    }
    Soccer.randomBetween = randomBetween;
    function startSimulation() {
        landingPage.style.display = "none"; // Damit das Formular verschwindet
        // Background und Ball werden erstellt:
        field = new Soccer.Playingfield(); // Background
        Soccer.ball = new Soccer.Ball(new Soccer.Vector(500, 275));
        moveables.push(Soccer.ball);
        // Alle Menschen:
        createPeopleonField();
        //start animation
        animation = true;
        animationInterval = window.setInterval(function () {
            if (animation == true)
                update();
        }, 20);
    }
    function restartSimulation() {
        //extra function in case we need the initialisation somewhere else
        initialisation();
    }
    function pauseSimulation() {
        if (animation == true) {
            animation = false;
        }
        else {
            animation = true;
        }
    }
    function handleChange() {
        // FormData - Objekt um in der HandleChange Funktion die Werte des Formulars auszuwerten!
        let formData = new FormData(document.forms[0]); // weist der Variablen formData alle fieldsets zu
        // console.log(formData);
        minimumSpeed = Number(formData.get("MinimumSpeedSlider")); // Ich hole mir mit dem Namen "MinimumSpeedSlider" den value, in Form einer Nummer
        maximumSpeed = Number(formData.get("MaximumSpeedSlider"));
        minimumPrecision = Number(formData.get("MinimumPrecisionSlider"));
        maximumPrecision = Number(formData.get("MaximumPrecisionSlider"));
        teamAColor = formData.get("TeamAColorPicker"); // warum  string? Ich habs ohne
        teamBColor = formData.get("TeamBColorPicker");
    }
    // AllPlayer
    function createPeopleonField() {
        // Spieler:
        for (let i = 0; i < 32; i++) {
            let position = new Soccer.Vector(playerInformation[i].x, playerInformation[i].y); // Position vom playerInformation Array 
            let team = playerInformation[i].team; // from array;
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
            const player = new Soccer.Player(position, team, color, speed, precision, jerseyNumber); // keine Ahnung wie man sie verteilt
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
        // Schiedsrichter und zwei Linienmänner werden kreiert:
        const referee = new Soccer.Referee(new Soccer.Vector(20, 20 + 800));
        const linesmanTop = new Soccer.Linesman(new Soccer.Vector(Soccer.crc2.canvas.width / 2, 15));
        const linesmanBottom = new Soccer.Linesman(new Soccer.Vector(Soccer.crc2.canvas.width / 2, Soccer.crc2.canvas.height - 15));
        // alle in moveables pushen
        moveables.push(referee, linesmanTop, linesmanBottom);
    }
    function shootBall(_event) {
        //get the position of the click and move the ball to this position
        //je größer die Distanz zwischen ball und klick, desto größer ist der radius um den klickpunkt, aus dem eine zufällige Zielposition gewählt wird
    }
    function update() {
        //draw the background
        field.draw();
        //update animation
        for (let moveable of moveables) {
            moveable.move();
            moveable.draw();
        }
        for (let sparePlayer of sparePlayers) {
            sparePlayer.draw();
        }
        // Score:
        let scoreDisplay = document.querySelector("div#score");
        scoreDisplay.innerHTML = "<b>Score </b>" + goalsA + " : " + goalsB + " | <b>In possesion of the ball: </b>Player No ?"; //add jerseyNumber of player in possesion of the ball 
    }
    function initialisation() {
        //show setings container again
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
        //animationsintervall beenden
        window.clearInterval(animationInterval);
    }
})(Soccer || (Soccer = {})); // close namespace
//# sourceMappingURL=main.js.map