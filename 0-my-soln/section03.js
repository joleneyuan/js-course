//================================================================
// Lecture Notes for Section 03

console.log("\n\n\n================================================================");
console.log("Section 03 Notes\n\n");

/*

Lecture notes:

Creation phase:
1. Creation of Variable Object (VO):
    - Hoisting: function (before execution) -> variables (set to 'undefined')
2. Scoping:
    - inner can access outer, but not other way round
    - "execution stack": order in which functions are called
3. 'this'
*/

// examples from lecture

//================================================================
// Lecture: Hoisting

console.log("\n\n\n================================================================");
console.log("Notes - Hoisting\n\n");

// functions
calculateAge(1965);
function calculateAge(year) {
    console.log(2016 - year);
}
// retirement(1956);
var retirement = function(year) {
    console.log(65 - (2016 - year));
}
// variables
console.log(age);
var age = 23;
function foo() {
    console.log(age);
    var age = 65;
    console.log(age);
}
foo();
console.log(age);


//================================================================
// Lecture: Scoping

console.log("\n\n\n================================================================");
console.log("Notes - Scoping\n\n");

// First scoping example
var a = 'Hello!';
first();
function first() {
    var b = 'Hi!';
    second();
    function second() {
        var c = 'Hey!';
        console.log(a + b + c);
    }
}
// Example to show the differece between execution stack and scope chain
var a = 'Hello!';
first();
function first() {
    var b = 'Hi!';
    second();
    function second() {
        var c = 'Hey!';
        third()
    }
}
function third() {
    var d = 'John';
    //console.log(c);
    console.log(a+d);
}


//================================================================
// Lecture: The this keyword

console.log("\n\n\n================================================================");
console.log("Notes - 'this'\n\n");

console.log(this);
calculateAge1(1985);
function calculateAge1(year) {
    console.log(2016 - year);
    console.log(this);
}
var john = {
    name: 'John',
    yearOfBirth: 1990,
    calculateAge1: function() {
        console.log(this);
        console.log(2016 - this.yearOfBirth);
        
        function innerFunction() {
            console.log(this);
        }
        innerFunction();
    }
}
john.calculateAge1();
var mike = {
    name: 'Mike',
    yearOfBirth: 1984
};
mike.calculateAge1 = john.calculateAge1;
mike.calculateAge1();
