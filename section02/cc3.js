//================================================================
// Coding Challenge #3

console.log("\n\n\n================================================================");
console.log("Coding Challenge #3\n\n");

var bills = [124, 48, 268];
console.log("bills: " + bills);

function calcTips (bill) {
    if (bill < 50) {
        return (bill*0.2).toFixed(2);
    } else if (bill > 200) {
        return (bill*0.1).toFixed(2);
    } else {
        return (bill*0.15).toFixed(2);
    }
}

var tips = bills.map( t => calcTips(t));
console.log("tips: " + tips);
var totals = bills.map((t, i) => (parseFloat(t) + parseFloat(tips[i])).toFixed(2));
console.log("totals: " + totals);

//================================================================
// Arrays

// common arrays functions
var myArr = ['a', false, 'b', true, 5];

console.log(myArr);
myArr.push('d');
console.log(myArr);
myArr.unshift(0);
console.log(myArr);
myArr.pop();
console.log(myArr);
myArr.shift();
console.log(myArr);
console.log(myArr.indexOf('b'));
console.log(myArr.indexOf(6));

//================================================================
// Function Statements + Expressions

// function declaration
function funcD(p1, p2) {
    return p1*p2;
};

// function expression
var funcE = function(p1, p2) {
    return p1+p2;
}

//================================================================