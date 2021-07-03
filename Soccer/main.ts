
namespace Soccer {

    export let crc2: CanvasRenderingContext2D;
    let settings: HTMLElement;
    let landingPage: HTMLDivElement;
    let startbutton: HTMLDivElement;
    let restartbutton: HTMLSpanElement;

    let minimumSpeed: number = 3; // Folgenden 4 bekommen Formularwerte
    let maximumSpeed: number = 3;
    let minimumPrecision: number = 6;
    let maximumPrecision: number = 7;
    let teamAColor: string = "66b2ff";
    let teamBColor: string = "ff3333";
    let goalsA: number;
    let goalsB: number;
    let field: Playingfield;
    let animation: boolean = true;

    interface PlayerInformation {
        x: number;
        y: number;
        team: string;
    }

    let playerInformation: PlayerInformation[] = [

        // Team A
        {x: 125, y: 275, team: "A"},
        {x: 200, y: 150, team: "A"},
        {x: 200, y: 400, team: "A"},
        {x: 300, y: 75, team: "A"},
        {x: 300, y: 225, team: "A"},
        {x: 300, y: 325, team: "A"},
        {x: 300, y: 475, team: "A"},
        {x: 400, y: 150, team: "A"},
        {x: 400, y: 400, team: "A"},
        {x: 450, y: 275, team: "A"},
        {x: 500, y: 75, team: "A"},
        
        // Team B
        {x: 500, y: 475, team: "B"},
        {x: 550, y: 275, team: "B"},
        {x: 600, y: 150, team: "B"},
        {x: 600, y: 400, team: "B"},
        {x: 700, y: 75, team: "B"},
        {x: 700, y: 225, team: "B"},
        {x: 700, y: 325, team: "B"},
        {x: 700, y: 475, team: "B"},
        {x: 800, y: 150, team: "B"},
        {x: 800, y: 400, team: "B"},
        {x: 875, y: 275, team: "B"},
        
        // Auswechselspieler Team A
        {x: 25, y: 125, team: "A"},
        {x: 25, y: 200, team: "A"},
        {x: 25, y: 275, team: "A"},
        {x: 25, y: 350, team: "A"},
        {x: 25, y: 425, team: "A"},
        
        // Auswechselspieler Team B
        {x: 975, y: 125, team: "B"},
        {x: 975, y: 200, team: "B"},
        {x: 975, y: 275, team: "B"},
        {x: 975, y: 350, team: "B"},
        {x: 975, y: 425, team: "B"}
        ];

    let allPlayers: Player[] = [];
    let moveables: Movable[] = [];

    window.addEventListener("load", handleLoad);

    function handleLoad(): void {
        let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
        if (!canvas)
            return;
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");
        landingPage = <HTMLDivElement>document.querySelector("div#container");
        startbutton = <HTMLDivElement>document.querySelector("div#startbutton");
        restartbutton = <HTMLSpanElement>document.querySelector("span#restart");

        startbutton.addEventListener("click", startSimulation);
        restartbutton.addEventListener("click", restartSimulation);

    }

    function startSimulation(): void {
        landingPage.style.display = "none";
        let field: Playingfield = new Playingfield();
        field.draw();
        createPlayers();

        let ball = new Ball(new Vector(20 + (800 / 2), 20 + (512 / 2)));

    }

    function restartSimulation(): void {
        landingPage.style.display = "";
    }


    // AllPlayer
    function createPlayers(): void {

         // Spieler:
        for (let i: number = 0; i < 32; i++) {

            let position: Vector = new Vector (/*position from playerInformation array*/)
            let team: string = "A"; // from array;
            let speed: number = 5; // randomBetween(minimumSpeed, maximumSpeed);
            let precision: number = 2; // randomBetween(minimumPrecision, maximumPrecision);
            let jerseyNumber: number = i + 1;

            const player: Player = new Player("Player", new Vector(5, 5 + (512 / 2))); // keine Ahnung wie man sie verteilt
            // bekommen noch Geschwindigkeit und Präzision

            allPlayers.push(player);

            if (jerseyNumber <= 22) {
                moveables.push(player);
            }
            
            
        }
        
        // Schiedsrichter und zwei Linienmänner werden kreiert:
        const arbit: Referee = new Referee(new Vector(20, 20 + 800));
        const linesmanTop: Linesman = new Linesman(new Vector(20, 20 + 800 / 2));
        const linesmanBottom: Linesman = new Linesman(new Vector(20 + 800 / 2, 20 + 800));
        
        // alle in Moveable pushen
        moveables.push(arbit, linesmanTop, linesmanBottom);

    }


} // close namespace