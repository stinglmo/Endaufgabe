/*
Aufgabe: Endaufgabe Soccer Simulation
Name: Mona Stingl
Matrikel: 267315
Datum: 19.07.21
Quellen: Lektionen aus dem Unterricht (insbesondere Asteroids), MDN und W3School
Diese Abgabe ist in Zusammmenarbeit mit Hannah Dürr entstanden
*/

namespace Soccer {

    export class Playingfield {

        // Soccer - Field
        draw(): void {

            // Mark the canvas area
            crc2.beginPath();
            crc2.fillStyle = "silver";
            crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);
            crc2.closePath();

            // Do the first translation to place field in the middle of the canvas area
            crc2.save();
            crc2.translate(75, 0);

            crc2.beginPath();
            crc2.rect(0, 0, 850, 550);
            crc2.closePath();
            crc2.fillStyle = "green";
            crc2.fill();

            // In the general translation for the field, leave a border of 25px around the field
            crc2.save();
            crc2.translate(25, 25);

            // Green stripes
            crc2.fillStyle = "darkgreen";
            crc2.beginPath();
            crc2.fillRect(0, 0, 50, 500);
            crc2.fillRect(100, 0, 50, 500);
            crc2.fillRect(200, 0, 50, 500);
            crc2.fillRect(300, 0, 50, 500);
            crc2.fillRect(400, 0, 50, 500);
            crc2.fillRect(500, 0, 50, 500);
            crc2.fillRect(600, 0, 50, 500);
            crc2.fillRect(700, 0, 50, 500);
            crc2.closePath();

            // Outer border
            crc2.lineWidth = 2;
            crc2.strokeStyle = "#FFF";
            crc2.beginPath();
            crc2.rect(0, 0, 800, 500);
            crc2.stroke();
            crc2.closePath();

            // Middle line
            crc2.beginPath();
            crc2.moveTo(800 / 2, 0);
            crc2.lineTo(800 / 2, 500);
            crc2.stroke();
            crc2.closePath();

            // Middle circle
            crc2.beginPath();
            crc2.arc(800 / 2, 500 / 2, 70, 0, 2 * Math.PI, false);
            crc2.stroke();
            crc2.closePath();

            // Middle point
            crc2.fillStyle = "#FFF";
            crc2.beginPath();
            crc2.arc(800 / 2, 500 / 2, 4, 0, 2 * Math.PI, false);
            crc2.fill();
            crc2.closePath();

            // Penalty box left
            crc2.beginPath();
            crc2.rect(0, (500 - 320) / 2, 130, 320);
            crc2.stroke();
            crc2.closePath();

            // Goal box left
            crc2.beginPath();
            crc2.rect(0, (500 - 145) / 2, 45, 145);
            crc2.stroke();
            crc2.closePath();

            // Goal left
            crc2.beginPath();
            crc2.moveTo(1, (500 / 2) - 50);
            crc2.lineTo(1, (500 / 2) + 50);
            crc2.lineWidth = 9;
            crc2.stroke();
            crc2.closePath();
            crc2.lineWidth = 2;

            // Penalty box point left
            crc2.beginPath();
            crc2.arc(90, 500 / 2, 2, 0, 2 * Math.PI, true);
            crc2.fill();
            crc2.closePath();

            // Half circle left
            crc2.beginPath();
            crc2.arc(90, 500 / 2, 70, 0.29 * Math.PI, 1.71 * Math.PI, true);
            crc2.stroke();
            crc2.closePath();

            // Penalty box right
            crc2.beginPath();
            crc2.rect(800 - 130, (500 - 320) / 2, 130, 320);
            crc2.stroke();
            crc2.closePath();

            // Goal box right
            crc2.beginPath();
            crc2.rect(800 - 45, (500 - 145) / 2, 45, 145);
            crc2.stroke();
            crc2.closePath();

            // Goal right
            crc2.beginPath();
            crc2.moveTo(800 - 1, (500 / 2) - 50);
            crc2.lineTo(800 - 1, (500 / 2) + 50);
            crc2.lineWidth = 9;
            crc2.stroke();
            crc2.closePath();
            crc2.lineWidth = 2;

            // Penalty box point right
            crc2.beginPath();
            crc2.arc(800 - 90, 500 / 2, 2, 0, 2 * Math.PI, true);
            crc2.fill();
            crc2.closePath();

            // Half circle right
            crc2.beginPath();
            crc2.arc(800 - 90, 500 / 2, 70, 0.71 * Math.PI, 1.29 * Math.PI, false);
            crc2.stroke();
            crc2.closePath();

            // Corner top left
            crc2.beginPath();
            crc2.arc(0, 0, 10, 0, 0.5 * Math.PI, false);
            crc2.stroke();
            crc2.closePath();

            // Corner bottom left
            crc2.beginPath();
            crc2.arc(0, 500, 10, 1.5 * Math.PI, 0, false);
            crc2.stroke();
            crc2.closePath();

            // Corner top right
            crc2.beginPath();
            crc2.arc(800, 0, 10, 0.5 * Math.PI, 1 * Math.PI, false);
            crc2.stroke();
            crc2.closePath();

            // Corner bottom right
            crc2.beginPath();
            crc2.arc(800, 500, 10, 1 * Math.PI, 1.5 * Math.PI, false);
            crc2.stroke();
            crc2.closePath();

            // Restore the second translation of the inner field for the lines etc
            crc2.restore();

            // Restore the first translation of the overall playing field
            crc2.restore();
        }
    } // Close class
} // Close namespace