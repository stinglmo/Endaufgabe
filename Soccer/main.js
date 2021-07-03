"use strict";
var Soccer;
(function (Soccer) {
    let settings;
    let landingPage;
    let startbutton;
    let restartbutton;
    let minimumSpeed = 3; // Folgenden 4 bekommen Formularwerte
    let maximumSpeed = 3;
    let minimumPrecision = 6;
    let maximumPrecision = 7;
    let teamAColor = "66b2ff";
    let teamBColor = "ff3333";
    let goalsA;
    let goalsB;
    let field;
    let animation = true;
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
    let allPlayers = [];
    let moveables = [];
    window.addEventListener("load", handleLoad);
    function handleLoad() {
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        Soccer.crc2 = canvas.getContext("2d");
        landingPage = document.querySelector("div#container");
        startbutton = document.querySelector("div#startbutton");
        restartbutton = document.querySelector("span#restart");
        startbutton.addEventListener("click", startSimulation);
        restartbutton.addEventListener("click", restartSimulation);
    }
    function startSimulation() {
        landingPage.style.display = "none";
        let field = new Soccer.Playingfield();
        field.draw();
        createPlayers();
        let ball = new Soccer.Ball(new Soccer.Vector(20 + (800 / 2), 20 + (512 / 2)));
    }
    function restartSimulation() {
        landingPage.style.display = "";
    }
    // AllPlayer
    function createPlayers() {
        // Spieler:
        for (let i = 0; i < 32; i++) {
            let position = new Soccer.Vector( /*position from playerInformation array*/);
            let team = "A"; // from array;
            let speed = 5; // randomBetween(minimumSpeed, maximumSpeed);
            let precision = 2; // randomBetween(minimumPrecision, maximumPrecision);
            let jerseyNumber = i + 1;
            const player = new Soccer.Player("Player", new Soccer.Vector(5, 5 + (512 / 2))); // keine Ahnung wie man sie verteilt
            // bekommen noch Geschwindigkeit und Präzision
            allPlayers.push(player);
            if (jerseyNumber <= 22) {
                moveables.push(player);
            }
        }
        // Schiedsrichter und zwei Linienmänner werden kreiert:
        const arbit = new Soccer.Referee(new Soccer.Vector(20, 20 + 800));
        const linesmanTop = new Soccer.Linesman(new Soccer.Vector(20, 20 + 800 / 2));
        const linesmanBottom = new Soccer.Linesman(new Soccer.Vector(20 + 800 / 2, 20 + 800));
        // alle in Moveable pushen
        moveables.push(arbit, linesmanTop, linesmanBottom);
    }
})(Soccer || (Soccer = {})); // close namespace
//# sourceMappingURL=main.js.map