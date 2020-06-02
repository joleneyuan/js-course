//The Complete JavaScript Course 2020

//================================================================
// Coding Challenge #5

// part 1

// function Bill(name, bills) {
//     this.name = name;
//     this.bills = bills;
//     this.tips = calcTips(bills);
//     // this.totals = calcTotals(bills, this.tips);
//     this.totals = function () {
//         return bills.map((t, i) => (parseFloat(t) + parseFloat(tips[i])).toFixed(2));
//     }
//     this.tipsAvg = calcAvg(this.tips); // part 2
// }

// function calcTips(bills) {
//     return bills.map( t => calcTip(t).toFixed(2));
// }

// // function calcTotals(bills, tips) {
// //     return bills.map((t, i) => (parseFloat(t) + parseFloat(tips[i])).toFixed(2));
// // }

// function calcAvg(tips) {
//     return (tips.reduce((s,t) => s+parseFloat(t), 0) / tips.length).toFixed(2);
// }

// function calcTip(bill) {
//     if (bill < 50) {
//         return bill*0.2;
//     } else if (bill > 200) {
//         return bill*0.1;
//     } else {
//         return bill*0.15;
//     }
// }

// var bills = [
//     new Bill("John", [124, 48, 268, 180, 42]),
//     new Bill("Mark", [77, 375, 110, 45])
// ]

// for (let bill of bills) {
//     for (let detail in bill) {
//         console.log(detail + ": " + bill[detail]);
//     }
//     console.log("\n");
// }

//================================================================
// Coding Challenge #4

// function Person(name, mass, height) {
//     this.name = name;
//     this.mass = mass;
//     this.height = height;
//     this.bmi = mass/height/height;
// }

// var people = [
//     new Person("Mark", 75.0, 1.8),
//     new Person("John", 86.0, 1.78)
// ]

// function highestBMI (people) {
//     var recordBMI = 0;
//     var recordPeople = ['no one'];
//     for (let person of people) {
//         if (person.bmi > recordBMI) {
//             recordBMI = person.bmi;
//             recordPeople.length = 0;
//             recordPeople.push(person.name);
//         } else if (person.bmi == recordBMI) {
//             recordPeople.push(person.name);
//         }
//     }
//     return [recordBMI, recordPeople];
// }

// console.log("Highest BMI goes to " + highestBMI(people)[1] + " with a BMI of " + highestBMI(people)[0].toFixed(2));

//================================================================
// Coding Challenge #3

// var bills = [124, 48, 268];
// console.log("bills: " + bills);

// function calcTips (bill) {
//     if (bill < 50) {
//         return (bill*0.2).toFixed(2);
//     } else if (bill > 200) {
//         return (bill*0.1).toFixed(2);
//     } else {
//         return (bill*0.15).toFixed(2);
//     }
// }

// var tips = bills.map( t => calcTips(t));
// console.log("tips: " + tips);
// var totals = bills.map((t, i) => (parseFloat(t) + parseFloat(tips[i])).toFixed(2));
// console.log("totals: " + totals);

//================================================================
// Arrays

// // common arrays functions
// var myArr = ['a', false, 'b', true, 5];

// console.log(myArr);
// myArr.push('d');
// console.log(myArr);
// myArr.unshift(0);
// console.log(myArr);
// myArr.pop();
// console.log(myArr);
// myArr.shift();
// console.log(myArr);
// console.log(myArr.indexOf('b'));
// console.log(myArr.indexOf(6));

//================================================================
// Function Statements + Expressions

// // function declaration
// function funcD(p1, p2) {
//     return p1*p2;
// };

// // function expression
// var funcE = function(p1, p2) {
//     return p1+p2;
// }

//================================================================
// Coding Challenge #2

// function Team(name, scores) {
//     this.name = name,
//     this.scores = scores,
//     this.avg = calcAvg(scores)
// }

// var teams = [
//     new Team('John', [89, 120, 103]),
//     new Team('Mike', [116, 94, 123]),
//     new Team('Mike2', [97, 134, 105])
// ]

// function calcAvg (scores) {
//     return scores.reduce((s,c) => s+c, 0) / scores.length;
// }

// // Seong's soln
// function getAverage(teams) {
//     let avg = 0;
   
//     return teams.reduce((acc, item) => item.avg > avg ? item : acc, {}).name
// }

// // my soln
// function highestAvg (teams) {
//     var highestName = [];
//     var currHighestAvg = 0;
//     for (let i=0; i<teams.length; i++) {
//         if (teams[i].avg > currHighestAvg) {
//             currHighestAvg = teams[i].avg;
//             highestName.length = 0;
//             highestName.push(teams[i].name);
//         } else if (teams[i].avg == currHighestAvg) {
//             highestName.push(teams[i].name);
//         }
//     }
//     return highestName;
// }

// function retAvg (teams, name) {
//     for (let i=0; i<teams.length; i++) {
//         if (teams[i].name == name) {
//             return teams[i].avg;
//         }
//     }
//     return 'Team name not found';
// }

// console.log("#1:");
// console.log("John's average: " + retAvg(teams,'John'));
// console.log("Mike's average: " + retAvg(teams,'Mike'));
// console.log("Any's average: " + retAvg(teams,'Any'));
// console.log("--------------");
// console.log("#2:");
// console.log("Higher average goes to: " + highestAvg(teams));
// console.log("--------------");
// console.log("#3:");
// console.log("skipped");
// console.log("--------------");
// console.log("#4:");
// teams.push(new Team('Mary', [97, 134, 105]));
// console.log("Highest average goes to: " + highestAvg(teams));
// console.log("getAverage: " + getAverage(teams));

//================================================================

