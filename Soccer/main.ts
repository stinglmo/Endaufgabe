
namespace Soccer {

    export let crc2: CanvasRenderingContext2D;
    let settings: HTMLElement;
    let landingPage: HTMLDivElement;
    let startbutton: HTMLDivElement;
    let restartbutton: HTMLSpanElement;

    // FormData - Objekt um in der HandleChange Funktion die Werte des Formulars auszuwerten!
    let formData: FormData;
     // Folgenden 6 bekommen Formularwerte
    let minimumSpeed: number;
    let maximumSpeed: number;
    let minimumPrecision: number;
    let maximumPrecision: number;
    let teamAColor: FormDataEntryValue | null;
    let teamBColor: FormDataEntryValue | null;

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

        handleChange(); //

        startbutton.addEventListener("click", startSimulation);
        restartbutton.addEventListener("click", restartSimulation);

        

    }

    function handleChange(): void {
        let formData: FormData = new FormData(document.forms[0]);  // weist der Variablen formData alle fieldsets zu
        console.log(formData);
        
        minimumSpeed = Number(formData.get("MinimumSpeedSlider")); // Ich hole mir mit dem Namen "MinimumSpeedSlider" den value, in Form einer Nummer
        maximumSpeed = Number(formData.get("MaximumSpeedSlider"));
        minimumPrecision = Number(formData.get("MinimumPrecisionSlider"));
        maximumPrecision = Number(formData.get("MaximumPrecisionSlider"));

        teamAColor = <string>formData.get("TeamAColorPicker"); // warum  string? Ich habs ohne
        teamBColor = <string>formData.get("TeamBColorPicker");
    }

    function startSimulation(): void {

        landingPage.style.display = "none"; // Damit das Formular verschwindet
        let field: Playingfield = new Playingfield();
        field.draw();

        let ball: Ball = new Ball(new Vector(20 + (800 / 2), 20 + (512 / 2)));
        moveables.push(ball);
        
        createPlayers();
        

    }

    function restartSimulation(): void {
        landingPage.style.display = "";
        // here reset speed, precision and color values to default 
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