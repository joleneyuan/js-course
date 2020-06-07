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

var jane = Object.create(personProto, {
    name: { value: 'jane'},
    birthYear: { value: 1989 },
    job: { value: 'developer' }
}); 

/*
Difference between Object.create and Function Constructor is 
that Object.create inherits directly from the one that we passed
into the first argument, whereas a newly created object using
Function Constructor inherits from the constructor's prototype
property.

john -> Person {name: "john", birthYear: 1990, job: "teacher"}
jane -> {name: "jane", birthYear: 1989, job: "developer"}
*/

//==============================================================

// Primitives vs objects

/*
Primitives -> hold data within that Object
Object -> reference in memory where the data is held
*/

var a = 23;
var b = a;
a = 46;
console.log('a: ' + a); // 46
console.log('b: ' + b); // 23

var c = {
    name: 'john',
    age: 26
};
var d = c;
c.name = 'jane';
console.log('c: ' + c.name); // jane
console.log('d: ' + d.name); // jane

// functions

var age = 27;
var jonas = {
    name: 'jonas',
    city: 'lisbon'
}

function change(a,b){
    a = 30;
    b.city = 'toronto'
}

change(age, jonas);
console.log(age); // 27
console.log(jonas); // {name: "jonas", city: "toronto"}
age = 30;
console.log(age); // 30


var e = [1,2,3];
var f = e;
console.log('e: ' + e);
console.log('f: ' + f);
e[0] = 5;
console.log('e: ' + e);
console.log('f: ' + f);