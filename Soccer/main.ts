
namespace Soccer {

    window.addEventListener("click", handleLoad);
    // window.addEventListener("click", )

    export let crc2: CanvasRenderingContext2D;
    let canvas: HTMLCanvasElement;

    // Start
    function handleLoad(_event: Event): void {

        canvas = document.getElementsByTagName("canvas")[0];
        crc2 = canvas.getContext("2d")!;

        let fieldset: HTMLFormElement = <HTMLFormElement>document.querySelector(".formular");
        let gameBoard: HTMLCanvasElement = <HTMLCanvasElement>document.querySelector("#border");
        if (fieldset.classList.contains("visible")) {
            fieldset.classList.remove("visible");
            fieldset.classList.add("is-hidden");
        }
        if (gameBoard.classList.contains("is-hidden")) {
            gameBoard.classList.remove("is-hidden");
            gameBoard.classList.add("visible");
        }

        //Hintergund mittels einer Klasse erstellen
        let bG: Background = new Background;
        console.log(bG); // nicht notwendig, aber der Linter spinnt sonst rum.

    }

} // close namespace