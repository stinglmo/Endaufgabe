"use strict";
/*
Aufgabe: Endaufgabe Soccer Simulation
Name: Mona Stingl
Matrikel: 267315
Datum: 19.07.21
Quellen: Lektionen aus dem Unterricht (insbesondere Asteroids), MDN und W3School
Diese Abgabe ist in Zusammmenarbeit mit Hannah Dürr entstanden
*/
var Soccer;
(function (Soccer) {
    // Superclass moveable
    class Moveable {
        constructor(_position) {
            this.position = _position;
        }
    }
    Soccer.Moveable = Moveable;
})(Soccer || (Soccer = {}));
//# sourceMappingURL=moveable.js.map