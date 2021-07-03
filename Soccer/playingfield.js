"use strict";
var Soccer;
(function (Soccer) {
    class Playingfield {
        constructor() {
            console.log("Playingfield wurde erstellt");
        }
        // Methode
        draw() {
            console.log("Playingfield wurde gemalt");
            Soccer.crc2.fillStyle = "green";
            Soccer.crc2.fillRect(0, 0, Soccer.crc2.canvas.width, Soccer.crc2.canvas.height);
            Soccer.crc2.fill();
            //leave a border around the field
            Soccer.crc2.save();
            Soccer.crc2.translate(10, 10);
            //green stripes
            Soccer.crc2.fillStyle = "darkgreen";
            Soccer.crc2.fillRect(0, 0, 100, Soccer.crc2.canvas.height - 20);
            Soccer.crc2.fill();
            Soccer.crc2.fillRect(200, 0, 100, Soccer.crc2.canvas.height - 20);
            Soccer.crc2.fill();
            Soccer.crc2.fillRect(400, 0, 100, Soccer.crc2.canvas.height - 20);
            Soccer.crc2.fill();
            Soccer.crc2.fillRect(600, 0, 100, Soccer.crc2.canvas.height - 20);
            Soccer.crc2.fill();
            //Außenlinie
            Soccer.crc2.lineWidth = 2;
            Soccer.crc2.strokeStyle = "#FFF";
            Soccer.crc2.rect(0, 0, Soccer.crc2.canvas.width - 20, Soccer.crc2.canvas.height - 20);
            Soccer.crc2.stroke();
            Soccer.crc2.closePath();
            //Mittellinie
            Soccer.crc2.beginPath();
            Soccer.crc2.fillStyle = "060";
            Soccer.crc2.moveTo(800 / 2, 0);
            Soccer.crc2.lineTo(800 / 2, 518);
            Soccer.crc2.stroke();
            Soccer.crc2.closePath();
            //Mittelkreis
            Soccer.crc2.beginPath();
            Soccer.crc2.arc(800 / 2, 518 / 2, 73, 0, 2 * Math.PI, false);
            Soccer.crc2.stroke();
            Soccer.crc2.closePath();
            //Mittelpunkt
            Soccer.crc2.fillStyle = "#FFF";
            Soccer.crc2.beginPath();
            Soccer.crc2.arc(800 / 2, 518 / 2, 4, 0, 2 * Math.PI, false);
            Soccer.crc2.fill();
            Soccer.crc2.closePath();
            //Strafraum links
            Soccer.crc2.beginPath();
            Soccer.crc2.rect(0, (518 - 322) / 2, 132, 322);
            Soccer.crc2.stroke();
            Soccer.crc2.closePath();
            //Torbox links
            Soccer.crc2.beginPath();
            Soccer.crc2.rect(0, (518 - 146) / 2, 44, 146);
            Soccer.crc2.stroke();
            Soccer.crc2.closePath();
            //Tor links
            Soccer.crc2.beginPath();
            Soccer.crc2.moveTo(1, (518 / 2) - 22);
            Soccer.crc2.lineTo(1, (518 / 2) + 22);
            Soccer.crc2.lineWidth = 9;
            Soccer.crc2.stroke();
            Soccer.crc2.closePath();
            Soccer.crc2.lineWidth = 2;
            //Strafraumpunkt links
            Soccer.crc2.beginPath();
            Soccer.crc2.arc(88, 518 / 2, 2, 0, 2 * Math.PI, true);
            Soccer.crc2.fill();
            Soccer.crc2.closePath();
            //Halbkreis links
            Soccer.crc2.beginPath();
            Soccer.crc2.arc(88, 518 / 2, 73, 0.29 * Math.PI, 1.71 * Math.PI, true);
            Soccer.crc2.stroke();
            Soccer.crc2.closePath();
            //Strafraum rechts
            Soccer.crc2.beginPath();
            Soccer.crc2.rect(800 - 132, (518 - 322) / 2, 132, 322);
            Soccer.crc2.stroke();
            Soccer.crc2.closePath();
            //Torbox rechts
            Soccer.crc2.beginPath();
            Soccer.crc2.rect(800 - 44, (518 - 146) / 2, 44, 146);
            Soccer.crc2.stroke();
            Soccer.crc2.closePath();
            //Tor rechts 
            Soccer.crc2.beginPath();
            Soccer.crc2.moveTo(800 - 1, (518 / 2) - 22);
            Soccer.crc2.lineTo(800 - 1, (518 / 2) + 22);
            Soccer.crc2.lineWidth = 9;
            Soccer.crc2.stroke();
            Soccer.crc2.closePath();
            Soccer.crc2.lineWidth = 2;
            //Strafraumpunkt rechts
            Soccer.crc2.beginPath();
            Soccer.crc2.arc(800 - 88, 518 / 2, 2, 0, 2 * Math.PI, true);
            Soccer.crc2.fill();
            Soccer.crc2.closePath();
            //Halbkreis rechts
            Soccer.crc2.beginPath();
            Soccer.crc2.arc(800 - 88, 518 / 2, 73, 0.71 * Math.PI, 1.29 * Math.PI, false);
            Soccer.crc2.stroke();
            Soccer.crc2.closePath();
            //Ecke oben links
            Soccer.crc2.beginPath();
            Soccer.crc2.arc(0, 0, 8, 0, 0.5 * Math.PI, false);
            Soccer.crc2.stroke();
            Soccer.crc2.closePath();
            //Ecke unten links
            Soccer.crc2.beginPath();
            Soccer.crc2.arc(0, 518, 8, 1.5 * Math.PI, 0, false);
            Soccer.crc2.stroke();
            Soccer.crc2.closePath();
            //Ecke oben rechts
            Soccer.crc2.beginPath();
            Soccer.crc2.arc(800, 0, 8, 0.5 * Math.PI, 1 * Math.PI, false);
            Soccer.crc2.stroke();
            Soccer.crc2.closePath();
            //Ecke unten rechts
            Soccer.crc2.beginPath();
            Soccer.crc2.arc(800, 518, 8, 1 * Math.PI, 1.5 * Math.PI, false);
            Soccer.crc2.stroke();
            Soccer.crc2.closePath();
            Soccer.crc2.restore();
        }
    } // close class
    Soccer.Playingfield = Playingfield;
})(Soccer || (Soccer = {})); // close namespace
//# sourceMappingURL=playingfield.js.map