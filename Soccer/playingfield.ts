
namespace Soccer {

    export class Playingfield {

        constructor() {
            console.log("Playingfield wurde erstellt");
            
        }

        // Methode
        draw(): void {
            console.log("Playingfield wurde gemalt");


            crc2.fillStyle = "green";
            crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);
            crc2.fill();

            //leave a border around the field
            crc2.save();
            crc2.translate(10, 10);

            //green stripes
            crc2.fillStyle = "darkgreen";
            crc2.fillRect(0, 0, 100, crc2.canvas.height - 20);
            crc2.fill();
            crc2.fillRect(200, 0, 100, crc2.canvas.height - 20);
            crc2.fill();
            crc2.fillRect(400, 0, 100, crc2.canvas.height - 20);
            crc2.fill();
            crc2.fillRect(600, 0, 100, crc2.canvas.height - 20);
            crc2.fill();

            //Außenlinie
            crc2.lineWidth = 2;
            crc2.strokeStyle = "#FFF";
            crc2.rect(0, 0, crc2.canvas.width - 20, crc2.canvas.height - 20);
            crc2.stroke();
            crc2.closePath();

            //Mittellinie
            crc2.beginPath();
            crc2.fillStyle = "060";
            crc2.moveTo(800 / 2, 0);
            crc2.lineTo(800 / 2, 518);
            crc2.stroke();
            crc2.closePath();
            
            //Mittelkreis
            crc2.beginPath();
            crc2.arc(800 / 2, 518 / 2, 73, 0, 2 * Math.PI, false);
            crc2.stroke();
            crc2.closePath();

            //Mittelpunkt
            crc2.fillStyle = "#FFF";
            crc2.beginPath();
            crc2.arc(800 / 2, 518 / 2, 4, 0, 2 * Math.PI, false);
            crc2.fill();
            crc2.closePath();
            
            //Strafraum links
            crc2.beginPath();
            crc2.rect(0, (518 - 322) / 2, 132, 322);
            crc2.stroke();
            crc2.closePath();

            //Torbox links
            crc2.beginPath();
            crc2.rect(0, (518 - 146) / 2, 44, 146);
            crc2.stroke();
            crc2.closePath();

            //Tor links
            crc2.beginPath();
            crc2.moveTo(1, (518 / 2) - 22);
            crc2.lineTo(1, (518 / 2) + 22);
            crc2.lineWidth = 9;
            crc2.stroke();
            crc2.closePath();
            crc2.lineWidth = 2;
    
            //Strafraumpunkt links
            crc2.beginPath();
            crc2.arc(88, 518 / 2, 2, 0, 2 * Math.PI, true);
            crc2.fill();
            crc2.closePath();

            //Halbkreis links
            crc2.beginPath();
            crc2.arc(88, 518 / 2, 73, 0.29 * Math.PI, 1.71 * Math.PI, true);
            crc2.stroke();
            crc2.closePath();
            
            //Strafraum rechts
            crc2.beginPath();
            crc2.rect(800 - 132, (518 - 322) / 2, 132, 322);
            crc2.stroke();
            crc2.closePath();

            //Torbox rechts
            crc2.beginPath();
            crc2.rect(800 - 44, (518 - 146) / 2, 44, 146);
            crc2.stroke();
            crc2.closePath(); 

            //Tor rechts 
            crc2.beginPath();
            crc2.moveTo(800 - 1, (518 / 2) - 22);
            crc2.lineTo(800 - 1, (518 / 2) + 22);
            crc2.lineWidth = 9;
            crc2.stroke();
            crc2.closePath();
            crc2.lineWidth = 2;

            //Strafraumpunkt rechts
            crc2.beginPath();
            crc2.arc(800 - 88, 518 / 2, 2, 0, 2 * Math.PI, true);
            crc2.fill();
            crc2.closePath();

            //Halbkreis rechts
            crc2.beginPath();
            crc2.arc(800 - 88, 518 / 2, 73, 0.71 * Math.PI, 1.29 * Math.PI, false);
            crc2.stroke();
            crc2.closePath();
                
            //Ecke oben links
            crc2.beginPath();
            crc2.arc(0, 0, 8, 0, 0.5 * Math.PI, false);
            crc2.stroke();
            crc2.closePath();

            //Ecke unten links
            crc2.beginPath();
            crc2.arc(0, 518, 8, 1.5 * Math.PI, 0, false);
            crc2.stroke();
            crc2.closePath();

            //Ecke oben rechts
            crc2.beginPath();
            crc2.arc(800, 0, 8, 0.5 * Math.PI, 1 * Math.PI, false);
            crc2.stroke();
            crc2.closePath();

            //Ecke unten rechts
            crc2.beginPath();
            crc2.arc(800, 518, 8, 1 * Math.PI, 1.5 * Math.PI, false);
            crc2.stroke();
            crc2.closePath();

            crc2.restore();
        }
        

        

    } // close class



} // close namespace