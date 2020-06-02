//================================================================
// Coding Challenge #5

console.log("\n\n\n================================================================");
console.log("Coding Challenge #5\n\n");

// part 1

function Bill(name, bills) {
    this.name = name;
    this.bills = bills;
    this.tips = calcTips(bills);
    this.totals = calcTotals(bills, this.tips);
    // this.totals = function () {
    //     return bills.map((t, i) => (parseFloat(t) + parseFloat(this.tips[i])).toFixed(2));
    // }
    this.tipsAvg = calcAvg(this.tips); // part 2
}

function calcTips(bills) {
    return bills.map( t => calcTip(t).toFixed(2));
}

function calcTotals(bills, tips) {
    return bills.map((t, i) => (parseFloat(t) + parseFloat(tips[i])).toFixed(2));
}

// owen's soln to my qn
// var calcTotals = function (bills, tips) {
//     return bills.map( (x, i=0) => {
//         return x + tips[i]});
// }
// function Bill(name, bills) {
//     this.name = name;
//     this.bills = bills;
//     this.tips = calcTips(bills);
//     this.totals = calcTotals; // this is a function, not a string property
// }
// var JosBill = new Bill('Jo', [50,100,201]);
// console.log(JosBill);
// console.log(JosBill.totals(JosBill.bills, JosBill.tips)); // without the brackets, it'd go back to being a string

// seong's soln
// const seongIsAwesome = new Bill('haha', [1,2,3]);
// console.log(seongIsAwesome.totals());

function calcAvg(tips) {
    return (tips.reduce((s,t) => s+parseFloat(t), 0) / tips.length).toFixed(2);
}

function calcTip(bill) {
    if (bill < 50) {
        return bill*0.2;
    } else if (bill > 200) {
        return bill*0.1;
    } else {
        return bill*0.15;
    }
}

var bills = [
    new Bill("John", [124, 48, 268, 180, 42]),
    new Bill("Mark", [77, 375, 110, 45])
]

for (let bill of bills) {
    for (let detail in bill) {
        console.log(detail + ": " + bill[detail]);
    }
    console.log("\n");
}

//================================================================