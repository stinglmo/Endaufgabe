"use strict";
var Soccer;
(function (Soccer) {
    class Playingfield {
        // Methode
        draw() {
            console.log("Playingfield wurde gemalt");
            //mark the area of the canvas
            Soccer.crc2.beginPath();
            Soccer.crc2.fillStyle = "silver";
            Soccer.crc2.fillRect(0, 0, Soccer.crc2.canvas.width, Soccer.crc2.canvas.height);
            Soccer.crc2.closePath();
            //do the first translation to place field in the middle of the canvas area:
            Soccer.crc2.save();
            Soccer.crc2.translate(75, 0);
            Soccer.crc2.beginPath();
            Soccer.crc2.rect(0, 0, 850, 550);
            Soccer.crc2.closePath();
            Soccer.crc2.fillStyle = "green";
            Soccer.crc2.fill();
            //in the general translation for the field, leave a border  of 25px around the field
            Soccer.crc2.save();
            Soccer.crc2.translate(25, 25);
            //green stripes
            Soccer.crc2.fillStyle = "darkgreen";
            Soccer.crc2.beginPath();
            Soccer.crc2.fillRect(0, 0, 50, 500);
            Soccer.crc2.fillRect(100, 0, 50, 500);
            Soccer.crc2.fillRect(200, 0, 50, 500);
            Soccer.crc2.fillRect(300, 0, 50, 500);
            Soccer.crc2.fillRect(400, 0, 50, 500);
            Soccer.crc2.fillRect(500, 0, 50, 500);
            Soccer.crc2.fillRect(600, 0, 50, 500);
            Soccer.crc2.fillRect(700, 0, 50, 500);
            Soccer.crc2.closePath();
            //Außenlinie
            Soccer.crc2.lineWidth = 2;
            Soccer.crc2.strokeStyle = "#FFF";
            Soccer.crc2.beginPath();
            Soccer.crc2.rect(0, 0, 800, 500);
            Soccer.crc2.stroke();
            Soccer.crc2.closePath();
            //Mittellinie
            Soccer.crc2.beginPath();
            Soccer.crc2.moveTo(800 / 2, 0);
            Soccer.crc2.lineTo(800 / 2, 500);
            Soccer.crc2.stroke();
            Soccer.crc2.closePath();
            //Mittelkreis
            Soccer.crc2.beginPath();
            Soccer.crc2.arc(800 / 2, 500 / 2, 70, 0, 2 * Math.PI, false);
            Soccer.crc2.stroke();
            Soccer.crc2.closePath();
            //Mittelpunkt
            Soccer.crc2.fillStyle = "#FFF";
            Soccer.crc2.beginPath();
            Soccer.crc2.arc(800 / 2, 500 / 2, 4, 0, 2 * Math.PI, false);
            Soccer.crc2.fill();
            Soccer.crc2.closePath();
            //Strafraum links
            Soccer.crc2.beginPath();
            Soccer.crc2.rect(0, (500 - 320) / 2, 130, 320);
            Soccer.crc2.stroke();
            Soccer.crc2.closePath();
            //Torbox links
            Soccer.crc2.beginPath();
            Soccer.crc2.rect(0, (500 - 145) / 2, 45, 145);
            Soccer.crc2.stroke();
            Soccer.crc2.closePath();
            //Tor links
            Soccer.crc2.beginPath();
            Soccer.crc2.moveTo(1, (500 / 2) - 25);
            Soccer.crc2.lineTo(1, (500 / 2) + 25);
            Soccer.crc2.lineWidth = 9;
            Soccer.crc2.stroke();
            Soccer.crc2.closePath();
            Soccer.crc2.lineWidth = 2;
            //Strafraumpunkt links
            Soccer.crc2.beginPath();
            Soccer.crc2.arc(90, 500 / 2, 2, 0, 2 * Math.PI, true);
            Soccer.crc2.fill();
            Soccer.crc2.closePath();
            //Halbkreis links
            Soccer.crc2.beginPath();
            Soccer.crc2.arc(90, 500 / 2, 70, 0.29 * Math.PI, 1.71 * Math.PI, true);
            Soccer.crc2.stroke();
            Soccer.crc2.closePath();
            //Strafraum rechts
            Soccer.crc2.beginPath();
            Soccer.crc2.rect(800 - 130, (500 - 320) / 2, 130, 320);
            Soccer.crc2.stroke();
            Soccer.crc2.closePath();
            //Torbox rechts
            Soccer.crc2.beginPath();
            Soccer.crc2.rect(800 - 45, (500 - 145) / 2, 45, 145);
            Soccer.crc2.stroke();
            Soccer.crc2.closePath();
            //Tor rechts 
            Soccer.crc2.beginPath();
            Soccer.crc2.moveTo(800 - 1, (500 / 2) - 25);
            Soccer.crc2.lineTo(800 - 1, (500 / 2) + 25);
            Soccer.crc2.lineWidth = 9;
            Soccer.crc2.stroke();
            Soccer.crc2.closePath();
            Soccer.crc2.lineWidth = 2;
            //Strafraumpunkt rechts
            Soccer.crc2.beginPath();
            Soccer.crc2.arc(800 - 90, 500 / 2, 2, 0, 2 * Math.PI, true);
            Soccer.crc2.fill();
            Soccer.crc2.closePath();
            //Halbkreis rechts
            Soccer.crc2.beginPath();
            Soccer.crc2.arc(800 - 90, 500 / 2, 70, 0.71 * Math.PI, 1.29 * Math.PI, false);
            Soccer.crc2.stroke();
            Soccer.crc2.closePath();
            //Ecke oben links
            Soccer.crc2.beginPath();
            Soccer.crc2.arc(0, 0, 10, 0, 0.5 * Math.PI, false);
            Soccer.crc2.stroke();
            Soccer.crc2.closePath();
            //Ecke unten links
            Soccer.crc2.beginPath();
            Soccer.crc2.arc(0, 500, 10, 1.5 * Math.PI, 0, false);
            Soccer.crc2.stroke();
            Soccer.crc2.closePath();
            //Ecke oben rechts
            Soccer.crc2.beginPath();
            Soccer.crc2.arc(800, 0, 10, 0.5 * Math.PI, 1 * Math.PI, false);
            Soccer.crc2.stroke();
            Soccer.crc2.closePath();
            //Ecke unten rechts
            Soccer.crc2.beginPath();
            Soccer.crc2.arc(800, 500, 10, 1 * Math.PI, 1.5 * Math.PI, false);
            Soccer.crc2.stroke();
            Soccer.crc2.closePath();
            //restore the second translation of the inner field for the lines etc
            Soccer.crc2.restore();
            //restore the first translation of the overall playing field
            Soccer.crc2.restore();
        }
    } // close class
    Soccer.Playingfield = Playingfield;
})(Soccer || (Soccer = {})); // close namespace
//# sourceMappingURL=playingfield.js.map