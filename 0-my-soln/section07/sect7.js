// section 7: ES6 / ES2015

// lecture notes

//  1. let & const vs var
/**
 * - var: function-scoped
 * - let & const: block-scoped
 */


 // 2. Blocks and IIFE's
 /**
  * - IIFE (Immediately Invoked Function Expression)
  *  
  */
 {
     {
        const a = 1;
        let b = 2;
        var c = 3;
     }
    //  console.log(a + b + c); // a is undefined
    console.log(c); // 3

    (function() {
        var d = 4; // d is undefined
    })();
    //  console.log(d);
}

 
 // 3. Strings (template literals)
 {
    let fName='John', lName='Smith', year=1990;
    function calcAge(yob) {
        return 2020-yob;
    }

    // ES5
    console.log(fName + ' ' + lName + ' is ' + calcAge(year) + ' years old');

    // ES6
    console.log(`${fName} ${lName} is ${calcAge(year)} years old`);

    // useful functions: startsWith(), endsWith(), includes()
}




// 4 & 5. Arrow functions
{
    const years = [1990, 1991, 1992, 1993];

    // ES5
    var ages5 = years.map(function(el) {
        return 2020 - el;
    });
    console.log(ages5);

    // ES6
    let ages6 = years.map(el => 2020 - el);
    console.log(ages6);

    // Another application of arrow functions is its use in 'this' variable.
    // In ES5, 
}

// 6. Destructuring - extract data from data structure
{
    // ES5
    var john = ['john', 26];
    var name5 = john[0];
    var age5 = john[1];

    // ES6
    var [name6, age6] = ['john', 26];
    console.log(`${name6} is ${age6} yo`);

    // Above example is for arrays. Can also be used for objects.
    // Application eg. When returning an array, can assign two variables directly
}

// 7. Arrays
{
    var boxes = document.querySelectorAll('.boxes');

    // ES5
    var boxesArr5 = Array.prototype.slice.call(boxes);
    boxesArr5.forEach(function(cur) {
        cur.style.backgroundColor = 'dodgerblue';
    });

    // ES6
    // var boxesArr6 = Array.from(boxes);
    // boxesArr6.forEach(cur => cur.style.backgroundColor = 'dodgerblue');
    Array.from(boxes).forEach(cur => cur.style.backgroundColor = 'dodgerblue');

    // Other useful functions: arr.find(callback) and arr.findIndex(callback);
}

// 8. Spread operator
{
    function addFour(a, b, c, d) {
        return a+b+c+d;
    }
    var ages = [18, 19, 20, 21];
    
    // ES5
    var sum5 = addFour.apply(null, ages);
    console.log(sum5);

    // ES6
    var sum6 = addFour(...ages); // spread operator in function call
    console.log(sum6);

    // exprmt
    var arr1 = [1, 2, [3, 4], 5];
    var arr2 = [[6, 7], 8];
    console.log(...arr1, ...arr2);
}

// 9. Rest parameter
{
    function isFullAge5() {
        var argsArr = Array.prototype.slice.call(arguments);

        argsArr.forEach(function(cur) {
            console.log((2016 - cur) >= 18);
        })
    }

    function isFullAge6(...years) { // rest parameter in function declaratino
        years.forEach(cur => console.log((2016-cur) >= 18));
    }

    isFullAge6(1990, 1999, 1985, 1980);
}

// 10. Default parameter
{
    // ES5
    function SmithPerson5(firstN, year, lastN, nationality) {
        lastN === undefined ? lastN = 'Smith' : lastN = lastN;
        nationality === undefined ? nationality = 'american' : nationality = nationality;

        this.firstN = firstN;
        this.lastN = lastN;
        this.year = year;
        this.nationality = nationality;
    }

    // ES6
    function SmithPerson6(firstN, year, lastN='Smith', nationality='american') {
        this.firstN = firstN;
        this.lastN = lastN;
        this.year = year;
        this.nationality = nationality;
    }
}

// 11. Maps (new in ES6)
{
    // basic methods: get(), set(), has(), delete(), clear(), size
    // 'key' can be of any type, so easier to use than object

    const question = new Map();
    question.set('question', 'Latest major JS version:');

    question.set(1, 'ES4');
    question.set(2, 'ES5');
    question.set(3, 'ES6');
    question.set(4, 'ES7');

    question.set('correct', 3);
    question.set('true', 'correct answer :D');
    question.set('false', 'pls try again');

    console.log(`Beginning size is: ${question.size}`);

    if (question.has(4)) {
        question.delete(4);
    }

    console.log(`After-delete size is: ${question.size}`);

    // question.clear(); // clears everything; try not to do this

}

// 12 + 13. Classes and Subclasses (new in ES6)
{
// 12. Classes
    // 1. we need to first implement a class, before using it
    // 2. can only add method to classes, not properties
    
    class Person6 {
        constructor(name, year, job) {
            this.name = name;
            this.year = year;
            this.job = job;
        }

        calculateAge() {
            var age = new Date().getFullYear = this.year;
        }

        static greeting() {
            console.log(`Hello, my name is ${this.name}`);
        }
    }

// 13. Sub-classes (Implement Inheritance)
    // 'extends', 'super()' (very similar to java)

    class Athlete6 extends Person6 {
        constructor(name, year, job, olympicGames, medals) {
            super(name, year, job);
            this.olympicGames = olympicGames;
            this.medals = medals;
        }

        wonMedal() {
            this.medals++;
            console.log(this.medals);
        }
    }
}