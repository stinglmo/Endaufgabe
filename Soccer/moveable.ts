/*
Aufgabe: Endaufgabe Soccer Simulation
Name: Mona Stingl
Matrikel: 267315
Datum: 19.07.21
Quellen: Lektionen aus dem Unterricht (insbesondere Asteroids), MDN und W3School
Diese Abgabe ist in Zusammmenarbeit mit Hannah Dürr entstanden
*/

namespace Soccer {
    
    // Superclass moveable
    export abstract class Moveable {

        public position: Vector;

        constructor(_position: Vector) {
            this.position = _position;
        }

        public abstract draw(): void;

        public abstract move(): void;
    }
}