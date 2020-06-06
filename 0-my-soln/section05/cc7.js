// section 5

// lecture notes
/*

- Primitives (Numbers, Strings, Boolean, Undefined, Null)
- Everything else is an object

OOP in JS:
* Constructor (like java class; eg. Person)
* Inheritance (eg. Person -> Athlete)
* Prototype-based language:
    - Every JS object has a prototype property, which makes inheritance possible
    - Prototype property of an object is where we put methods and properties that
       other objects can inherit
    - Constructor's prototype property is not the prototype of the Constructor 
       itself, but the prototype of ALL instances that are created through it
    - when a certain method/property is called, search starts at the object, then 
       moves up to the object's prototype till method/property is found
    - "prototype chain": eg. john -> Person -> Object -> null (return undefined)
    

*/


// Function Constructor

// example

// ES2015
// class Person {
//     constructor(name, birthYear, job) {
//         this.name = name;
//         this.birthYear = birthYear;
//         this.job = job;
//         this.calculateAge = function () {
//             console.log(2020 - this.birthYear);
//         };
//     }
// }

var Person = function(name, birthYear, job) {
    this.name = name;
    this.birthYear = birthYear;
    this.job = job;
    // this.calculateAge = function() {
    //     console.log(2020 - this.birthYear);
    // }
}

// another way to define protetypes
// look a bit different in console
Person.prototype.calculateAge = function(year) {
    console.log(year - this.birthYear);
}

var john = new Person('john', 1990, 'teacher');
john.calculateAge(2020);

// john instanceof Object -> true
// john instanceof Person -> true
// Person instanceof Object -> true
// therefore, john.hasOwnProperty('job') -> true, even though hasOwnProperty() is method of Object

var personProto = {
    calculateAge: function(year) {
        console.log(year - this.birthYear);
    }
}

var jane = Object.create(personProto);