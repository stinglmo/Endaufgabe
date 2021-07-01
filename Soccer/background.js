"use strict";
var Soccer;
(function (Soccer) {
    class Background {
        constructor() {
            this.drawSoccerfield(0, 0);
        }
        // Methode
        drawSoccerfield(_x, _y) {
            // Außenlinien
            Soccer.crc2.beginPath();
            Soccer.crc2.rect(0, 0, 800, 518);
            Soccer.crc2.fillStyle = "#060";
            Soccer.crc2.fill();
            Soccer.crc2.lineWidth = 1;
            Soccer.crc2.strokeStyle = "#FFF";
            Soccer.crc2.stroke();
            Soccer.crc2.closePath();
            Soccer.crc2.fillStyle = "#FFF";
            // Mittellinie
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
            Soccer.crc2.beginPath();
            Soccer.crc2.arc(800 / 2, 518 / 2, 2, 0, 2 * Math.PI, false);
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
            Soccer.crc2.lineWidth = 1;
            //Strafraumpunkt links
            Soccer.crc2.beginPath();
            Soccer.crc2.arc(88, 518 / 2, 1, 0, 2 * Math.PI, true);
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
            Soccer.crc2.lineWidth = 1;
            //Strafraumpunkt rechts
            Soccer.crc2.beginPath();
            Soccer.crc2.arc(800 - 88, 518 / 2, 1, 0, 2 * Math.PI, true);
            Soccer.crc2.fill();
            Soccer.crc2.closePath();
            //Halbkreis rechts
            Soccer.crc2.beginPath();
            Soccer.crc2.arc(800 - 88, 518 / 2, 73, 0.71 * Math.PI, 1.29 * Math.PI, false);
            Soccer.crc2.stroke();
            Soccer.crc2.closePath();
            //Oben links Ecke
            Soccer.crc2.beginPath();
            Soccer.crc2.arc(0, 0, 8, 0, 0.5 * Math.PI, false);
            Soccer.crc2.stroke();
            Soccer.crc2.closePath();
            //Unten links Ecke
            Soccer.crc2.beginPath();
            Soccer.crc2.arc(0, 518, 8, 0, 2 * Math.PI, true);
            Soccer.crc2.stroke();
            Soccer.crc2.closePath();
            //Oben rechts Ecke
            Soccer.crc2.beginPath();
            Soccer.crc2.arc(800, 0, 8, 0.5 * Math.PI, 1 * Math.PI, false);
            Soccer.crc2.stroke();
            Soccer.crc2.closePath();
            //Unten rechts Ecke
            Soccer.crc2.beginPath();
            Soccer.crc2.arc(800, 518, 8, 1 * Math.PI, 1.5 * Math.PI, false);
            Soccer.crc2.stroke();
            Soccer.crc2.closePath();
        }
    } // close class
    Soccer.Background = Background;
})(Soccer || (Soccer = {})); // close namespace
//# sourceMappingURL=background.js.map