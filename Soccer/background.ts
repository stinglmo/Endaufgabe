
namespace Soccer {

    export class Background {

        constructor() {

            this.drawSoccerfield(0, 0);
            
        }

        // Methode
        drawSoccerfield(_x: number, _y: number): void {

            // Außenlinien
            crc2.beginPath();
            crc2.rect(0, 0, 800, 518);
            crc2.fillStyle = "#060";
            crc2.fill();
            crc2.lineWidth = 1;
            crc2.strokeStyle = "#FFF";
            crc2.stroke();
            crc2.closePath();

            crc2.fillStyle = "#FFF";

            
        
            // Mittellinie
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
            crc2.beginPath();
            crc2.arc(800 / 2, 518 / 2, 2, 0, 2 * Math.PI, false);
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
            crc2.lineWidth = 1;
    
            //Strafraumpunkt links
            crc2.beginPath();
            crc2.arc(88, 518 / 2, 1, 0, 2 * Math.PI, true);
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
            crc2.lineWidth = 1;

            //Strafraumpunkt rechts
            crc2.beginPath();
            crc2.arc(800 - 88, 518 / 2, 1, 0, 2 * Math.PI, true);
            crc2.fill();
            crc2.closePath();

            //Halbkreis rechts
            crc2.beginPath();
            crc2.arc(800 - 88, 518 / 2, 73, 0.71 * Math.PI, 1.29 * Math.PI, false);
            crc2.stroke();
            crc2.closePath();
                
            //Oben links Ecke
            crc2.beginPath();
            crc2.arc(0, 0, 8, 0, 0.5 * Math.PI, false);
            crc2.stroke();
            crc2.closePath();

            //Unten links Ecke
            crc2.beginPath();
            crc2.arc(0, 518, 8, 0, 2 * Math.PI, true);
            crc2.stroke();
            crc2.closePath();

            //Oben rechts Ecke
            crc2.beginPath();
            crc2.arc(800, 0, 8, 0.5 * Math.PI, 1 * Math.PI, false);
            crc2.stroke();
            crc2.closePath();

            //Unten rechts Ecke
            crc2.beginPath();
            crc2.arc(800, 518, 8, 1 * Math.PI, 1.5 * Math.PI, false);
            crc2.stroke();
            crc2.closePath();
        }
        

        

    } // close class



} // close namespace