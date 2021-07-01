"use strict";
var Soccer;
(function (Soccer) {
    window.addEventListener("click", handleLoad);
    let canvas;
    // Start
    function handleLoad(_event) {
        canvas = document.getElementsByTagName("canvas")[0];
        Soccer.crc2 = canvas.getContext("2d");
        let fieldset = document.querySelector(".formular");
        let gameBoard = document.querySelector("#border");
        if (fieldset.classList.contains("visible")) {
            fieldset.classList.remove("visible");
            fieldset.classList.add("is-hidden");
        }
        if (gameBoard.classList.contains("is-hidden")) {
            gameBoard.classList.remove("is-hidden");
            gameBoard.classList.add("visible");
        }
        //Hintergund mittels einer Klasse erstellen
        let bG = new Soccer.Background;
        console.log(bG); // nicht notwendig, aber der Linter spinnt sonst rum.
    }
})(Soccer || (Soccer = {})); // close namespace
//# sourceMappingURL=main.js.map