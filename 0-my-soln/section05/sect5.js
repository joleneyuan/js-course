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


//==============================================================

// Callback function: functions passed as arguments

var years = [1990, 1991, 1992];

function calcAge(birthYears, aaa) {
    var res = [];
    for (let birthYear of birthYears) {
        res.push(aaa(birthYear));
    }
    return res;
}

function calcAge2(birthYear) {
    return 2020 - birthYear;
}

var ages = calcAge(years, calcAge2);
console.log(ages);


//==============================================================

// Function returning function

function questions(job) {
    if (job === 'designer') {
        return function(name) {
            designer(name);
        }
    } else {
        return function(name) {
            console.log(name + ", " + job + " sounds like a fun job!");
        }
    }
}

function designer(name) {
    console.log(name + ", explain UX design");
}

var randQ = questions('teacher');
randQ('John');
var desQ = questions('designer');
desQ('Rob');
questions('architect')('Honey');


//==============================================================

// IIFE: Immediately Invoked Function Expression

/*
    The purpose of this is not to create reusable code, but to
    create a new scope that is hidden from the outside scope.
    aka Just for data privacy
*/ 

function rand() {
    console.log('lalala'); // this line won't be invoked
}

// another way to write it AND calling it
(function () {
    console.log('hohoho'); // this line WILL be invoked
})();


//==============================================================

// Closures

/*
    An inner function has always access to the variables and parameters
    of its outer function, even after the outer function has returned
    * variables in outer function still exist in scope chain after return
    * primarily used for data privacy, partial application
*/

function retirement(retirementAge) {
    var a = ' years till retirement';

    return function(birthYear) {
        var age = 2020 - birthYear;
        console.log((retirementAge - age) + a);
    }
}

var retirementUS = retirement(66);
retirementUS(1990);
// retirement(66)(1990);

/*
    function questions(job) {
        if (job === 'designer') {
            return function(name) {
                designer(name);
            }
        } else {
            return function(name) {
                console.log(name + ", " + job + " sounds like a fun job!");
                // unknowingly used the closure concept here for var 'job'
            }
        }
    }
*/

// this is a cleaner version of the above, since it only returns one function
function questions2(job) {
    return function(name) {
        if (job === 'designer') {
            designer(name);
        } else {
            console.log(name + ", " + job + " sounds like a fun job!");
            // unknowingly used the closure concept here for var 'job'
        }
    }
}
questions2('painter')('sam');
    

//==============================================================

// Bind, call and apply

var james = {
    name: 'james',
    presentation: function(style, time) {
        if (style === 'formal') {
            console.log('formal: good ' + time + " " + this.name);
        } else {
            console.log('friendly: ' + time + " " + this.name);
        }
    }
};
james.presentation('formal', 'morning');

var emily = {
    name: 'emily'
};

// method borrowing: use james' method on emily
// manually sets 'this'
james.presentation.call(emily, 'informal', 'afternoon');

// will not work because function does not expect array
// james.presentation.apply(emily, ['informal', 'afternoon']);

// bind or 'currying' - preset parameters
var friendlyJames = james.presentation.bind(james, 'friendly');
friendlyJames('morning');
friendlyJames('night');