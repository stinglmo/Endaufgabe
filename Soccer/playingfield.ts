
namespace Soccer {

    export class Playingfield {

        // Methode
        draw(): void {
            console.log("Playingfield wurde gemalt");


            //mark the area of the canvas
            crc2.beginPath();
            crc2.fillStyle = "silver";
            crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);
            crc2.closePath();

            //do the first translation to place field in the middle of the canvas area:
            crc2.save();
            crc2.translate(75, 0);

            crc2.beginPath();
            crc2.rect(0, 0, 850, 550);
            crc2.closePath();
            crc2.fillStyle = "green";
            crc2.fill();

            //in the general translation for the field, leave a border  of 25px around the field
            crc2.save();
            crc2.translate(25, 25);

            //green stripes
            crc2.fillStyle = "darkgreen";
            crc2.beginPath();
            crc2.fillRect(0, 0, 100, 500);
            crc2.fillRect(200, 0, 100, 500);
            crc2.fillRect(400, 0, 100, 500);
            crc2.fillRect(600, 0, 100, 500);
            crc2.closePath();

            //Außenlinie
            crc2.lineWidth = 2;
            crc2.strokeStyle = "#FFF";
            crc2.beginPath();
            crc2.rect(0, 0, 800, 500);
            crc2.stroke();
            crc2.closePath();

            //Mittellinie
            crc2.beginPath();
            crc2.moveTo(800 / 2, 0);
            crc2.lineTo(800 / 2, 500);
            crc2.stroke();
            crc2.closePath();

            //Mittelkreis
            crc2.beginPath();
            crc2.arc(800 / 2, 500 / 2, 70, 0, 2 * Math.PI, false);
            crc2.stroke();
            crc2.closePath();

            //Mittelpunkt
            crc2.fillStyle = "#FFF";
            crc2.beginPath();
            crc2.arc(800 / 2, 500 / 2, 4, 0, 2 * Math.PI, false);
            crc2.fill();
            crc2.closePath();

            //Strafraum links
            crc2.beginPath();
            crc2.rect(0, (500 - 320) / 2, 130, 320);
            crc2.stroke();
            crc2.closePath();

            //Torbox links
            crc2.beginPath();
            crc2.rect(0, (500 - 145) / 2, 45, 145);
            crc2.stroke();
            crc2.closePath();

            //Tor links
            crc2.beginPath();
            crc2.moveTo(1, (500 / 2) - 25);
            crc2.lineTo(1, (500 / 2) + 25);
            crc2.lineWidth = 9;
            crc2.stroke();
            crc2.closePath();
            crc2.lineWidth = 2;

            //Strafraumpunkt links
            crc2.beginPath();
            crc2.arc(90, 500 / 2, 2, 0, 2 * Math.PI, true);
            crc2.fill();
            crc2.closePath();

            //Halbkreis links
            crc2.beginPath();
            crc2.arc(90, 500 / 2, 70, 0.29 * Math.PI, 1.71 * Math.PI, true);
            crc2.stroke();
            crc2.closePath();

            //Strafraum rechts
            crc2.beginPath();
            crc2.rect(800 - 130, (500 - 320) / 2, 130, 320);
            crc2.stroke();
            crc2.closePath();

            //Torbox rechts
            crc2.beginPath();
            crc2.rect(800 - 45, (500 - 145) / 2, 45, 145);
            crc2.stroke();
            crc2.closePath();

            //Tor rechts 
            crc2.beginPath();
            crc2.moveTo(800 - 1, (500 / 2) - 25);
            crc2.lineTo(800 - 1, (500 / 2) + 25);
            crc2.lineWidth = 9;
            crc2.stroke();
            crc2.closePath();
            crc2.lineWidth = 2;

            //Strafraumpunkt rechts
            crc2.beginPath();
            crc2.arc(800 - 90, 500 / 2, 2, 0, 2 * Math.PI, true);
            crc2.fill();
            crc2.closePath();

            //Halbkreis rechts
            crc2.beginPath();
            crc2.arc(800 - 90, 500 / 2, 70, 0.71 * Math.PI, 1.29 * Math.PI, false);
            crc2.stroke();
            crc2.closePath();

            //Ecke oben links
            crc2.beginPath();
            crc2.arc(0, 0, 10, 0, 0.5 * Math.PI, false);
            crc2.stroke();
            crc2.closePath();

            //Ecke unten links
            crc2.beginPath();
            crc2.arc(0, 500, 10, 1.5 * Math.PI, 0, false);
            crc2.stroke();
            crc2.closePath();

            //Ecke oben rechts
            crc2.beginPath();
            crc2.arc(800, 0, 10, 0.5 * Math.PI, 1 * Math.PI, false);
            crc2.stroke();
            crc2.closePath();

            //Ecke unten rechts
            crc2.beginPath();
            crc2.arc(800, 500, 10, 1 * Math.PI, 1.5 * Math.PI, false);
            crc2.stroke();
            crc2.closePath();

            //restore the second translation of the inner field for the lines etc
            crc2.restore();

            //restore the first translation of the overall playing field
            crc2.restore();
        }
        

        

    } // close class



} // close namespace